import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { apiLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { ok, data } = await apiLogin({ email: email.trim(), password });
      if (!ok) {
        const msg =
          data.message ||
          (Array.isArray(data.errors) ? data.errors.join(" ") : "Connexion impossible.");
        setError(msg);
        return;
      }
      if (data.user) {
        setUser(data.user);
      }
      navigate("/");
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} className={styles.logo} alt="" />
        <h1>Connexion</h1>
        <p>Connectez-vous à votre compte</p>
      </div>

      <div className={styles.tabs}>
        <button type="button" className={styles.active}>
          Connexion
        </button>
        <button type="button" onClick={() => navigate("/signup")}>
          Inscription
        </button>
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>
        {error ? <p className={styles.error}>{error}</p> : null}

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Mot de passe</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button
          type="button"
          className={styles.forgot}
          onClick={() => navigate("/forgot-password")}
        >
          Mot de passe oublié ?
        </button>

        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>

        <button type="button" className={styles.googleBtn} disabled>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt=""
          />
          Se connecter avec Google (bientôt)
        </button>
      </form>
    </div>
  );
};

export default Login;
