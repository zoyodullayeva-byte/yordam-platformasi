import React, { useEffect, useState } from "react";
import { T, Header, LoadingBlock } from "./UIKit.jsx";
import { categoriesMeta } from "../data/categoriesMeta.js";
import { api } from "../api.js";

const partners = ["IT Park", "Mehnat vazirligi", "UNICEF", "\"Nuroniy\" jamg'armasi"];

export default function HomeScreen({ ts, openCategory, setTab, user }) {
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.list("news").then(setNews).catch((e) => setError(e.message));
  }, []);

  return (
    <div style={{ flex: 1, overflowY: "auto" }} className="no-scrollbar">
      <Header title="Yordam Platformasi" subtitle="Imkoniyati cheklangan yoshlar uchun" ts={ts} />
      <div style={{ margin: "16px 22px", background: "var(--strong)", borderRadius: 20, padding: 18 }}>
        <T style={{ fontSize: 16 * ts, fontWeight: 700, color: "#FFF9F2", marginBottom: 6 }}>
          {user ? `Xush kelibsiz, ${user.name}! 👋` : "Xush kelibsiz! 👋"}
        </T>
        <p className="body" style={{ fontSize: 12.5 * ts, color: "#E8DFD0", lineHeight: 1.5, margin: 0 }}>
          Ish, ta'lim, grant, tibbiy va huquqiy yordamni bir joydan toping. Ma'lumotlar backend serverdan real vaqtda yuklanadi.
        </p>
      </div>

      <div style={{ padding: "0 22px 8px" }}>
        <T style={{ fontSize: 15 * ts, fontWeight: 700, color: "var(--strong)" }}>Tezkor kirish</T>
      </div>
      <div className="no-scrollbar" style={{ display: "flex", gap: 12, padding: "0 22px 18px", overflowX: "auto" }}>
        {categoriesMeta.slice(0, 4).map((c) => (
          <button key={c.id} onClick={() => openCategory(c.id)} className="tappable" style={{ flex: "0 0 auto", width: 108, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: 14, textAlign: "left", cursor: "pointer" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{c.emoji}</div>
            <div className="body" style={{ fontSize: 11.5 * ts, fontWeight: 600, color: "var(--text)", lineHeight: 1.25 }}>{c.title} {c.sub}</div>
          </button>
        ))}
      </div>

      <div style={{ padding: "0 22px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <T style={{ fontSize: 15 * ts, fontWeight: 700, color: "var(--strong)" }}>Yangiliklar va e'lonlar</T>
        <button onClick={() => setTab("services")} className="tappable body" style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: 600, fontSize: 12 * ts, cursor: "pointer" }}>Barchasi</button>
      </div>

      {!news && !error && <LoadingBlock ts={ts} label="Yangiliklar yuklanmoqda..." />}
      {error && <div className="body" style={{ padding: "0 22px", color: "var(--accent)", fontSize: 12 * ts }}>{error}</div>}
      {news && news.map((n) => (
        <div key={n.id} style={{ display: "flex", gap: 12, margin: "0 22px 12px", padding: 14, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--alt)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{n.emoji}</div>
          <div style={{ minWidth: 0 }}>
            <div className="disp" style={{ fontSize: 13.5 * ts, fontWeight: 700, color: "var(--text)" }}>{n.t}</div>
            <div className="body" style={{ fontSize: 12 * ts, color: "var(--muted)", marginTop: 2 }}>{n.d}</div>
          </div>
        </div>
      ))}

      <div style={{ padding: "6px 22px 10px" }}>
        <T style={{ fontSize: 15 * ts, fontWeight: 700, color: "var(--strong)", marginBottom: 10 }}>Hamkorlar</T>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {partners.map((p, i) => (
            <span key={i} className="body" style={{ fontSize: 11.5 * ts, fontWeight: 600, color: "var(--strong)", background: "var(--alt)", borderRadius: 20, padding: "7px 12px" }}>{p}</span>
          ))}
        </div>
      </div>
      <div style={{ height: 90 }} />
    </div>
  );
}
