import React, { useState } from "react";
import VehicleCard from "../components/Cards/VehicleCard";

const vehiclesData = [
  { id: "GW-001", type: "Velo", battery: 85, price: "15", status: "Disponible" },
  { id: "GW-002", type: "Trottinette", battery: 42, price: "12", status: "Disponible" },
  { id: "GW-003", type: "Velo", battery: 98, price: "15", status: "Disponible" },
  { id: "GW-004", type: "Trottinette", battery: 15, price: "12", status: "Maintenance" },
  { id: "GW-005", type: "Velo", battery: 65, price: "15", status: "Disponible" },
  { id: "GW-006", type: "Trottinette", battery: 88, price: "12", status: "Disponible" },
];

const Vehicules = () => {
  const [filter, setFilter] = useState("Tous");

  const filteredVehicles = filter === "Tous" 
    ? vehiclesData 
    : vehiclesData.filter(v => v.type === filter);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#eef5f1] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="animate-in slide-in-from-left duration-700">
            <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">Notre Flotte</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              Choisissez le véhicule qui vous convient pour vos trajets quotidiens ou vos balades urbaines.
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm self-start animate-in slide-in-from-right duration-700">
            {["Tous", "Velo", "Trottinette"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  filter === type 
                    ? "bg-[#2ad367] text-white shadow-lg shadow-green-500/20" 
                    : "text-gray-500 hover:text-[#2ad367] dark:hover:text-gray-200"
                }`}
              >
                {type === "Tous" ? "Tous" : type + "s"}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <div 
              key={vehicle.id} 
              className="animate-in fade-in slide-in-from-bottom duration-700 fill-mode-both"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <VehicleCard {...vehicle} />
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-xl font-bold text-gray-500">Aucun véhicule trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicules;
