import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#eef5f1] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* TEXT CONTENT */}
        <div className="animate-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-green-100 dark:border-green-900 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2ad367] animate-pulse"></span>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Mobilité Durable à Alger</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heavy leading-[1.1] mb-6 text-gray-900 dark:text-white">
            Roulez Vert <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ad367] to-[#16a34a]">Sans Limites</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg">
            Découvrez la liberté de vous déplacer à Alger avec GreenWheels. Vélos et trottinettes électriques en libre-service, 100% éco-responsables.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/vehicules" 
              className="bg-[#2ad367] hover:bg-[#24b557] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-green-500/20 hover:-translate-y-1 active:scale-95 flex items-center gap-3"
            >
              Explorer les vélos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
            <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg shadow-black/5">
              Comment ça marche ?
            </button>
          </div>
        </div>

        {/* IMAGE/DECO */}
        <div className="relative animate-in zoom-in duration-1000 delay-200">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#2ad367]/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse"></div>
          <img 
            src="https://images.unsplash.com/photo-1541625602330-2277a1c4b6c3?q=80&w=2070&auto=format&fit=crop" 
            alt="Bicycle riding" 
            className="w-full rounded-[40px] shadow-2xl relative z-10 border-4 border-white dark:border-gray-800 rotate-2 hover:rotate-0 transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
