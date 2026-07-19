import React from "react";
import { Type, Mic, Moon, ScanEye, Video, ShieldCheck, LogOut, LogIn } from "lucide-react";
import { T, Header, iconBtnStyle } from "./UIKit.jsx";

function ToggleRow({ Icon, label, value, onChange, ts }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 15, borderBottom: "1px solid var(--border)" }}>
      <Icon size={18} color="var(--strong)" />
      <span className="body" style={{ flex: 1, fontSize: 13 * ts, fontWeight: 600, color: "var(--text)" }}>{label}</span>
      <button onClick={() => onChange(!value)} aria-pressed={value} className="tappable" style={{ width: 46, height: 26, borderRadius: 20, background: value ? "var(--accent)" : "var(--border)", border: "none", position: "relative", cursor: "pointer", flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: value ? 23 : 3, transition: "left .15s" }} />
      </button>
    </div>
  );
}

const smallBtn = { width: 30, height: 30, borderRadius: 9, border: "1px solid var(--border)", background: "var(--bg)", fontSize: 12, fontWeight: 700, color: "var(--strong)", cursor: "pointer" };

export default function ProfileScreen({
  ts, setTs, dark, setDark, voice, setVoice, screenReader, setScreenReader, signLang, setSignLang,
  user, onLogout, onGoLogin, openAdmin,
}) {
  return (
    <div style={{ flex: 1, overflowY: "auto" }} className="no-scrollbar">
      <Header title="Shaxsiy kabinet" subtitle={null} ts={ts} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 22px 6px" }}>
        <div style={{ width: 78, height: 78, borderRadius: 22, background: "var(--alt)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 10 }}>🙋</div>
        {user ? (
          <>
            <T style={{ fontSize: 17 * ts, fontWeight: 700, color: "var(--strong)" }}>{user.name}</T>
            <div className="body" style={{ fontSize: 12 * ts, color: "var(--muted)", marginTop: 2 }}>
              {user.provider === "oneid" ? "OneID orqali tasdiqlangan" : "Demo foydalanuvchi"} {user.isAdmin ? "· Administrator" : ""}
            </div>
            <button onClick={onLogout} className="tappable body" style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, background: "var(--alt)", color: "var(--strong)", border: "none", borderRadius: 12, padding: "8px 16px", fontWeight: 700, fontSize: 12 * ts, cursor: "pointer" }}>
              <LogOut size={14} /> Chiqish
            </button>
          </>
        ) : (
          <>
            <T style={{ fontSize: 17 * ts, fontWeight: 700, color: "var(--strong)" }}>Mehmon</T>
            <div className="body" style={{ fontSize: 12 * ts, color: "var(--muted)", marginTop: 2 }}>Tizimga kirmagansiz</div>
            <button onClick={onGoLogin} className="tappable body" style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, background: "var(--strong)", color: "#FFF9F2", border: "none", borderRadius: 12, padding: "9px 18px", fontWeight: 700, fontSize: 12 * ts, cursor: "pointer" }}>
              <LogIn size={14} /> Kirish
            </button>
          </>
        )}
      </div>

      <div style={{ margin: "16px 22px 8px" }}>
        <T style={{ fontSize: 14 * ts, fontWeight: 700, color: "var(--strong)", marginBottom: 10 }}>Maxsus imkoniyatlar</T>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, overflow: "hidden" }}>
          <ToggleRow Icon={Mic} label="Ovozli boshqaruv" value={voice} onChange={setVoice} ts={ts} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 15, borderBottom: "1px solid var(--border)" }}>
            <Type size={18} color="var(--strong)" />
            <span className="body" style={{ flex: 1, fontSize: 13 * ts, fontWeight: 600, color: "var(--text)" }}>Katta shrift</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setTs(Math.max(0.9, +(ts - 0.1).toFixed(1)))} className="tappable" style={smallBtn}>A-</button>
              <button onClick={() => setTs(Math.min(1.4, +(ts + 0.1).toFixed(1)))} className="tappable" style={smallBtn}>A+</button>
            </div>
          </div>
          <ToggleRow Icon={Moon} label="Qorong'i rejim" value={dark} onChange={setDark} ts={ts} />
          <ToggleRow Icon={ScanEye} label="Ekran o'quvchi bilan moslik" value={screenReader} onChange={setScreenReader} ts={ts} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 15 }}>
            <Video size={18} color="var(--strong)" />
            <span className="body" style={{ flex: 1, fontSize: 13 * ts, fontWeight: 600, color: "var(--text)" }}>Imo-ishora tilidagi videolar</span>
            <button onClick={() => setSignLang(!signLang)} aria-pressed={signLang} className="tappable" style={{ width: 46, height: 26, borderRadius: 20, background: signLang ? "var(--accent)" : "var(--border)", border: "none", position: "relative", cursor: "pointer" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: signLang ? 23 : 3, transition: "left .15s" }} />
            </button>
          </div>
        </div>
      </div>

      {user?.isAdmin && (
        <div style={{ margin: "16px 22px 0" }}>
          <button onClick={openAdmin} className="tappable body" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--strong)", color: "#FFF9F2", border: "none", borderRadius: 16, padding: "13px 16px", fontWeight: 700, fontSize: 13 * ts, cursor: "pointer" }}>
            <ShieldCheck size={16} /> Administrator paneli
          </button>
        </div>
      )}
      <div style={{ height: 90 }} />
    </div>
  );
}
