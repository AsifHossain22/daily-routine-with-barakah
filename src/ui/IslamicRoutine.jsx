import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next"; // Added
import "../i18n"; // Import config
import {
  Moon,
  Sun,
  Sunrise,
  Sunset,
  BookOpen,
  Briefcase,
  Heart,
  BedDouble,
  Utensils,
  Activity,
  PenTool,
  Star,
  CheckCircle2,
  Circle,
  Languages,
} from "lucide-react";

// CategoryBadge
const CategoryBadge = ({ category, t }) => {
  const styles = {
    Spiritual: "bg-emerald-950 text-emerald-400 border-emerald-800",
    Personal: "bg-blue-950 text-blue-400 border-blue-800",
    Intellectual: "bg-purple-950 text-purple-400 border-purple-800",
    Physical: "bg-orange-950 text-orange-400 border-orange-800",
    Professional: "bg-amber-950 text-amber-400 border-amber-800",
    Rest: "bg-slate-800 text-slate-300 border-slate-600",
  };
  return (
    <span
      className={`px-2.5 py-0.5 text-[10px] md:text-xs font-semibold rounded-full border 
      tracking-wide whitespace-nowrap ${styles[category]}`}
    >
      {t(category)}
    </span>
  );
};

// AnimatedCard
const AnimatedCard = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        opacity: visible ? 1 : 0,
        transition:
          "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
};

// LiveClock
const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="sticky top-4 z-50 flex justify-center mb-6 pointer-events-none">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border 
      border-emerald-500/30 text-emerald-400 text-xs md:text-sm font-mono backdrop-blur-md shadow-2xl 
      pointer-events-auto transition-all hover:border-emerald-400"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
};

// DayProgressBanner
const DayProgressBanner = ({ completed, total, t }) => {
  const pct = Math.round((completed / total) * 100);
  const isAllDone = completed === total && total > 0;
  return (
    <div
      className="sticky top-15 z-50 max-w-3xl mx-auto mb-12 bg-slate-900/80 border border-slate-800/50 
    rounded-2xl p-4 md:p-5 backdrop-blur-md shadow-xl sm:mx-auto"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs md:text-sm font-semibold text-slate-300 tracking-wide">
          {isAllDone ? (
            <span className="text-amber-400 flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {t("Alhamdulillah - Completed")}
            </span>
          ) : (
            t("Daily Progress")
          )}
        </span>
        <span
          className={`text-xs md:text-sm font-bold ${isAllDone ? "text-amber-400" : "text-emerald-400"}`}
        >
          {completed} / {total}
        </span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${pct}%`,
            background: isAllDone
              ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
              : "linear-gradient(90deg, #10b981, #34d399)",
          }}
        />
      </div>
    </div>
  );
};

const IslamicRoutine = () => {
  const { t, i18n } = useTranslation(); // TranslationHook

  // TaskCompletionState
  const [checked, setChecked] = useState({});
  const [dynamicTimes, setDynamicTimes] = useState({});

  // LanguageToggle
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "bn" : "en");
  };

  // RoutineData
  const routinePhases = [
    {
      phase: t("The Evening"),
      subtitle: t("Opening of the Islamic Day"),
      icon: <Sunset className="w-6 h-6 text-amber-400" />,
      items: [
        {
          time: "6:40 PM",
          title: "Maghrib — Where the Day is Born",
          desc: "Plant the seed of the day with Maghrib, water it with Al-Waqiah and shelter it through the evening adhkar.",
          category: "Spiritual",
          icon: <Star className="w-5 h-5" />,
        },
        {
          time: "7:15 PM",
          title: "The Sunnah of Togetherness — Dinner & Family Time",
          desc: "Share a blessed meal, speak with kindness and give full attention to your family.",
          category: "Personal",
          icon: <Heart className="w-5 h-5" />,
        },
      ],
    },
    {
      phase: t("The Night"),
      subtitle: t("Worship, Knowledge & Rest"),
      icon: <Moon className="w-6 h-6 text-slate-300" />,
      items: [
        {
          time: "8:00 PM",
          title: "Isha — The Final Call of the Day",
          desc: "End the day's worship with Isha and let Al-Mulk stand guard over your night.",
          category: "Spiritual",
          icon: <Star className="w-5 h-5" />,
        },
        {
          time: "8:30 PM",
          title: "Evening Study & Reflection",
          desc: "Two hours dedicated to growth — read, reflect and close the day wiser than you opened it.",
          category: "Intellectual",
          icon: <BookOpen className="w-5 h-5" />,
        },
        {
          time: "10:30 PM",
          title: "Sleep — The Body's Right and the Soul's Rest",
          desc: "Your body has a right over you — honor it with 6-8 hours of sleep, ensuring you wake up refreshed for the blessings of a new day.",
          category: "Rest",
          icon: <BedDouble className="w-5 h-5" />,
        },
      ],
    },
    {
      phase: t("The Heart of the Day"),
      subtitle: t("A Moment for Miracles"),
      icon: <Sunrise className="w-6 h-6 text-emerald-400" />,
      items: [
        {
          time: "3:30 AM",
          title: "Qiyam Ul-Layl",
          desc: "Stand in Tahajjud — the secret hour where Dua meets Destiny and Barakah begins.",
          category: "Spiritual",
          icon: <Star className="w-5 h-5" />,
        },
        {
          time: "4:30 AM",
          title: "Fajr & Morning Light",
          desc: "Begin the day with Fajr prayer, welcome the morning with adhkar and recite Surah Yaseen to start your day with barakah and clarity.",
          category: "Spiritual",
          icon: <BookOpen className="w-5 h-5" />,
        },
      ],
    },
    {
      phase: t("The Morning"),
      subtitle: t("Discipline Creates Freedom"),
      icon: <Sun className="w-6 h-6 text-amber-400" />,
      items: [
        {
          time: "6:00 AM",
          title: "Strength & Energy",
          desc: "Train your body, refresh yourself and fuel with a healthy breakfast.",
          category: "Physical",
          icon: <Activity className="w-5 h-5" />,
        },
        {
          time: "6:30 AM",
          title: "Prepare the Mind",
          desc: "Study, reflect and structure your priorities for the day ahead.",
          category: "Intellectual",
          icon: <PenTool className="w-5 h-5" />,
        },
        {
          time: "8:00 AM",
          title: "Deep Work",
          desc: "Work deeply on your most important tasks - no compromises.",
          category: "Professional",
          icon: <Briefcase className="w-5 h-5" />,
        },
      ],
    },
    {
      phase: t("Step Back & Recharge"),
      subtitle: t("Sustained Energy & Reflection"),
      icon: <Sun className="w-6 h-6 text-orange-400" />,
      items: [
        {
          time: "12:00 PM",
          title: "Reset the Body",
          desc: "Eat, rest and recharge away from your workspace",
          category: "Physical",
          icon: <Utensils className="w-5 h-5" />,
        },
        {
          time: "12:30 PM",
          title: "Spiritual Pause",
          desc: "Pray Duhr to realign your focus and renew your purpose.",
          category: "Spiritual",
          icon: <Star className="w-5 h-5" />,
        },
        {
          time: "1:00 PM",
          title: "Calm Productivity",
          desc: "Balance family time with light responsibilities.",
          category: "Personal",
          icon: <Heart className="w-5 h-5" />,
        },
        {
          time: "3:50 PM",
          title: "Spiritual Checkpoint",
          desc: "Asr prayer — pause, reflect and reconnect.",
          category: "Spiritual",
          icon: <Star className="w-5 h-5" />,
        },
        {
          time: "4:30 PM",
          title: "Daily Review & Planning",
          desc: "Review your progress and set a clear plan for tomorrow.",
          category: "Intellectual",
          icon: <PenTool className="w-5 h-5" />,
        },
      ],
    },
  ];

  // CompletionLogic
  const allItemsCount = routinePhases.reduce(
    (acc, p) => acc + p.items.length,
    0,
  );

  // ToggleItem
  const toggleItem = (key) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  const completedCount = Object.values(checked).filter(Boolean).length;

  // DynamicPrayerTimes
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`,
          );
          const data = await res.json();
          const tArr = data.data.timings;
          const formatTime = (time24) => {
            let [hour, min] = time24.split(":");
            let h = parseInt(hour, 10);
            return `${h % 12 || 12}:${min} ${h >= 12 ? "PM" : "AM"}`;
          };
          setDynamicTimes({
            "Fajr & Morning Light": formatTime(tArr.Fajr),
            "Spiritual Pause": formatTime(tArr.Dhuhr),
            "Spiritual Checkpoint": formatTime(tArr.Asr),
            "Maghrib — Where the Day is Born": formatTime(tArr.Maghrib),
            "Isha — The Final Call of the Day": formatTime(tArr.Isha),
          });
        } catch (err) {
          console.error(err);
        }
      });
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-200 py-8 px-4 font-sans 
    selection:bg-emerald-500/30"
    >
      {/* ToggleTranslator */}
      <div className="fixed bottom-6 right-6 z-100">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border 
          border-emerald-500/30 text-emerald-400 text-xs font-bold backdrop-blur-md hover:border-emerald-400 
          transition-all shadow-2xl"
        >
          <Languages className="w-4 h-4" />
          {i18n.language === "en" ? "বাংলা" : "English"}
        </button>
      </div>

      {/* Header */}
      <header className="max-w-3xl mx-auto text-center mb-12 md:mb-20 px-2">
        <h2 className="text-xl md:text-2xl text-amber-400/70 font-arabic mb-6 tracking-[0.2em]">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h2>
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-linear-to-b from-white via-slate-200 to-slate-500">
          {t("Daily Routine with Barakah")}
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto font-medium">
          "{t("And I did not create Jinn and Mankind except to worship Me.")}"
          <br /> — Quran 51:56
        </p>
      </header>

      {/* LiveClock */}
      <LiveClock />

      {/* DayProgressBanner */}
      <DayProgressBanner
        completed={completedCount}
        total={allItemsCount}
        t={t}
      />

      {/* Main */}
      <main className="max-w-3xl mx-auto space-y-16 md:space-y-24">
        {routinePhases.map((phaseData, pIdx) => (
          // PhaseSection
          <section key={pIdx} className="relative">
            {/* PhaseHeader */}
            <div className="sticky top-35 md:top-40 z-40 mb-8">
              <div
                className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl p-3 md:p-4 
              rounded-2xl border border-white/5 shadow-2xl"
              >
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-white/10 text-emerald-400">
                  {phaseData.icon}
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                    {phaseData.phase}
                  </h2>
                  <p
                    className="text-emerald-400/70 text-[10px] md:text-xs font-bold uppercase 
                  tracking-widest"
                  >
                    {phaseData.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative space-y-6 ml-6 md:ml-10 pl-6 md:pl-10 border-l border-slate-800/50">
              {phaseData.items.map((item, iIdx) => {
                const key = `${pIdx}-${iIdx}`;
                const isDone = !!checked[key];
                return (
                  // TaskCard
                  <AnimatedCard key={key} delay={iIdx * 50}>
                    <div
                      className={`group relative rounded-2xl p-4 md:p-6 transition-all flex 
                        flex-col sm:flex-row gap-4 items-start sm:items-center border ${
                          isDone
                            ? "bg-emerald-950/20 opacity-60"
                            : "bg-slate-900/40 shadow-xl"
                        }`}
                    >
                      <div
                        className={`absolute -left-8 md:-left-12 top-7 md:top-1/2 md:-translate-y-1/2 w-3.5 
                          h-3.5 rounded-full border-2 transition-all ${
                            isDone
                              ? "bg-emerald-500"
                              : "bg-slate-950 border-slate-700"
                          }`}
                      />
                      <div className="shrink-0 min-w-20 font-bold text-emerald-400/90 text-sm md:text-base">
                        {dynamicTimes[item.title] || item.time}
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={
                              isDone ? "text-slate-600" : "text-amber-400/80"
                            }
                          >
                            {item.icon}
                          </span>
                          <h3
                            className={`text-base md:text-lg font-bold ${
                              isDone
                                ? "line-through text-slate-500"
                                : "text-slate-100"
                            }`}
                          >
                            {t(item.title)}
                          </h3>
                        </div>
                        <p
                          className={`text-xs md:text-sm ${isDone ? "text-slate-600" : "text-slate-400"}`}
                        >
                          {t(item.desc)}
                        </p>
                      </div>
                      <div
                        className="flex items-center gap-3 w-full sm:w-auto justify-between 
                      sm:justify-end border-t sm:border-t-0 border-slate-800/50 pt-2 sm:pt-0"
                      >
                        <CategoryBadge category={item.category} t={t} />
                        <button
                          onClick={() => toggleItem(key)}
                          className="active:scale-90 transition-all"
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-700" />
                          )}
                        </button>
                      </div>
                    </div>
                  </AnimatedCard>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      <footer className="max-w-2xl mx-auto mt-20 text-center py-12 border-t border-slate-900">
        <p className="text-slate-500 text-xs md:text-sm italic tracking-wide">
          {t(
            "Value five before they are gone: youth before old age, health before illness, wealth before poverty, free time before busyness and life before death.",
          )}
        </p>

        <p className="text-slate-500 text-xs md:text-sm italic tracking-wide mt-10">
          All rights reserved. Developed by{" "}
          <span className="text-amber-400 font-bold">Hi ASIF</span>
        </p>
      </footer>
    </div>
  );
};

export default IslamicRoutine;
