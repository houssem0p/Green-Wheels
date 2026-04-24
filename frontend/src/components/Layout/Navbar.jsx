import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", path: "/" },
    { label: "Véhicules", path: "/vehicules" },
    { label: "Stations", path: "/stations" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      isScrolled ? "bg-white dark:bg-gray-900 shadow-md py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="GreenWheels" className="w-10 h-10 object-contain group-hover:rotate-12 transition-transform duration-300" />
          <span className={`text-xl font-bold tracking-tight transition-colors ${
            isScrolled ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"
          }`}>GreenWheels</span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-semibold text-sm transition-all hover:text-[#2ad367] relative group ${
                location.pathname === link.path ? "text-[#2ad367]" : isScrolled ? "text-gray-700 dark:text-gray-300" : "text-gray-800 dark:text-gray-100"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#2ad367] transition-all duration-300 ${
                location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
          ))}
        </div>

        {/* AUTH BUTTONS */}
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className={`font-bold text-sm transition-all px-5 py-2.5 rounded-xl border-2 ${
              isScrolled 
                ? "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#2ad367] hover:text-[#2ad367]" 
                : "border-gray-300/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 hover:border-[#2ad367] hover:text-[#2ad367]"
            }`}
          >
            Connexion
          </Link>
          <Link 
            to="/signup" 
            className="bg-[#2ad367] hover:bg-[#24b557] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-500/20 active:scale-95"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
