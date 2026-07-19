import express from "express";
import { readDB } from "../db.js";

// collectionName: masalan "jobs", "courses", "grants", "medical", "legal", "psych", "donors", "news"
export function resourceRouter(collectionName) {
  const router = express.Router();

  router.get("/", (req, res) => {
    const db = readDB();
    res.json(db[collectionName] || []);
  });

  router.get("/:id", (req, res) => {
    const db = readDB();
    const item = (db[collectionName] || []).find((i) => String(i.id) === req.params.id);
    if (!item) return res.status(404).json({ error: "Topilmadi" });
    res.json(item);
  });

  return router;
}
