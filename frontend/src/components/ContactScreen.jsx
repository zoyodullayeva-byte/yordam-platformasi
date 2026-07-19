import React, { useState } from "react";
import { Send, Phone } from "lucide-react";
import { T, Header, inputStyle } from "./UIKit.jsx";
import { api } from "../api.js";

export default function ContactScreen({ ts }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Ish o'rinlari");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim() || !message.trim()) {
      setError("Ism va xabar matnini to'ldiring");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await api.contact({ name, category, message, phone });
      setSent(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, overflowY: "auto" }} className="no-scrollbar">
      <Header title="Onlayn murojaat" subtitle="Savolingiz yoki yordam so'rovingizni yuboring" ts={ts} />
      <div style={{ padding: "16px 22px" }}>
        {sent ? (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: 22, textAlign: "center" }}>
            <div style={{ fontSize: 34, marginBottom: 10 }}>✅</div>
            <T style={{ fontSize: 15 * ts, fontWeight: 700, color: "var(--strong)", marginBottom: 6 }}>Murojaat yuborildi</T>
            <p className="body" style={{ fontSize: 12.5 * ts, color: "var(--muted)", margin: 0 }}>Mutaxassislarimiz 24 soat ichida siz bilan bog'lanadi. Murojaat serverga saqlandi.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label className="body" style={{ fontSize: 12.5 * ts, fontWeight: 600, color: "var(--text)" }}>
              Ism
              <input className="body" style={inputStyle} placeholder="Ismingiz" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="body" style={{ fontSize: 12.5 * ts, fontWeight: 600, color: "var(--text)" }}>
              Telefon (ixtiyoriy)
              <input className="body" style={inputStyle} placeholder="+998 90 123-45-67" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label className="body" style={{ fontSize: 12.5 * ts, fontWeight: 600, color: "var(--text)" }}>
              Mavzu
              <select className="body" style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Ish o'rinlari</option>
                <option>Ta'lim va kurslar</option>
                <option>Grant va subsidiya</option>
                <option>Tibbiy yordam</option>
                <option>Huquqiy maslahat</option>
                <option>Psixologik yordam</option>
                <option>Boshqa</option>
              </select>
            </label>
            <label className="body" style={{ fontSize: 12.5 * ts, fontWeight: 600, color: "var(--text)" }}>
              Xabar
              <textarea className="body" rows={4} style={{ ...inputStyle, resize: "none" }} placeholder="Savolingizni yozing..." value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>

            {error && <div className="body" style={{ color: "var(--accent)", fontSize: 12 * ts }}>{error}</div>}

            <button onClick={submit} disabled={loading} className="tappable body" style={{ marginTop: 6, background: "var(--accent)", color: "#FFF9F2", border: "none", borderRadius: 16, padding: "14px 16px", fontWeight: 700, fontSize: 13.5 * ts, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: loading ? 0.7 : 1 }}>
              <Send size={16} /> {loading ? "Yuborilmoqda..." : "Yuborish"}
            </button>
          </div>
        )}

        <div style={{ marginTop: 18, background: "var(--strong)", borderRadius: 18, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <Phone size={20} color="var(--accent2)" />
          <div>
            <div className="disp" style={{ fontSize: 13.5 * ts, fontWeight: 700, color: "#FFF9F2" }}>Ishonch telefoni: 1050</div>
            <div className="body" style={{ fontSize: 11.5 * ts, color: "#E8DFD0" }}>24/7 bepul va maxfiy</div>
          </div>
        </div>
      </div>
      <div style={{ height: 90 }} />
    </div>
  );
}
