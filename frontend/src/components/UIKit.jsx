import React from "react";
import { Search, Bell, ChevronLeft } from "lucide-react";

export function T(props) {
  return <div className="disp" {...props} />;
}

export function PhoneChrome({ dark, children }) {
  const theme = dark
    ? { bg: "#14201C", surface: "#1C2B26", alt: "#223832", border: "#2E4640", text: "#EDEAE3", strong: "#FFC857", muted: "#9FB3AC", accent: "#FF7A5C", accent2: "#FFD27A" }
    : { bg: "#FFF9F2", surface: "#FFFFFF", alt: "#F1E9DB", border: "#EEE3D3", text: "#2B2B2B", strong: "#1B4B43", muted: "#8A8177", accent: "#FF6B4A", accent2: "#FFC857" };
  const vars = {
    "--bg": theme.bg, "--surface": theme.surface, "--alt": theme.alt, "--border": theme.border,
    "--text": theme.text, "--strong": theme.strong, "--muted": theme.muted, "--accent": theme.accent, "--accent2": theme.accent2,
  };
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#EFEAE1", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 12px" }}>
      <div style={{ ...vars, width: 390, maxWidth: "100%", height: 800, maxHeight: "92vh", background: "var(--bg)", borderRadius: 44, border: "10px solid #1B1B1B", boxShadow: "0 30px 60px -20px rgba(27,27,27,0.45)", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

export function StatusBar() {
  return (
    <div className="body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 22px 4px", fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
      <span>9:41</span>
      <div style={{ width: 90, height: 22, background: "#1B1B1B", borderRadius: 20, position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)" }} />
      <span>🔋 100%</span>
    </div>
  );
}

export const iconBtnStyle = { width: 40, height: 40, borderRadius: 12, background: "var(--alt)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };

export function Header({ title, subtitle, ts, onBack }) {
  return (
    <div style={{ padding: "6px 22px 16px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        {onBack && (
          <button onClick={onBack} aria-label="Orqaga" className="tappable" style={iconBtnStyle}><ChevronLeft size={19} color="var(--strong)" /></button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <T style={{ fontSize: 21 * ts, fontWeight: 700, color: "var(--strong)", lineHeight: 1.15 }}>{title}</T>
          {subtitle && <div className="body" style={{ fontSize: 12.5 * ts, color: "var(--muted)", marginTop: 3 }}>{subtitle}</div>}
        </div>
        {!onBack && (
          <div style={{ display: "flex", gap: 10 }}>
            <button aria-label="Qidirish" className="tappable" style={iconBtnStyle}><Search size={18} color="var(--strong)" /></button>
            <button aria-label="Bildirishnomalar" className="tappable" style={iconBtnStyle}><Bell size={18} color="var(--strong)" /></button>
          </div>
        )}
      </div>
    </div>
  );
}

export const inputStyle = { display: "block", width: "100%", marginTop: 6, padding: "11px 13px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontSize: 13, fontFamily: "'Inter', sans-serif" };

export function LoadingBlock({ ts, label = "Yuklanmoqda..." }) {
  return (
    <div className="body" style={{ padding: "40px 22px", textAlign: "center", color: "var(--muted)", fontSize: 13 * ts }}>
      {label}
    </div>
  );
}

export function ErrorBlock({ ts, message, onRetry }) {
  return (
    <div style={{ padding: "30px 22px", textAlign: "center" }}>
      <div className="body" style={{ color: "var(--accent)", fontSize: 13 * ts, marginBottom: 12, lineHeight: 1.5 }}>{message}</div>
      {onRetry && (
        <button onClick={onRetry} className="tappable body" style={{ background: "var(--alt)", color: "var(--strong)", border: "none", borderRadius: 12, padding: "10px 18px", fontWeight: 700, fontSize: 12.5 * ts, cursor: "pointer" }}>
          Qayta urinish
        </button>
      )}
    </div>
  );
}
