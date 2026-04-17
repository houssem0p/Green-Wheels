import React from "react";

const Stats = () => {
  const stats = [
    { label: "Vélos Dispos", value: "850+", icon: "🚲" },
    { label: "Utilisateurs", value: "12K+", icon: "👤" },
    { label: "CO2 Économisé", value: "45T", icon: "🌱" },
    { label: "Stations", value: "120", icon: "📍" },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#eef5f1] dark:bg-gray-800 p-8 rounded-3xl border-2 border-transparent hover:border-[#2ad367] transition-all hover:-translate-y-2 group shadow-sm hover:shadow-xl hover:shadow-green-500/10">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
            <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
