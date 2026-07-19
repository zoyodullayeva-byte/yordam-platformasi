import React from "react";
import { Header } from "./UIKit.jsx";
import { categoriesMeta } from "../data/categoriesMeta.js";

export default function ServicesScreen({ ts, openCategory }) {
  return (
    <div style={{ flex: 1, overflowY: "auto" }} className="no-scrollbar">
      <Header title="Xizmatlar" subtitle="Kerakli bo'limni tanlang" ts={ts} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "16px 22px" }}>
        {categoriesMeta.map((c) => {
          const Icon = c.Icon;
          return (
            <button key={c.id} onClick={() => openCategory(c.id)} className="tappable" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: 14, textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--alt)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={19} color="var(--strong)" />
              </div>
              <div className="disp" style={{ fontSize: 13.5 * ts, fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>{c.title} {c.sub}</div>
            </button>
          );
        })}
      </div>
      <div style={{ height: 90 }} />
    </div>
  );
}
