import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "data.json");

const seed = {
  users: [],
  contacts: [],

  jobs: [
    { id: "j1", t: "Kontent menejer (masofaviy)", d: "IT Park · to'liq stavka", detail: "Kompaniya ijtimoiy tarmoqlari va veb-sayti uchun kontent tayyorlash, matn va rasm materiallarini boshqarish.", phone: "+998 71 238-00-00", note: "Ish haqi: 3–4 mln so'm/oy", status: "tasdiqlangan" },
    { id: "j2", t: "Call-markaz operatori", d: "Ayti Praktikum · moslashuvchan grafik", detail: "Mijozlar bilan telefon orqali muloqot, savollarga javob berish. Uydan ishlash imkoniyati bor.", phone: "+998 78 150-00-11", note: "Ish haqi: 2.5–3 mln so'm/oy", status: "tasdiqlangan" },
    { id: "j3", t: "Grafik dizayner", d: "Frilanser · loyiha asosida", detail: "Logotip, banner va ijtimoiy tarmoq uchun vizual materiallar yaratish. Loyiha asosida to'lov.", phone: "+998 90 111-22-33", note: "To'lov: loyiha bo'yicha", status: "tasdiqlangan" },
    { id: "j4", t: "Ma'lumotlar kiritish mutaxassisi", d: "Masofaviy · yarim stavka", detail: "Elektron jadvallarga ma'lumot kiritish va tekshirish. Kompyuter va internet talab qilinadi.", phone: "+998 71 200-10-20", note: "Ish haqi: 1.5–2 mln so'm/oy", status: "kutilmoqda" },
  ],

  courses: [
    { id: "c1", t: "Veb-dasturlash asoslari", d: "IT Park Akademiyasi · bepul", detail: "HTML, CSS va JavaScript asoslarini o'rgatuvchi kurs.", phone: "+998 71 238-00-01", note: "Davomiyligi: 3 oy · Boshlanish: har oyning 1-sanasi" },
    { id: "c2", t: "Ingliz tili — boshlang'ich", d: "Onlayn · bepul", detail: "Kunlik 1 soatlik onlayn darslar, guruh 10 kishigacha.", phone: "+998 71 200-30-40", note: "Davomiyligi: 4 oy" },
    { id: "c3", t: "Buxgalteriya hisobi", d: "Pullik · nogironlar uchun chegirma", detail: "1C dasturi va soliq hisobotlari asoslari. Nogironlik guruhiga ega talabalar uchun 50% chegirma.", phone: "+998 71 233-40-50", note: "Narxi: 1.2 mln so'm (chegirma bilan 600 ming so'm)" },
    { id: "c4", t: "Grafik dizayn kursi", d: "Onlayn · 2 oy", detail: "Photoshop va Canva dasturlarida ishlashni o'rganasiz.", phone: "+998 90 222-33-44", note: "Davomiyligi: 2 oy" },
  ],

  grants: [
    { id: "g1", t: "Start-up granti", d: "Yoshlar tashabbusi uchun · 5 mln so'm", detail: "Nogironligi bo'lgan yoshlarning biznes g'oyalarini moliyalashtirish uchun davlat granti.", phone: "+998 71 202-00-05", note: "Ariza muddati: 15-avgustgacha" },
    { id: "g2", t: "Ijtimoiy himoya subsidiyasi", d: "Oylik nafaqa qo'shimchasi", detail: "Kam ta'minlangan oilalar uchun qo'shimcha oylik to'lov.", phone: "+998 71 202-00-06", note: "Har oy to'lanadi" },
    { id: "g3", t: "Kasb-hunar o'rganish granti", d: "Davlat dasturi", detail: "Kasb-hunar kurslarida bepul o'qish uchun davlat tomonidan moliyalashtiriladi.", phone: "+998 71 202-00-07", note: "Ariza doimiy qabul qilinadi" },
    { id: "g4", t: "Uy-joy imtiyozi", d: "Nogironlar uchun davlat dasturi", detail: "Ijtimoiy uy-joy olish yoki ijara uchun subsidiya dasturi.", phone: "+998 71 202-00-08", note: "Navbat asosida" },
  ],

  orgs: [
    { id: "o1", name: "Mehnat va aholini ijtimoiy muhofaza qilish vazirligi", type: "davlat", region: "Barcha viloyatlar", d: "Rasmiy xizmatlar va murojaatlar qabuli", phone: "+998 71 202-00-01", address: "Toshkent sh., Mustaqillik ko'chasi 1" },
    { id: "o2", name: "Bandlikka ko'maklashish davlat jamg'armasi", type: "davlat", region: "Barcha viloyatlar", d: "Ish bilan ta'minlash dasturlari", phone: "+998 71 233-48-88", address: "Toshkent sh., Amir Temur shoh ko'chasi 47" },
    { id: "o3", name: "Mahalla va oilani qo'llab-quvvatlash vazirligi", type: "davlat", region: "Barcha viloyatlar", d: "Mahalliy ijtimoiy yordam", phone: "+998 71 202-70-70", address: "Har bir tumandagi mahalla fuqarolar yig'ini orqali" },
    { id: "o4", name: "Prezident huzuridagi Yoshlar ishlari agentligi", type: "davlat", region: "Toshkent shahri", d: "Yoshlar tashabbuslarini qo'llab-quvvatlash", phone: "+998 71 233-15-15", address: "Toshkent sh., Bunyodkor ko'chasi 21" },
    { id: "o5", name: "Respublika nogironlarni ijtimoiy himoya qilish jamg'armasi", type: "davlat", region: "Toshkent shahri", d: "Nafaqa va ijtimoiy to'lovlar", phone: "+998 71 244-60-10", address: "Toshkent sh., Novza ko'chasi 1" },
    { id: "o6", name: "Farg'ona viloyati nogironlar reabilitatsiya markazi", type: "davlat", region: "Farg'ona", d: "Tibbiy-ijtimoiy reabilitatsiya", phone: "+998 73 244-12-34", address: "Farg'ona sh., Al-Farg'oniy ko'chasi 12" },
    { id: "o7", name: "Nizomiy nomidagi TDPU Inklyuziv ta'lim markazi", type: "davlat", region: "Toshkent shahri", d: "Inklyuziv ta'lim bo'yicha metodik yordam", phone: "+998 71 254-99-42", address: "Toshkent sh., Yusuf Xos Hojib ko'chasi 103" },
    { id: "o8", name: "O'zbekiston Nogironlar jamiyati", type: "nodavlat", region: "Barcha viloyatlar", d: "Mintaqaviy bo'limlari bilan huquq himoyasi", phone: "+998 71 150-11-22", address: "Toshkent sh., Shayxontohur tumani, markaziy bo'lim" },
    { id: "o9", name: "UNDP O'zbekiston", type: "nodavlat", region: "Toshkent shahri", d: "Ijtimoiy loyihalar va grant dasturlari", phone: "+998 71 120-34-50", address: "Toshkent sh., Taras Shevchenko ko'chasi 4" },
    { id: "o10", name: "UNICEF O'zbekiston", type: "nodavlat", region: "Toshkent shahri", d: "Yoshlar va bolalar dasturlari", phone: "+998 71 233-49-40", address: "Toshkent sh., Islom Karimov ko'chasi 43" },
    { id: "o11", name: "Xalqaro Mehnat Tashkiloti (ILO) vakolatxonasi", type: "nodavlat", region: "Toshkent shahri", d: "Bandlik va mehnat huquqlari", phone: "+998 71 120-61-71", address: "Toshkent sh., Mirzo Ulug'bek tumani" },
    { id: "o12", name: "\"Sen Yolg'iz Emassan\" jamg'armasi", type: "nodavlat", region: "Toshkent shahri", d: "Psixologik va ijtimoiy qo'llab-quvvatlash", phone: "+998 90 123-45-67", address: "Toshkent sh., Chilonzor tumani" },
    { id: "o13", name: "\"Mehr nuri\" xayriya jamg'armasi", type: "nodavlat", region: "Samarqand", d: "Xayriya va reabilitatsiya yordami", phone: "+998 66 233-11-09", address: "Samarqand sh., Registon ko'chasi 5" },
    { id: "o14", name: "\"Najot\" ijtimoiy markazi", type: "nodavlat", region: "Buxoro", d: "Kasb-hunar o'rgatish va moslashtirish", phone: "+998 65 221-40-06", address: "Buxoro sh., Bahouddin Naqshband ko'chasi 2" },
    { id: "o15", name: "\"Kelajak\" nogironlar jamiyati bo'limi", type: "nodavlat", region: "Andijon", d: "Mahalliy hamjamiyat dasturlari", phone: "+998 74 223-55-19", address: "Andijon sh., Bobur shox ko'chasi 8" },
  ],

  medical: [
    { id: "m1", t: "Respublika reabilitatsiya markazi", d: "Toshkent shahri", detail: "Jismoniy va nutq reabilitatsiyasi xizmatlari, individual dastur asosida.", phone: "+998 71 244-60-11", address: "Toshkent sh., Novza ko'chasi 3" },
    { id: "m2", t: "Protezlash markazi", d: "Bepul konsultatsiya", detail: "Protez va ortopedik vositalarni tanlash va moslashtirish bo'yicha yordam.", phone: "+998 71 244-70-12", address: "Toshkent sh., Chilonzor tumani" },
    { id: "m3", t: "Bepul tibbiy ko'rik", d: "Har oyning birinchi shanbasi", detail: "Umumiy tibbiy ko'rikdan bepul o'tish, oldindan ro'yxatdan o'tish talab qilinadi.", phone: "+998 71 244-80-13", address: "Tuman poliklinikalari" },
    { id: "m4", t: "Fizioterapiya xizmati", d: "Uyga chaqirish imkoni bor", detail: "Massaj va fizioterapiya seanslari, uyga mutaxassis chaqirish mumkin.", phone: "+998 71 244-90-14", address: "Toshkent shahri bo'ylab" },
  ],

  legal: [
    { id: "l1", t: "Bepul yuridik konsultatsiya", d: "Advokat bilan onlayn suhbat", detail: "Huquqiy savollaringiz bo'yicha malakali advokat bilan bepul onlayn maslahat.", phone: "+998 71 233-90-01" },
    { id: "l2", t: "Nogironlar huquqlari qonunchiligi", d: "To'liq qo'llanma", detail: "Nogironlik bilan bog'liq barcha qonun va farmonlarning sodda tildagi qo'llanmasi.", phone: "+998 71 233-90-02" },
    { id: "l3", t: "Ariza va shakllar", d: "Tayyor namunalar", detail: "Turli davlat idoralariga murojaat uchun tayyor ariza namunalari.", phone: "+998 71 233-90-03" },
  ],

  psych: [
    { id: "p1", t: "Onlayn psixolog bilan suhbat", d: "Maxfiy va bepul", detail: "Malakali psixolog bilan video yoki matnli chat orqali maxfiy suhbat.", phone: "+998 71 210-00-01" },
    { id: "p2", t: "Ishonch telefoni", d: "1050 — 24/7", detail: "Har qanday vaqtda qo'ng'iroq qilib, tinglovchi mutaxassis bilan gaplashish mumkin.", phone: "1050" },
    { id: "p3", t: "Guruh terapiyasi", d: "Har hafta, onlayn", detail: "O'xshash tajribaga ega yoshlar bilan guruh muhokamasi, moderator boshchiligida.", phone: "+998 71 210-00-03" },
  ],

  donors: [
    { id: "dn1", t: "Ko'ngilli bo'lish", d: "Ro'yxatdan o'ting, jamoaga qo'shiling", detail: "Tadbirlar va loyihalarda faol ishtirok etish uchun ko'ngillilar jamoasiga qo'shiling.", phone: "+998 71 220-00-01" },
    { id: "dn2", t: "Homiylik dasturi", d: "Biznes va tashkilotlar uchun", detail: "Kompaniyalar uchun ijtimoiy loyihalarni qo'llab-quvvatlash imkoniyati.", phone: "+998 71 220-00-02" },
    { id: "dn3", t: "Faol ko'ngillilar", d: "Bu oyning eng faollari", detail: "Eng faol ko'ngillilar reytingi va ularning hissasi haqida ma'lumot.", phone: "+998 71 220-00-03" },
  ],

  news: [
    { id: "n1", t: "Ochiq eshiklar kuni", d: "24-iyul · Milliy bog'da tadbir bo'lib o'tadi", emoji: "📢" },
    { id: "n2", t: "Yangi ish o'rinlari e'lon qilindi", d: "IT Park hamkorligida 12 ta vakansiya", emoji: "💼" },
    { id: "n3", t: "Grant tanlovi boshlandi", d: "Ariza topshirish muddati — 15-avgust", emoji: "💰" },
  ],
};

function load() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function save(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function readDB() {
  return load();
}

export function writeDB(data) {
  save(data);
}

export function resetDB() {
  save(seed);
  return seed;
}
