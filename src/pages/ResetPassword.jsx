import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    alert("Mot de passe réinitialisé avec succès !");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#eef5f1] dark:bg-[#121212] flex flex-col items-center pt-32 pb-12 p-4 transition-colors duration-300">
      <div className="text-center mb-6">
        <img src={Logo} alt="logo" className="w-[50px] mb-2 mx-auto animate-in fade-in zoom-in duration-700" />
        <h1 className="text-3xl font-bold mb-1 dark:text-white">Nouveau mot de passe</h1>
        <p className="text-[#777] text-sm dark:text-gray-400">Veuillez entrer votre nouveau mot de passe</p>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 w-full max-w-[360px] rounded-2xl border-2 border-[#2ad367] flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-500"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium dark:text-gray-300">Nouveau mot de passe</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:border-[#2ad367] focus:ring-2 focus:ring-[#2ad367]/20 transition-all font-sans"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium dark:text-gray-300">Confirmer le mot de passe</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:border-[#2ad367] focus:ring-2 focus:ring-[#2ad367]/20 transition-all font-sans"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit"
          className="mt-4 bg-[#2ad367] hover:bg-[#24b557] text-white py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-green-500/20"
        >
          Réinitialiser le mot de passe
        </button>
      </form>
    </div>
  );
}
