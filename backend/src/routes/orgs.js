import express from "express";
import { readDB } from "../db.js";

const router = express.Router();

// GET /api/orgs?type=davlat|nodavlat&region=Toshkent%20shahri
router.get("/", (req, res) => {
  const db = readDB();
  let list = db.orgs || [];
  const { type, region } = req.query;

  if (type && type !== "barchasi") {
    list = list.filter((o) => o.type === type);
  }
  if (region && region !== "Barcha viloyatlar") {
    list = list.filter((o) => o.region === region || o.region === "Barcha viloyatlar");
  }
  res.json(list);
});

router.get("/:id", (req, res) => {
  const db = readDB();
  const item = (db.orgs || []).find((o) => String(o.id) === req.params.id);
  if (!item) return res.status(404).json({ error: "Topilmadi" });
  res.json(item);
});

export default router;
