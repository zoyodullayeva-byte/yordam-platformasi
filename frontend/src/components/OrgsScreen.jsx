import React, { useEffect, useState } from "react";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { Header, LoadingBlock, ErrorBlock, inputStyle } from "./UIKit.jsx";
import OrgDetailModal from "./OrgDetailModal.jsx";
import { regions } from "../data/categoriesMeta.js";
import { api } from "../api.js";

export default function OrgsScreen({ ts, onBack, goContact }) {
  const [typeFilter, setTypeFilter] = useState("barchasi");
  const [region, setRegion] = useState("Barcha viloyatlar");
  const [orgs, setOrgs] = useState(null);
  const [error, setError] = useState("");
  const [selectedOrg, setSelectedOrg] = useState(null);

  const load = () => {
    setError("");
    setOrgs(null);
    api.orgs({ type: typeFilter, region }).then(setOrgs).catch((e) => setError(e.message));
  };

  // Filtr o'zgarganda backendga qayta so'rov yuboriladi (real filtrlash serverda bajariladi)
  useEffect(() => { load(); }, [typeFilter, region]);

  const chip = (active) => ({
    padding: "8px 14px", borderRadius: 20, border: active ? "none" : "1px solid var(--border)",
    background: active ? "var(--strong)" : "var(--surface)", color: active ? "#FFF9F2" : "var(--text)",
    fontWeight: 700, fontSize: 12 * ts, cursor: "pointer", flexShrink: 0,
  });

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "var(--bg)" }} className="no-scrollbar">
      <Header title="Davlat va nodavlat" subtitle={orgs ? `${orgs.length} ta tashkilot topildi` : "Yuklanmoqda..."} ts={ts} onBack={onBack} />

      <div className="no-scrollbar" style={{ display: "flex", gap: 8, padding: "14px 22px 4px", overflowX: "auto" }}>
        <button className="tappable body" style={chip(typeFilter === "barchasi")} onClick={() => setTypeFilter("barchasi")}>Barchasi</button>
        <button className="tappable body" style={chip(typeFilter === "davlat")} onClick={() => setTypeFilter("davlat")}>🏛️ Davlat</button>
        <button className="tappable body" style={chip(typeFilter === "nodavlat")} onClick={() => setTypeFilter("nodavlat")}>🤝 Nodavlat</button>
      </div>

      <div style={{ padding: "10px 22px 4px" }}>
        <label className="body" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 * ts, fontWeight: 600, color: "var(--muted)" }}>
          <SlidersHorizontal size={14} /> Viloyat bo'yicha
        </label>
        <select className="body" value={region} onChange={(e) => setRegion(e.target.value)} style={{ ...inputStyle, marginTop: 6 }}>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div style={{ padding: "14px 22px 4px" }}>
        {!orgs && !error && <LoadingBlock ts={ts} />}
        {error && <ErrorBlock ts={ts} message={error} onRetry={load} />}
        {orgs && orgs.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 10px", color: "var(--muted)" }} className="body">
            Bu filtr bo'yicha tashkilot topilmadi. Boshqa viloyat yoki turni tanlab ko'ring.
          </div>
        )}
        {orgs && orgs.map((o) => (
          <div
            key={o.id}
            onClick={() => setSelectedOrg(o)}
            className="tappable"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") setSelectedOrg(o); }}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 14, marginBottom: 10, cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--alt)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                {o.type === "davlat" ? "🏛️" : "🤝"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="disp" style={{ fontSize: 13.5 * ts, fontWeight: 700, color: "var(--text)", lineHeight: 1.25 }}>{o.name}</div>
                <div className="body" style={{ fontSize: 11.5 * ts, color: "var(--muted)", marginTop: 3 }}>{o.d}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  <span className="body" style={{ fontSize: 10.5 * ts, fontWeight: 700, color: "var(--strong)", background: "var(--alt)", borderRadius: 8, padding: "3px 8px" }}>
                    {o.type === "davlat" ? "Davlat" : "Nodavlat"}
                  </span>
                  <span className="body" style={{ fontSize: 10.5 * ts, fontWeight: 600, color: "var(--muted)", display: "flex", alignItems: "center", gap: 3 }}>
                    <MapPin size={11} /> {o.region}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrg && (
        <OrgDetailModal org={selectedOrg} ts={ts} onClose={() => setSelectedOrg(null)} goContact={() => { setSelectedOrg(null); goContact(); }} />
      )}

      <div style={{ padding: "6px 22px 20px" }}>
        <button onClick={goContact} className="tappable body" style={{ width: "100%", background: "var(--accent)", color: "#FFF9F2", border: "none", borderRadius: 16, padding: "14px 16px", fontWeight: 700, fontSize: 13.5 * ts, cursor: "pointer" }}>
          Ro'yxatda yo'q tashkilotni taklif qilish
        </button>
      </div>
      <div style={{ height: 70 }} />
    </div>
  );
}
