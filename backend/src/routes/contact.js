import express from "express";
import crypto from "crypto";
import { readDB, writeDB } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// POST /api/contact — har kim (login qilmagan foydalanuvchi ham) murojaat yubora oladi
router.post("/", (req, res) => {
  const { name, category, message, phone } = req.body || {};
  if (!name || !name.trim() || !message || !message.trim()) {
    return res.status(400).json({ error: "Ism va xabar matni to'ldirilishi shart" });
  }
  const db = readDB();
  const entry = {
    id: crypto.randomUUID(),
    name: name.trim(),
    category: category || "Boshqa",
    message: message.trim(),
    phone: phone || null,
    status: "yangi",
    createdAt: new Date().toISOString(),
  };
  db.contacts.push(entry);
  writeDB(db);
  res.status(201).json({ ok: true, id: entry.id });
});

// GET /api/contact/mine — login qilgan foydalanuvchi o'z murojaatlarini ko'rishi uchun (ixtiyoriy)
router.get("/mine", requireAuth, (req, res) => {
  const db = readDB();
  const mine = db.contacts.filter((c) => c.userId === req.user.sub);
  res.json(mine);
});

export default router;
