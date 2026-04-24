import React from "react";

const VehicleCard = ({ type, id, battery, price, status, image }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:shadow-[#2ad367]/10 transition-all duration-500 group">
      {/* IMAGE SECTION */}
      <div className="relative h-[220px] bg-[#f8faf9] dark:bg-gray-700 p-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <img 
          src={image || (type === "Velo" ? "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop" : "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=2072&auto=format&fit=crop")} 
          alt={type} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out z-10"
        />
        
        {/* STATUS BADGE */}
        <div className={`absolute top-5 left-5 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest z-20 ${
          status === "Disponible" ? "bg-[#2ad367] text-white shadow-lg shadow-green-500/30" : "bg-red-500 text-white shadow-lg shadow-red-500/30"
        }`}>
          {status}
        </div>

        {/* BATTERY BADGE */}
        <div className="absolute top-5 right-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/50 dark:border-gray-700/50 z-20 shadow-sm">
          <span className="text-sm font-black text-gray-900 dark:text-white">{battery}%</span>
          <div className="w-6 h-3 bg-gray-200 dark:bg-gray-600 rounded-full relative overflow-hidden">
            <div className={`absolute left-0 top-0 h-full bg-[#2ad367] transition-all duration-1000`} style={{ width: `${battery}%` }}></div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 block">Référence: {id}</span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{type} Électrique</h3>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-[#2ad367]">{price}</span>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block">DA / Min</span>
          </div>
        </div>

        <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
          status === "Disponible" 
            ? "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-[#2ad367] dark:hover:bg-[#2ad367] hover:text-white shadow-xl hover:shadow-green-500/30 active:scale-[0.98]" 
            : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
        }`}>
          {status === "Disponible" ? "Déverrouiller" : "Indisponible"}
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
