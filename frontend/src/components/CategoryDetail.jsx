import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Header, LoadingBlock, ErrorBlock } from "./UIKit.jsx";
import ItemDetailModal from "./ItemDetailModal.jsx";
import { api } from "../api.js";

export default function CategoryDetail({ cat, ts, onBack, goContact }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const load = () => {
    setError("");
    setItems(null);
    api.list(cat.endpoint).then(setItems).catch((e) => setError(e.message));
  };

  useEffect(() => { load(); }, [cat.endpoint]);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "var(--bg)" }} className="no-scrollbar">
      <Header title={`${cat.title} ${cat.sub}`} subtitle={items ? `${items.length} ta natija` : "Yuklanmoqda..."} ts={ts} onBack={onBack} />

      {!items && !error && <LoadingBlock ts={ts} />}
      {error && <ErrorBlock ts={ts} message={error} onRetry={load} />}

      {items && (
        <div style={{ padding: "16px 22px 4px" }}>
          {items.map((it) => (
            <div
              key={it.id}
              onClick={() => setSelectedItem(it)}
              className="tappable"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") setSelectedItem(it); }}
              style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 14, marginBottom: 10, cursor: "pointer" }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--alt)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{cat.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="disp" style={{ fontSize: 13.5 * ts, fontWeight: 700, color: "var(--text)" }}>{it.t}</div>
                <div className="body" style={{ fontSize: 11.5 * ts, color: "var(--muted)", marginTop: 2 }}>{it.d}</div>
              </div>
              <ChevronRight size={16} color="var(--muted)" />
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemDetailModal item={selectedItem} cat={cat} ts={ts} onClose={() => setSelectedItem(null)} goContact={() => { setSelectedItem(null); goContact(); }} />
      )}

      <div style={{ padding: "6px 22px 20px" }}>
        <button onClick={goContact} className="tappable body" style={{ width: "100%", background: "var(--accent)", color: "#FFF9F2", border: "none", borderRadius: 16, padding: "14px 16px", fontWeight: 700, fontSize: 13.5 * ts, cursor: "pointer" }}>
          {cat.cta}
        </button>
      </div>
      <div style={{ height: 70 }} />
    </div>
  );
}
