# Yordam Platformasi — to'liq loyiha (frontend + backend)

Ushbu papkada ikkita mustaqil qism bor:

- **backend/** — Node.js/Express API server (OneID, ma'lumotlar, murojaatlar, admin panel)
- **frontend/** — Vite + React ilova (backendga real `fetch` so'rovlari yuboradi)

## Ishga tushirish (ikkalasini ham lokalda)

**1-terminal — backend:**
```bash
cd backend
npm install
cp .env.example .env
npm start
# http://localhost:4000
```

**2-terminal — frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# http://localhost:5173
```

Brauzerda `http://localhost:5173` ni oching. Ilova avtomatik ravishda `http://localhost:4000` dagi backendga ulanadi (buni `frontend/.env` dagi `VITE_API_URL` orqali o'zgartirish mumkin).

## Sinab ko'rish

1. Kirish ekranida **"Demo kirish"** ni tanlang (ism kiriting, "Administrator sifatida kirish" belgisini bosing — bu faqat sinov uchun)
2. **Xizmatlar** → istalgan bo'limga kirib, elementga bosing — ma'lumot backenddan real vaqtda keladi
3. **Davlat va nodavlat tashkilotlar** — tur/viloyat filtrini o'zgartiring, ro'yxat backendda filtrlanib qaytadi
4. **Murojaat** formasini to'ldirib yuboring — backend `data.json` fayliga saqlaydi
5. **Profil → Administrator paneli** — real statistikani ko'rsatadi (foydalanuvchilar soni, murojaatlar va h.k.)

## OneID ulash

`backend/README.md` dagi "OneID ulash" bo'limiga qarang. Qisqacha: id.egov.uz orqali ro'yxatdan o'tib, `backend/.env` fayliga `ONEID_CLIENT_ID` va `ONEID_CLIENT_SECRET` ni kiriting — shundan so'ng "OneID orqali kirish" tugmasi haqiqiy OneID sahifasiga yo'naltiradi.

## Production'ga chiqarish uchun eslatmalar

- `backend/.env` dagi `JWT_SECRET` ni albatta o'zgartiring
- Demo-login'dagi `asAdmin` maydonini production kodidan olib tashlang (`backend/src/routes/auth.js`) — bu faqat test uchun, xavfsiz emas
- `data.json` o'rniga PostgreSQL/MySQL kabi real ma'lumotlar bazasiga o'ting
- Frontendni `npm run build` bilan yig'ib, statik hosting (Vercel, Netlify) yoki backend bilan bir serverga joylashtiring
- HTTPS va CORS sozlamalarini production domenlaringizga moslang (`backend/server.js` dagi `cors()`)
