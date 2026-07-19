import { Briefcase, GraduationCap, Wallet, Landmark, HeartPulse, Scale, Brain, HandHeart } from "lucide-react";

export const categoriesMeta = [
  { id: "jobs", endpoint: "jobs", title: "Ish o'rinlari", sub: "va masofaviy ishlar", emoji: "💼", Icon: Briefcase, cta: "Ushbu ish o'rniga ariza topshirish" },
  { id: "courses", endpoint: "courses", title: "Ta'lim va", sub: "onlayn kurslar", emoji: "🎓", Icon: GraduationCap, cta: "Ushbu kursga yozilish" },
  { id: "grants", endpoint: "grants", title: "Grant, subsidiya", sub: "va imtiyozlar", emoji: "💰", Icon: Wallet, cta: "Ushbu grant/imtiyozga ariza topshirish" },
  { id: "orgs", endpoint: "orgs", title: "Davlat va nodavlat", sub: "tashkilotlar", emoji: "🏢", Icon: Landmark, cta: "Ushbu tashkilotga murojaat yuborish" },
  { id: "medical", endpoint: "medical", title: "Tibbiy va", sub: "reabilitatsiya markazlari", emoji: "🏥", Icon: HeartPulse, cta: "Ushbu markazga yozilish" },
  { id: "legal", endpoint: "legal", title: "Huquqiy", sub: "maslahat", emoji: "⚖️", Icon: Scale, cta: "Yuristga savol yuborish" },
  { id: "psych", endpoint: "psych", title: "Psixologik", sub: "yordam", emoji: "🧠", Icon: Brain, cta: "Psixolog bilan bog'lanish" },
  { id: "donors", endpoint: "donors", title: "Homiylar va", sub: "ko'ngillilar", emoji: "🤝", Icon: HandHeart, cta: "Ko'ngilli bo'lish uchun ariza" },
];

export const regions = [
  "Barcha viloyatlar", "Toshkent shahri", "Toshkent viloyati", "Samarqand",
  "Buxoro", "Farg'ona", "Andijon", "Namangan", "Qashqadaryo", "Surxondaryo",
  "Xorazm", "Navoiy", "Jizzax", "Sirdaryo", "Qoraqalpog'iston",
];
