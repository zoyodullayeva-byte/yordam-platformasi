import React from "react";
import { Home, Grid3x3, Send, User } from "lucide-react";

export default function BottomNav({ tab, setTab }) {
  const items = [
    { id: "home", label: "Bosh sahifa", Icon: Home },
    { id: "services", label: "Xizmatlar", Icon: Grid3x3 },
    { id: "contact", label: "Murojaat", Icon: Send },
    { id: "profile", label: "Profil", Icon: User },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--bg)", borderTop: "1px solid var(--border)", display: "flex", padding: "10px 10px calc(10px + env(safe-area-inset-bottom, 10px))" }}>
      {items.map((it) => {
        const Icon = it.Icon;
        const active = tab === it.id;
        return (
          <button key={it.id} onClick={() => setTab(it.id)} aria-current={active} className="tappable" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "6px 0" }}>
            <Icon size={22} color={active ? "var(--accent)" : "var(--muted)"} strokeWidth={active ? 2.4 : 2} />
            <span className="body" style={{ fontSize: 10.5, fontWeight: active ? 700 : 500, color: active ? "var(--accent)" : "var(--muted)" }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
