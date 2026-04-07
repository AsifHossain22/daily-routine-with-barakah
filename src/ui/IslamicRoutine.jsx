import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";

// DailyRoutineData
const routinePhases = [
  {
    phase: "The Evening",
    subtitle: "The Start of the Islamic Day",
    icon: <Sunset className="w-6 h-6 text-amber-400" />,
    items: [
      {
        time: "6:40 PM",
        hour: 18,
        minute: 40,
        title: "Maghrib & Spiritual Anchor",
        desc: "Pray Maghrib, Surah Al-Waqiah, Evening Adhkar",
        category: "Spiritual",
        icon: <Star className="w-5 h-5" />,
      },
      {
        time: "7:15 PM",
        hour: 19,
        minute: 15,
        title: "Nourishment & Connection",
        desc: "Dinner and quality, uninterrupted family time",
        category: "Personal",
        icon: <Heart className="w-5 h-5" />,
      },
    ],
  },
  {
    phase: "The Night",
    subtitle: "Focus and Rest",
    icon: <Moon className="w-6 h-6 text-slate-300" />,
    items: [
      {
        time: "8:10 PM",
        hour: 20,
        minute: 10,
        title: "Isha & Protection",
        desc: "Pray Isha, followed by Surah Al-Mulk",
        category: "Spiritual",
        icon: <Star className="w-5 h-5" />,
      },
      {
        time: "8:30 PM",
        hour: 20,
        minute: 30,
        title: "Evening Study",
        desc: "2 hours of focused study or reading",
        category: "Intellectual",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        time: "10:30 PM",
        hour: 22,
        minute: 30,
        title: "Restorative Sleep",
        desc: "6-8 hours of sleep for physical recovery",
        category: "Rest",
        icon: <BedDouble className="w-5 h-5" />,
      },
    ],
  },
  {
    phase: "Pre-Dawn & Dawn",
    subtitle: "The Spiritual Core",
    icon: <Sunrise className="w-6 h-6 text-emerald-400" />,
    items: [
      {
        time: "4:00 AM",
        hour: 4,
        minute: 0,
        title: "Tahajjud & Deep Dua",
        desc: "Wake up for night prayer, lay out hopes and intentions",
        category: "Spiritual",
        icon: <Star className="w-5 h-5" />,
      },
      {
        time: "4:45 AM",
        hour: 4,
        minute: 45,
        title: "Fajr & Morning Light",
        desc: "Pray Fajr, Morning Adhkar and Surah Yaseen",
        category: "Spiritual",
        icon: <BookOpen className="w-5 h-5" />,
      },
    ],
  },
  {
    phase: "The Morning",
    subtitle: "Physical & Professional Power",
    icon: <Sun className="w-6 h-6 text-amber-400" />,
    items: [
      {
        time: "5:30 AM",
        hour: 5,
        minute: 30,
        title: "Physical Reset",
        desc: "Exercise, shower and a healthy breakfast",
        category: "Physical",
        icon: <Activity className="w-5 h-5" />,
      },
      {
        time: "7:00 AM",
        hour: 7,
        minute: 0,
        title: "Morning Prep",
        desc: "Study session and organizing the mind for the day",
        category: "Intellectual",
        icon: <PenTool className="w-5 h-5" />,
      },
      {
        time: "8:00 AM",
        hour: 8,
        minute: 0,
        title: "Deep Work",
        desc: "Uninterrupted focus on demanding tasks (until 12 PM)",
        category: "Professional",
        icon: <Briefcase className="w-5 h-5" />,
      },
    ],
  },
  {
    phase: "The Afternoon",
    subtitle: "Sustenance & Reflection",
    icon: <Sun className="w-6 h-6 text-orange-400" />,
    items: [
      {
        time: "12:00 PM",
        hour: 12,
        minute: 0,
        title: "Lunch Break",
        desc: "Step away from workspace to refuel",
        category: "Physical",
        icon: <Utensils className="w-5 h-5" />,
      },
      {
        time: "12:25 PM",
        hour: 12,
        minute: 25,
        title: "Duhr & Re-centering",
        desc: "Pray Duhr to break up the workday",
        category: "Spiritual",
        icon: <Star className="w-5 h-5" />,
      },
      {
        time: "1:00 PM",
        hour: 13,
        minute: 0,
        title: "Family & Light Tasks",
        desc: "Time with family interspersed with low-focus tasks",
        category: "Personal",
        icon: <Heart className="w-5 h-5" />,
      },
      {
        time: "3:50 PM",
        hour: 15,
        minute: 50,
        title: "Asr Prayer",
        desc: "Mid-afternoon spiritual connection",
        category: "Spiritual",
        icon: <Star className="w-5 h-5" />,
      },
      {
        time: "4:30 PM",
        hour: 16,
        minute: 30,
        title: "Review & Plan",
        desc: "Summarize accomplishments and plan for tomorrow",
        category: "Intellectual",
        icon: <PenTool className="w-5 h-5" />,
      },
    ],
  },
];

const allItems = routinePhases.flatMap((p, pIdx) =>
  p.items.map((item, iIdx) => ({ ...item, key: `${pIdx}-${iIdx}` })),
);

// CategoryBadge
const CategoryBadge = ({ category }) => {
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
      className={`px-2.5 py-0.5 text-[10px] md:text-xs font-semibold rounded-full border tracking-wide whitespace-nowrap 
        ${styles[category]}`}
    >
      {category}
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
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 
      text-emerald-400 text-xs md:text-sm font-mono backdrop-blur-md shadow-2xl pointer-events-auto transition-all 
      hover:border-emerald-400"
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
const DayProgressBanner = ({ completed, total }) => {
  const pct = Math.round((completed / total) * 100);
  const isAllDone = completed === total && total > 0;

  return (
    <div
      className="sticky top-15 z-50 max-w-3xl mx-auto mb-12 bg-slate-900/80 border border-slate-800/50 rounded-2xl p-4 
    md:p-5 backdrop-blur-md shadow-xl sm:mx-auto"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs md:text-sm font-semibold text-slate-300 tracking-wide">
          {isAllDone ? (
            <span className="text-amber-400 flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              Alhamdulillah - Completed
            </span>
          ) : (
            "Daily Progress"
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
            boxShadow: isAllDone ? "0 0 12px rgba(245, 158, 11, 0.3)" : "none",
          }}
        />
      </div>
    </div>
  );
};

const IslamicRoutine = () => {
  // CompletedTaskState
  const [checked, setChecked] = useState({});
  const toggleItem = (key) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  // CompletedCount
  const completedCount = Object.values(checked).filter(Boolean).length;

  // DynamicTimesState
  const [dynamicTimes, setDynamicTimes] = useState({});

  // LocationBasedPrayerTimes
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`,
          );
          const data = await res.json();
          const t = data.data.timings;

          const formatTime = (time24) => {
            let [hour, min] = time24.split(":");
            let h = parseInt(hour, 10);
            const amPm = h >= 12 ? "PM" : "AM";
            return `${h % 12 || 12}:${min} ${amPm}`;
          };

          setDynamicTimes({
            "Fajr & Morning Light": formatTime(t.Fajr),
            "Duhr & Re-centering": formatTime(t.Dhuhr),
            "Asr Prayer": formatTime(t.Asr),
            "Maghrib & Spiritual Anchor": formatTime(t.Maghrib),
            "Isha & Protection": formatTime(t.Isha),
          });
        } catch (err) {
          console.error("Failed to fetch local times", err);
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-8 px-4 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="max-w-3xl mx-auto text-center mb-12 md:mb-20 px-2">
        <h2 className="text-xl md:text-2xl text-amber-400/70 font-arabic mb-6 tracking-[0.2em]">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h2>
        <h1
          className="text-3xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text 
        bg-linear-to-b from-white via-slate-200 to-slate-500"
        >
          Daily Routine with Barakah
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto font-medium">
          A structured balance of spiritual grounding, growth and professional
          dedication.
        </p>
      </header>

      {/* LiveClock */}
      <LiveClock />

      {/* DayProgressBanner */}
      <DayProgressBanner completed={completedCount} total={allItems.length} />

      {/* TimelineContainer */}
      <main className="max-w-3xl mx-auto space-y-16 md:space-y-24">
        {routinePhases.map((phaseData, pIdx) => (
          <section key={pIdx} className="relative">
            {/* PhaseStickyHeader */}
            <div className="sticky top-35 md:top-40 z-40 mb-8">
              <div
                className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl p-3 md:p-4 rounded-2xl border 
              border-white/5 shadow-2xl shadow-black/50"
              >
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-white/10 text-emerald-400">
                  {phaseData.icon}
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                    {phaseData.phase}
                  </h2>
                  <p className="text-emerald-400/70 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    {phaseData.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* VerticalLine */}
            <div className="relative space-y-6 ml-6 md:ml-10 pl-6 md:pl-10 border-l border-slate-800/50">
              {phaseData.items.map((item, iIdx) => {
                const key = `${pIdx}-${iIdx}`;
                const isDone = !!checked[key];

                return (
                  <AnimatedCard key={key} delay={iIdx * 50}>
                    <div
                      className={`group relative rounded-2xl p-4 md:p-6 transition-all duration-500 
                        flex flex-col sm:flex-row gap-4 items-start sm:items-center border
                        ${
                          isDone
                            ? "bg-emerald-950/20 border-emerald-900/30 opacity-60"
                            : "bg-slate-900/40 border-slate-800/50 hover:border-emerald-500/40 hover:bg-slate-900/60 shadow-xl"
                        }`}
                    >
                      {/* Dot */}
                      <div
                        className={`absolute -left-8 md:-left-12 top-7 md:top-1/2 md:-translate-y-1/2 w-3.5 h-3.5
                           rounded-full border-2 z-10 transition-all duration-500
                          ${
                            isDone
                              ? "bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                              : "bg-slate-950 border-slate-700 group-hover:border-emerald-500 group-hover:scale-115"
                          }`}
                      />

                      {/* TimeLabel */}
                      <div className="shrink-0 min-w-20">
                        <span
                          className={`text-sm md:text-base font-bold tracking-tight ${
                            isDone ? "text-slate-600" : "text-emerald-400/90"
                          }`}
                        >
                          {dynamicTimes[item.title] || item.time}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`${isDone ? "text-slate-600" : "text-amber-400/80"}`}
                          >
                            {item.icon}
                          </span>
                          <h3
                            className={`text-base md:text-lg font-bold truncate transition-colors ${
                              isDone
                                ? "line-through text-slate-500"
                                : "text-slate-100"
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p
                          className={`text-xs md:text-sm leading-relaxed ${isDone ? "text-slate-600" : "text-slate-400"}`}
                        >
                          {item.desc}
                        </p>
                      </div>

                      {/* Actions */}
                      <div
                        className="flex items-center gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 
                      border-slate-800/50 justify-between sm:justify-end"
                      >
                        <CategoryBadge category={item.category} />
                        <button
                          onClick={() => toggleItem(key)}
                          className="p-1 rounded-lg transition-all active:scale-90 hover:bg-white/5"
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-700 hover:text-emerald-500/50" />
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

      {/* Footer */}
      <footer className="max-w-2xl mx-auto mt-20 text-center py-12 border-t border-slate-900">
        <p className="text-slate-500 text-xs md:text-sm font-medium italic tracking-wide">
          "Take benefit of five before five..."
        </p>
      </footer>
    </div>
  );
};

export default IslamicRoutine;
