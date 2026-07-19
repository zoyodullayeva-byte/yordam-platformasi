import express from "express";
import crypto from "crypto";
import { readDB, writeDB } from "../db.js";
import { issueToken, requireAuth } from "../middleware/auth.js";

const router = express.Router();

const ONEID_CLIENT_ID = process.env.ONEID_CLIENT_ID;
const ONEID_CLIENT_SECRET = process.env.ONEID_CLIENT_SECRET;
const ONEID_REDIRECT_URI = process.env.ONEID_REDIRECT_URI || "http://localhost:4000/api/auth/oneid/callback";
const ONEID_AUTHORIZE_URL = process.env.ONEID_AUTHORIZE_URL || "https://sso.egov.uz/sso/oauth/Authorization.do";
const ONEID_TOKEN_URL = process.env.ONEID_TOKEN_URL || "https://sso.egov.uz/sso/oauth/AccessToken.do";
const ONEID_RESOURCE_URL = process.env.ONEID_RESOURCE_URL || "https://sso.egov.uz/sso/oauth/Info.do";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// GET /api/auth/oneid/status — frontendga OneID ulanganmi-yo'qmi bildirish uchun
router.get("/oneid/status", (req, res) => {
  res.json({ configured: Boolean(ONEID_CLIENT_ID && ONEID_CLIENT_SECRET) });
});

// POST /api/auth/demo-login — OneID sozlanmagan paytda sinash uchun oddiy kirish
// DIQQAT: `asAdmin` maydoni FAQAT rivojlantirish/demo bosqichi uchun. Production'da
// albatta olib tashlang — aks holda har kim o'zini administrator qilib ko'rsatishi mumkin.
router.post("/demo-login", (req, res) => {
  const { name, phone, asAdmin } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Ism kiritilishi shart" });
  }
  const db = readDB();
  let user = phone ? db.users.find((u) => u.phone === phone) : null;
  if (!user) {
    user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      phone: phone || null,
      provider: "demo",
      isAdmin: Boolean(asAdmin),
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    writeDB(db);
  } else if (asAdmin && !user.isAdmin) {
    user.isAdmin = true;
    writeDB(db);
  }
  const token = issueToken(user);
  res.json({ token, user });
});

// GET /api/auth/oneid/login — foydalanuvchini OneID sahifasiga yo'naltiradi
router.get("/oneid/login", (req, res) => {
  if (!ONEID_CLIENT_ID) {
    return res.status(503).json({
      error:
        "OneID hali sozlanmagan. .env faylida ONEID_CLIENT_ID va ONEID_CLIENT_SECRET to'ldirilishi kerak. " +
        "Buning uchun id.egov.uz orqali tashkilot sifatida ro'yxatdan o'tib, ariza berishingiz kerak.",
    });
  }
  const state = crypto.randomBytes(16).toString("hex");
  const url =
    `${ONEID_AUTHORIZE_URL}?response_type=code` +
    `&client_id=${encodeURIComponent(ONEID_CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(ONEID_REDIRECT_URI)}` +
    `&state=${state}`;
  res.redirect(url);
});

// GET /api/auth/oneid/callback — OneID kod bilan qaytadi, token almashtiriladi
router.get("/oneid/callback", async (req, res) => {
  const { code, error: oneidError } = req.query;
  if (oneidError) {
    return res.redirect(`${FRONTEND_URL}/auth/error?message=${encodeURIComponent(String(oneidError))}`);
  }
  if (!code) {
    return res.status(400).send("Kod topilmadi (OneID 'code' parametrini yubormadi).");
  }
  try {
    const tokenResp = await fetch(ONEID_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: ONEID_CLIENT_ID,
        client_secret: ONEID_CLIENT_SECRET,
        redirect_uri: ONEID_REDIRECT_URI,
        code: String(code),
      }),
    });
    const tokenData = await tokenResp.json();
    if (!tokenData.access_token) {
      throw new Error("OneID'dan token olinmadi: " + JSON.stringify(tokenData));
    }

    const infoResp = await fetch(`${ONEID_RESOURCE_URL}?access_token=${tokenData.access_token}`);
    const info = await infoResp.json();
    // OneID odatda quyidagilarni qaytaradi: pin (JSHSHIR), pport_no, first_name, sur_name, mid_name, birth_date ...

    const db = readDB();
    let user = db.users.find((u) => u.pin === info.pin);
    if (!user) {
      user = {
        id: crypto.randomUUID(),
        pin: info.pin,
        name: [info.first_name, info.sur_name].filter(Boolean).join(" ") || "OneID foydalanuvchi",
        provider: "oneid",
        isAdmin: false,
        createdAt: new Date().toISOString(),
      };
      db.users.push(user);
      writeDB(db);
    }
    const jwtToken = issueToken(user);
    res.redirect(`${FRONTEND_URL}/auth/success?token=${jwtToken}`);
  } catch (err) {
    console.error("OneID callback xatosi:", err);
    res.redirect(`${FRONTEND_URL}/auth/error?message=${encodeURIComponent(err.message)}`);
  }
});

// GET /api/auth/me — joriy foydalanuvchi ma'lumotlari
router.get("/me", requireAuth, (req, res) => {
  const db = readDB();
  const user = db.users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
  res.json({ user });
});

export default router;
