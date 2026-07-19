import express from "express";
import crypto from "crypto";
import { readDB, writeDB } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth, requireAdmin);

// GET /api/admin/stats
router.get("/stats", (req, res) => {
  const db = readDB();
  res.json({
    foydalanuvchilar: db.users.length,
    murojaatlar: db.contacts.length,
    yangiMurojaatlar: db.contacts.filter((c) => c.status === "yangi").length,
    ishOrinlari: db.jobs.length,
    tasdiqlanmaganIshOrinlari: db.jobs.filter((j) => j.status === "kutilmoqda").length,
    yangiliklar: db.news.length,
  });
});

// GET /api/admin/users
router.get("/users", (req, res) => {
  const db = readDB();
  res.json(db.users);
});

// GET /api/admin/contacts
router.get("/contacts", (req, res) => {
  const db = readDB();
  res.json(db.contacts);
});

// PATCH /api/admin/contacts/:id  { status: "ko'rib chiqilmoqda" | "yopildi" }
router.patch("/contacts/:id", (req, res) => {
  const db = readDB();
  const item = db.contacts.find((c) => c.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Topilmadi" });
  if (req.body?.status) item.status = req.body.status;
  writeDB(db);
  res.json(item);
});

// POST /api/admin/news
router.post("/news", (req, res) => {
  const db = readDB();
  const item = { id: crypto.randomUUID(), emoji: "📢", ...req.body, createdAt: new Date().toISOString() };
  db.news.unshift(item);
  writeDB(db);
  res.status(201).json(item);
});

// PATCH /api/admin/jobs/:id/approve
router.patch("/jobs/:id/approve", (req, res) => {
  const db = readDB();
  const job = db.jobs.find((j) => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: "Topilmadi" });
  job.status = "tasdiqlangan";
  writeDB(db);
  res.json(job);
});

export default router;
