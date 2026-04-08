import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "Daily Routine with Barakah": "Daily Routine with Barakah",
      "And I did not create Jinn and Mankind except to worship Me.":
        "And I did not create Jinn and Mankind except to worship Me.",
      "Daily Progress": "Daily Progress",
      "Alhamdulillah - Completed": "Alhamdulillah - Completed",
      // Phases
      "The Evening": "The Evening",
      "Opening of the Islamic Day": "Opening of the Islamic Day",
      "The Night": "The Night",
      "Worship, Knowledge & Rest": "Worship, Knowledge & Rest",
      "The Heart of the Day": "The Heart of the Day",
      "A Moment for Miracles": "A Moment for Miracles",
      "The Morning": "The Morning",
      "Discipline Creates Freedom": "Discipline Creates Freedom",
      "Step Back & Recharge": "Step Back & Recharge",
      "Sustained Energy & Reflection": "Sustained Energy & Reflection",
      // Categories
      Spiritual: "Spiritual",
      Personal: "Personal",
      Intellectual: "Intellectual",
      Physical: "Physical",
      Professional: "Professional",
      Rest: "Rest",
      //Footer
      "Value five before they are gone: youth before age, health before illness, wealth before poverty, free time before busyness and life before death.":
        "Value five before they are gone: youth before age, health before illness, wealth before poverty, free time before busyness and life before death.",
    },
  },
  bn: {
    translation: {
      "Daily Routine with Barakah": "বারাকাহপূর্ণ দৈনিক রুটিন",
      "And I did not create Jinn and Mankind except to worship Me.":
        "আমি জিন ও মানুষকে আমার ইবাদত ছাড়া অন্য কোনো উদ্দেশ্যে সৃষ্টি করিনি।",
      "Daily Progress": "আজকের অগ্রগতি",
      "Alhamdulillah - Completed": "আলহামদুলিল্লাহ - সম্পন্ন",
      // Phases
      "The Evening": "সন্ধ্যাবেলা",
      "Opening of the Islamic Day": "ইসলামিক দিনের শুরু",
      "The Night": "রাত",
      "Worship, Knowledge & Rest": "ইবাদত, জ্ঞান ও বিশ্রাম",
      "The Heart of the Day": "দিনের মূল প্রহর",
      "A Moment for Miracles": "অলৌকিক কিছু পাওয়ার মুহূর্ত",
      "The Morning": "সকাল",
      "Discipline Creates Freedom": "শৃঙ্খলা স্বাধীনতা তৈরি করে",
      "Step Back & Recharge": "বিরতি ও রিচার্জ",
      "Sustained Energy & Reflection": "শক্তি ও আত্মচিন্তা",
      // Categories
      Spiritual: "আধ্যাত্মিক",
      Personal: "ব্যক্তিগত",
      Intellectual: "বুদ্ধিবৃত্তিক",
      Physical: "শারীরিক",
      Professional: "পেশাদার",
      Rest: "বিশ্রাম",
      // Items
      "Maghrib — Where the Day is Born": "মাগরিব — যেখানে দিনের শুরু",
      "Plant the seed of the day with Maghrib, water it with Al-Waqiah and shelter it through the evening adhkar.":
        "মাগরিবের মাধ্যমে দিনের বীজ রোপণ করুন, আল-ওয়াকিয়াহ দিয়ে পানি দিন এবং সন্ধ্যার জিকিরের মাধ্যমে একে সুরক্ষিত রাখুন।",
      "The Sunnah of Togetherness — Dinner & Family Time":
        "একাত্মতার সুন্নাহ — রাতের খাবার ও পারিবারিক সময়",
      "Share a blessed meal, speak with kindness and give full attention to your family.":
        "বরকতময় খাবার গ্রহণ করুন, দয়ার সাথে কথা বলুন এবং আপনার পরিবারকে পূর্ণ মনোযোগ দিন।",
      "Isha — The Final Call of the Day": "এশা — দিনের শেষ আহ্বান",
      "End the day's worship with Isha and let Al-Mulk stand guard over your night.":
        "এশার মাধ্যমে দিনের ইবাদত শেষ করুন এবং সূরা আল-মুলককে আপনার রাতের পাহারাদার হতে দিন।",
      "Evening Study & Reflection": "রাতের পড়াশোনা ও আত্মচিন্তা",
      "Two hours dedicated to growth — read, reflect and close the day wiser than you opened it.":
        "উন্নতির জন্য দুই ঘণ্টা নিবেদিত — পড়ুন, চিন্তা করুন এবং দিনটি শুরু করার চেয়েও বেশি জ্ঞানী হয়ে শেষ করুন।",
      "Sleep — The Body's Right and the Soul's Rest":
        "ঘুম — শরীরের অধিকার ও আত্মার বিশ্রাম",
      "Your body has a right over you — honor it with 6-8 hours of sleep, ensuring you wake up refreshed for the blessings of a new day.":
        "আপনার ওপর আপনার শরীরের অধিকার রয়েছে — ৬-৮ ঘণ্টা ঘুমিয়ে একে সম্মান করুন, যেন নতুন দিনের বরকতের জন্য সতেজ হয়ে উঠতে পারেন।",
      "Qiyam Ul-Layl": "কিয়ামুল লাইল",
      "Stand in Tahajjud — the secret hour where Dua meets Destiny and Barakah begins.":
        "তাহাজ্জুদে দাঁড়ান — সেই গোপন মুহূর্ত যেখানে দোয়া ভাগ্যের সাথে মিলিত হয় এবং বরকত শুরু হয়।",
      "Fajr & Morning Light": "ফজর ও ভোরের আলো",
      "Begin the day with Fajr prayer, welcome the morning with adhkar and recite Surah Yaseen to start your day with barakah and clarity.":
        "ফজর নামাজের মাধ্যমে দিন শুরু করুন, জিকিরের মাধ্যমে সকালকে স্বাগত জানান এবং বরকত ও স্বচ্ছতার জন্য সূরা ইয়াসিন তিলাওয়াত করুন।",
      "Strength & Energy": "শক্তি ও সামর্থ্য",
      "Train your body, refresh yourself and fuel with a healthy breakfast.":
        "শরীরকে প্রশিক্ষণ দিন, নিজেকে সতেজ করুন এবং স্বাস্থ্যকর নাস্তার মাধ্যমে শক্তি অর্জন করুন।",
      "Prepare the Mind": "মনকে প্রস্তুত করুন",
      "Study, reflect and structure your priorities for the day ahead.":
        "অধ্যয়ন করুন, চিন্তা করুন এবং সামনের দিনের জন্য আপনার অগ্রাধিকারগুলো সাজান।",
      "Deep Work": "গভীর মনোযোগের কাজ",
      "Work deeply on your most important tasks - no compromises.":
        "আপনার সবচেয়ে গুরুত্বপূর্ণ কাজগুলোতে গভীরভাবে মনোনিবেশ করুন - কোনো আপোষ নয়।",
      "Reset the Body": "শরীরের বিশ্রাম",
      "Eat, rest and recharge away from your workspace":
        "কাজের জায়গা থেকে দূরে গিয়ে খাবার গ্রহণ করুন, বিশ্রাম নিন এবং নিজেকে রিচার্জ করুন।",
      "Spiritual Pause": "আধ্যাত্মিক বিরতি",
      "Pray Duhr to realign your focus and renew your purpose.":
        "আপনার লক্ষ্য ঠিক করতে এবং উদ্দেশ্য পুনর্নবীকরণ করতে জোহরের নামাজ আদায় করুন।",
      "Calm Productivity": "শান্ত উৎপাদনশীলতা",
      "Balance family time with light responsibilities.":
        "হালকা দায়িত্বের সাথে পারিবারিক সময়ের ভারসাম্য বজায় রাখুন।",
      "Spiritual Checkpoint": "আধ্যাত্মিক চেকপয়েন্ট",
      "Asr prayer — pause, reflect and reconnect.":
        "আসর নামাজ — থামুন, চিন্তা করুন এবং পুনরায় সংযোগ স্থাপন করুন।",
      "Daily Review & Planning": "দৈনিক পর্যালোচনা ও পরিকল্পনা",
      "Review your progress and set a clear plan for tomorrow.":
        "আপনার অগ্রগতি পর্যালোচনা করুন এবং আগামীকালের জন্য একটি পরিষ্কার পরিকল্পনা তৈরি করুন।",
      // Footer
      "Value five before they are gone: youth before age, health before illness, wealth before poverty, free time before busyness and life before death.":
        "যে পাঁচটি জিনিস চলে যাওয়ার আগে তাদের মূল্য দিন: বয়সের আগে যুবক, অসুস্থতার আগে স্বাস্থ্য, দারিদ্র্যের আগে সম্পদ, ব্যস্ততার আগে অবসর এবং মৃত্যুর আগে জীবন।",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
