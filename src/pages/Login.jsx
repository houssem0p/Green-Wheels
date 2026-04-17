import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-6">
          <img src={logo} alt="logo" className="mx-auto w-14 mb-3" />
          <h1 className="text-2xl font-bold">Connexion</h1>
          <p className="text-sm text-slate-500">
            Connectez-vous à votre compte
          </p>
        </div>

        {/* TABS */}
        <div className="flex rounded-xl bg-slate-200 p-1">
          <button className="flex-1 rounded-lg bg-white py-2 text-sm font-semibold text-slate-900 shadow">
            Connexion
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="flex-1 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Inscription
          </button>
        </div>

        {/* CARD */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
          
          {/* EMAIL */}
          <label className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 outline-none focus:border-emerald-500"
          />

          {/* PASSWORD */}
          <label className="mt-4 text-sm font-medium text-slate-700 block">
            Mot de passe
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 outline-none focus:border-emerald-500"
          />

          {/* FORGOT */}
          <button
            className="mt-3 text-sm text-emerald-500 hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Mot de passe oublié ?
          </button>

          {/* LOGIN BUTTON */}
          <button className="mt-5 w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition">
            Se connecter
          </button>

          {/* GOOGLE */}
          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm hover:bg-slate-100 transition">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="google"
              className="w-5"
            />
            Se connecter avec Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;