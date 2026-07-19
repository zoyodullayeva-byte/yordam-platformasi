# Yordam Platformasi — Backend

Imkoniyati cheklangan yoshlar uchun yordam platformasi backend serveri. Node.js + Express, JSON-fayl asosidagi ma'lumotlar bazasi va **OneID** orqali kirish bilan.

## O'rnatish

```bash
npm install
cp .env.example .env
npm start
```

Server: `http://localhost:4000`. Tekshirish: `GET /api/health`

## OneID ulash

1. https://id.egov.uz orqali tashkilot sifatida ro'yxatdan o'ting va ariza bering — sizga `client_id` va `client_secret` beriladi.
2. `.env` faylida to'ldiring:
   ```
   ONEID_CLIENT_ID=...
   ONEID_CLIENT_SECRET=...
   ONEID_REDIRECT_URI=https://sizning-domeningiz.uz/api/auth/oneid/callback
   ```
3. Frontendda "OneID orqali kirish" tugmasi foydalanuvchini `GET /api/auth/oneid/login` ga yo'naltirsin — u OneID sahifasiga o'tkazadi. Muvaffaqiyatli kirishdan so'ng foydalanuvchi `FRONTEND_URL/auth/success?token=...` ga qaytariladi.

**ONEID_CLIENT_ID to'ldirilmagunicha** `/api/auth/oneid/login` `503` xatolik qaytaradi va tushuntiradi nima qilish kerakligini. Bu vaqtda `/api/auth/demo-login` orqali (ism + telefon) sinash mumkin — bu faqat rivojlantirish/test uchun, production uchun emas.

## API marshrutlari

| Marshrut | Metod | Tavsif |
|---|---|---|
| `/api/health` | GET | Server holati |
| `/api/auth/oneid/login` | GET | OneID'ga yo'naltirish |
| `/api/auth/oneid/callback` | GET | OneID qaytish nuqtasi |
| `/api/auth/oneid/status` | GET | OneID sozlanganmi? |
| `/api/auth/demo-login` | POST | Test uchun oddiy kirish `{name, phone}` |
| `/api/auth/me` | GET | Joriy foydalanuvchi (JWT talab qilinadi) |
| `/api/jobs`, `/api/courses`, `/api/grants`, `/api/medical`, `/api/legal`, `/api/psych`, `/api/donors`, `/api/news` | GET | Ro'yxat / `/: id` — bitta element |
| `/api/orgs?type=davlat\|nodavlat&region=...` | GET | Tashkilotlar, filtr bilan |
| `/api/contact` | POST | Murojaat yuborish `{name, category, message, phone}` |
| `/api/admin/*` | GET/POST/PATCH | Faqat admin uchun (JWT + `isAdmin: true`) |

## Frontend bilan bog'lash

Hozirgi React prototipi (`yordam-platformasi.jsx`) — Claude.ai artifact muhitida ishlaydi va tashqi serverlarga (shu jumladan bu backendga) tarmoq so'rovi yubora olmaydi — bu muhit xavfsizlik uchun izolyatsiya qilingan.

Ushbu backendni ishlatish uchun:
1. Uni real serverga (VPS, Render, Railway va h.k.) joylashtiring yoki lokal ishga tushiring.
2. Frontendni (masalan Vite/Next.js loyihasiga ko'chirib) `fetch('http://sizning-server/api/...')` orqali ulang.
3. Kerak bo'lsa, men frontendni ham shu API'ga ulanadigan holga o'tkazib beraman — buyicha alohida ayting.

## Ma'lumotlar bazasi

Hozircha oddiy JSON fayl (`data.json`) ishlatiladi — kichik loyihalar uchun yetarli. Foydalanuvchilar ko'payganda PostgreSQL yoki MySQL'ga o'tish tavsiya etiladi.
