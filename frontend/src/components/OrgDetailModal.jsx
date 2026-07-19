import React from "react";
import { X, Phone, MapPin } from "lucide-react";
import { T, iconBtnStyle } from "./UIKit.jsx";

export default function OrgDetailModal({ org, ts, onClose, goContact }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "flex-end", zIndex: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--bg)", width: "100%", borderRadius: "24px 24px 0 0", padding: 22, maxHeight: "82%", overflowY: "auto" }} className="no-scrollbar">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
          <button onClick={onClose} aria-label="Yopish" className="tappable" style={iconBtnStyle}><X size={18} color="var(--strong)" /></button>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "var(--alt)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
            {org.type === "davlat" ? "🏛️" : "🤝"}
          </div>
          <div style={{ flex: 1 }}>
            <T style={{ fontSize: 16 * ts, fontWeight: 700, color: "var(--strong)", lineHeight: 1.25 }}>{org.name}</T>
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              <span className="body" style={{ fontSize: 10.5 * ts, fontWeight: 700, color: "var(--strong)", background: "var(--alt)", borderRadius: 8, padding: "3px 8px" }}>
                {org.type === "davlat" ? "Davlat" : "Nodavlat"}
              </span>
              <span className="body" style={{ fontSize: 10.5 * ts, fontWeight: 600, color: "var(--muted)", display: "flex", alignItems: "center", gap: 3 }}>
                <MapPin size={11} /> {org.region}
              </span>
            </div>
          </div>
        </div>

        <p className="body" style={{ fontSize: 13 * ts, color: "var(--text)", lineHeight: 1.5, margin: "0 0 16px" }}>{org.d}</p>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 14, marginBottom: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Phone size={16} color="var(--strong)" />
            <span className="body" style={{ fontSize: 13 * ts, color: "var(--text)", fontWeight: 600 }}>{org.phone}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <MapPin size={16} color="var(--strong)" />
            <span className="body" style={{ fontSize: 13 * ts, color: "var(--text)" }}>{org.address}</span>
          </div>
        </div>

        <button onClick={goContact} className="tappable body" style={{ width: "100%", background: "var(--accent)", color: "#FFF9F2", border: "none", borderRadius: 16, padding: "14px 16px", fontWeight: 700, fontSize: 13.5 * ts, cursor: "pointer" }}>
          Ushbu tashkilotga murojaat yuborish
        </button>
      </div>
    </div>
  );
}
