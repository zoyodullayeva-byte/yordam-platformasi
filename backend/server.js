import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/auth.js";
import contactRoutes from "./src/routes/contact.js";
import adminRoutes from "./src/routes/admin.js";
import orgsRoutes from "./src/routes/orgs.js";
import { resourceRouter } from "./src/routes/resources.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true, service: "yordam-platformasi-backend" }));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orgs", orgsRoutes);

app.use("/api/jobs", resourceRouter("jobs"));
app.use("/api/courses", resourceRouter("courses"));
app.use("/api/grants", resourceRouter("grants"));
app.use("/api/medical", resourceRouter("medical"));
app.use("/api/legal", resourceRouter("legal"));
app.use("/api/psych", resourceRouter("psych"));
app.use("/api/donors", resourceRouter("donors"));
app.use("/api/news", resourceRouter("news"));

app.use((req, res) => res.status(404).json({ error: "Manzil topilmadi" }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server xatosi" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Yordam Platformasi backend ${PORT}-portda ishga tushdi`);
  console.log(`   http://localhost:${PORT}/api/health`);
});
