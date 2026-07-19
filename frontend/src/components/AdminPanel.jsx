import React, { useEffect, useState } from "react";
import { X, Users, Megaphone, FileText, MapPin } from "lucide-react";
import { T, iconBtnStyle, LoadingBlock, ErrorBlock } from "./UIKit.jsx";
import { api } from "../api.js";

export default function AdminPanel({ ts, onClose }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    setStats(null);
    api.adminStats().then(setStats).catch((e) => setError(e.message));
  };

  useEffect(() => { load(); }, []);

  const rows = stats
    ? [
        { label: "Foydalanuvchilarni boshqarish", val: `${stats.foydalanuvchilar} foydalanuvchi`, Icon: Users },
        { label: "Yangilik qo'shish", val: `${stats.yangiliklar} ta yangilik e'lon qilingan`, Icon: Megaphone },
        { label: "Ish e'lonlarini tasdiqlash", val: `${stats.tasdiqlanmaganIshOrinlari} ta kutilmoqda`, Icon: FileText },
        { label: "Murojaatlar statistikasi", val: `Jami: ${stats.murojaatlar}, yangi: ${stats.yangiMurojaatlar}`, Icon: MapPin },
      ]
    : [];

  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "flex-end", zIndex: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--bg)", width: "100%", borderRadius: "24px 24px 0 0", padding: 22, maxHeight: "80%", overflowY: "auto" }} className="no-scrollbar">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <T style={{ fontSize: 17 * ts, fontWeight: 700, color: "var(--strong)" }}>Administrator paneli</T>
          <button onClick={onClose} aria-label="Yopish" className="tappable" style={iconBtnStyle}><X size={18} color="var(--strong)" /></button>
        </div>

        {!stats && !error && <LoadingBlock ts={ts} label="Statistika yuklanmoqda..." />}
        {error && <ErrorBlock ts={ts} message={error} onRetry={load} />}

        {rows.map((r, i) => {
          const Icon = r.Icon;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 14, marginBottom: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--alt)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={17} color="var(--strong)" /></div>
              <div style={{ flex: 1 }}>
                <div className="disp" style={{ fontSize: 13 * ts, fontWeight: 700, color: "var(--text)" }}>{r.label}</div>
                <div className="body" style={{ fontSize: 11.5 * ts, color: "var(--muted)" }}>{r.val}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
