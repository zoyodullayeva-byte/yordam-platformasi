import React, { useEffect, useState } from "react";
import { PhoneChrome, StatusBar } from "./components/UIKit.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import ServicesScreen from "./components/ServicesScreen.jsx";
import CategoryDetail from "./components/CategoryDetail.jsx";
import OrgsScreen from "./components/OrgsScreen.jsx";
import ContactScreen from "./components/ContactScreen.jsx";
import ProfileScreen from "./components/ProfileScreen.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import BottomNav from "./components/BottomNav.jsx";
import { categoriesMeta } from "./data/categoriesMeta.js";
import { api, getToken, setToken } from "./api.js";

export default function App() {
  // ---- OneID qaytish nuqtasini qo'lda o'qish (react-router ishlatilmagan) ----
  const [authNotice, setAuthNotice] = useState("");
  useEffect(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    if (path === "/auth/success") {
      const token = params.get("token");
      if (token) {
        setToken(token);
        setAuthNotice("OneID orqali muvaffaqiyatli kirdingiz.");
      }
      window.history.replaceState({}, "", "/");
    } else if (path === "/auth/error") {
      setAuthNotice(params.get("message") || "Kirishda xatolik yuz berdi.");
      window.history.replaceState({}, "", "/");
    }
  }, []);

  // ---- Auth holati ----
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [guest, setGuest] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) { setAuthChecked(true); return; }
    api.me()
      .then(({ user }) => setUser(user))
      .catch(() => setToken(null))
      .finally(() => setAuthChecked(true));
  }, [authNotice]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setGuest(false);
  };

  // ---- Navigatsiya ----
  const [tab, setTab] = useState("home");
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // ---- Maxsus imkoniyatlar ----
  const [ts, setTs] = useState(1);
  const [dark, setDark] = useState(false);
  const [voice, setVoice] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [signLang, setSignLang] = useState(false);

  const openCategory = (id) => { setActiveCategory(id); setTab("services"); };
  const cat = categoriesMeta.find((c) => c.id === activeCategory);
  const goContact = () => { setActiveCategory(null); setTab("contact"); };

  if (!authChecked) {
    return (
      <PhoneChrome dark={dark}>
        <StatusBar />
        <div className="body" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
          Yuklanmoqda...
        </div>
      </PhoneChrome>
    );
  }

  const needsLogin = !user && !guest;

  return (
    <PhoneChrome dark={dark}>
      <StatusBar />

      {needsLogin ? (
        <LoginScreen
          ts={ts}
          onLoggedIn={(u) => { setUser(u); }}
          onGuest={() => setGuest(true)}
        />
      ) : (
        <>
          {authNotice && (
            <div className="body" style={{ margin: "8px 22px 0", padding: "10px 12px", background: "var(--alt)", color: "var(--strong)", borderRadius: 12, fontSize: 12 * ts, display: "flex", justifyContent: "space-between", gap: 8 }}>
              <span>{authNotice}</span>
              <button onClick={() => setAuthNotice("")} style={{ background: "none", border: "none", color: "var(--strong)", fontWeight: 700, cursor: "pointer" }}>✕</button>
            </div>
          )}

          {tab === "home" && <HomeScreen ts={ts} openCategory={openCategory} setTab={setTab} user={user} />}
          {tab === "services" && !cat && <ServicesScreen ts={ts} openCategory={openCategory} />}
          {tab === "services" && cat && cat.id === "orgs" && (
            <OrgsScreen ts={ts} onBack={() => setActiveCategory(null)} goContact={goContact} />
          )}
          {tab === "services" && cat && cat.id !== "orgs" && (
            <CategoryDetail cat={cat} ts={ts} onBack={() => setActiveCategory(null)} goContact={goContact} />
          )}
          {tab === "contact" && <ContactScreen ts={ts} />}
          {tab === "profile" && (
            <ProfileScreen
              ts={ts} setTs={setTs} dark={dark} setDark={setDark}
              voice={voice} setVoice={setVoice}
              screenReader={screenReader} setScreenReader={setScreenReader}
              signLang={signLang} setSignLang={setSignLang}
              user={user}
              onLogout={handleLogout}
              onGoLogin={() => { setGuest(false); }}
              openAdmin={() => setShowAdmin(true)}
            />
          )}

          {showAdmin && <AdminPanel ts={ts} onClose={() => setShowAdmin(false)} />}
          <BottomNav tab={tab} setTab={(t) => { setActiveCategory(null); setTab(t); }} />
        </>
      )}
    </PhoneChrome>
  );
}
