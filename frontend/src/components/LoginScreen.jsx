import React, { useEffect, useState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import { T, Header, iconBtnStyle, inputStyle } from "./UIKit.jsx";
import { api, setToken } from "../api.js";

export default function LoginScreen({ ts, onLoggedIn, onGuest }) {
  const [oneidReady, setOneidReady] = useState(null); // null = tekshirilmoqda
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [asAdmin, setAsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.oneidStatus()
      .then((r) => setOneidReady(Boolean(r.configured)))
      .catch(() => setOneidReady(false));
  }, []);

  const handleOneId = () => {
    if (!oneidReady) {
      setError("OneID hali sozlanmagan (.env faylida ONEID_CLIENT_ID). Hozircha demo kirishdan foydalaning.");
      return;
    }
    window.location.href = api.oneidLoginUrl();
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError("Ismingizni kiriting"); return; }
    setError("");
    setLoading(true);
    try {
      const { token, user } = await api.demoLogin({ name, phone, asAdmin });
      setToken(token);
      onLoggedIn(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, overflowY: "auto" }} className="no-scrollbar">
      <Header title="Kirish" subtitle="Davom etish uchun tanlang" ts={ts} />
      <div style={{ padding: "20px 22px" }}>
        <button
          onClick={handleOneId}
          className="tappable body"
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "var(--strong)", color: "#FFF9F2", border: "none", borderRadius: 16, padding: "15px 16px", fontWeight: 700, fontSize: 14 * ts, cursor: "pointer", marginBottom: 10 }}
        >
          <LogIn size={18} /> OneID orqali kirish
          {oneidReady === null && <Loader2 size={14} className="spin" />}
        </button>
        {oneidReady === false && (
          <div className="body" style={{ fontSize: 11.5 * ts, color: "var(--muted)", textAlign: "center", marginBottom: 18 }}>
            OneID hali sozlanmagan — quyidagi demo kirishdan foydalaning
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span className="body" style={{ fontSize: 11.5 * ts, color: "var(--muted)" }}>yoki</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <form onSubmit={handleDemoLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label className="body" style={{ fontSize: 12.5 * ts, fontWeight: 600, color: "var(--text)" }}>
            Ismingiz
            <input className="body" style={inputStyle} placeholder="Ism Familiya" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="body" style={{ fontSize: 12.5 * ts, fontWeight: 600, color: "var(--text)" }}>
            Telefon (ixtiyoriy)
            <input className="body" style={inputStyle} placeholder="+998 90 123-45-67" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label className="body" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5 * ts, color: "var(--muted)" }}>
            <input type="checkbox" checked={asAdmin} onChange={(e) => setAsAdmin(e.target.checked)} />
            Administrator sifatida kirish (faqat demo/sinov uchun)
          </label>

          {error && <div className="body" style={{ color: "var(--accent)", fontSize: 12 * ts }}>{error}</div>}

          <button type="submit" disabled={loading} className="tappable body" style={{ background: "var(--accent)", color: "#FFF9F2", border: "none", borderRadius: 16, padding: "14px 16px", fontWeight: 700, fontSize: 13.5 * ts, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Kirilmoqda..." : "Demo kirish"}
          </button>
        </form>

        <button onClick={onGuest} className="tappable body" style={{ width: "100%", background: "none", border: "none", color: "var(--muted)", fontWeight: 600, fontSize: 12.5 * ts, cursor: "pointer", marginTop: 16, textAlign: "center" }}>
          Mehmon sifatida davom etish
        </button>
      </div>
    </div>
  );
}
