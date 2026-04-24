import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#eef5f1] dark:bg-[#121212] flex flex-col items-center pt-32 pb-12 p-4 transition-colors duration-300">
      <div className="text-center mb-6">
        <img src={Logo} alt="logo" className="w-[50px] mb-2 mx-auto animate-in fade-in zoom-in duration-700" />
        <h1 className="text-3xl font-bold mb-1 dark:text-white">Inscription</h1>
        <p className="text-[#777] text-sm dark:text-gray-400">Créez votre compte</p>
      </div>

      {/* Tabs */}
      <div className="flex w-full max-w-[360px] bg-[#d9d9d9] dark:bg-gray-800 rounded-xl overflow-hidden mb-6 p-1 shadow-inner">
        <button 
          className="flex-1 py-2 px-4 text-sm font-medium transition-all rounded-lg text-[#555] dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
          onClick={() => navigate("/login")}
        >
          Connexion
        </button>
        <button className="flex-1 py-2 px-4 text-sm font-semibold transition-all rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm">
          Inscription
        </button>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-900 p-8 w-full max-w-[360px] rounded-2xl border-2 border-[#2ad367] flex flex-col gap-3 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium dark:text-gray-300">Nom</label>
          <input 
            type="text" 
            placeholder="Votre nom complet"
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:border-[#2ad367] focus:ring-2 focus:ring-[#2ad367]/20 transition-all font-sans"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium dark:text-gray-300">Email</label>
          <input 
            type="email" 
            placeholder="votre@email.com"
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:border-[#2ad367] focus:ring-2 focus:ring-[#2ad367]/20 transition-all font-sans"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium dark:text-gray-300">Mot de passe</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:border-[#2ad367] focus:ring-2 focus:ring-[#2ad367]/20 transition-all font-sans"
          />
        </div>

        <button className="mt-4 bg-[#2ad367] hover:bg-[#24b557] text-white py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-green-500/20">
          S’inscrire
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Ou</span></div>
        </div>

        <button className="bg-[#f5f5f5] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 py-3 rounded-xl text-black dark:text-white flex items-center justify-center gap-3 transition-all shadow-sm font-medium">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="google"
            className="w-[18px]"
          />
          Google
        </button>
      </div>
    </div>
  );
}