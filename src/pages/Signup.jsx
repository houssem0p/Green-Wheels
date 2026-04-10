import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { apiRegister } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { ok, data } = await apiRegister({
        full_name: full_name.trim(),
        email: email.trim(),
        phone: phone.replace(/\D/g, "").slice(0, 10),
        password,
      });
      if (!ok) {
        const msg =
          data.message ||
          (Array.isArray(data.errors) ? data.errors.join(" ") : "Inscription impossible.");
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
        <img src={Logo} alt="logo" className={styles.logo} />
        <h1>Inscription</h1>
        <p>Créez votre compte</p>
      </div>

      <div className={styles.tabs}>
        <button type="button" onClick={() => navigate("/login")}>
          Connexion
        </button>
        <button type="button" className={styles.activeTab}>
          Inscription
        </button>
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>
        {error ? <p className={styles.error}>{error}</p> : null}

        <label htmlFor="signup-name">Nom complet</label>
        <input
          id="signup-name"
          type="text"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
          required
          minLength={2}
        />

        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="signup-phone">Téléphone (10 chiffres)</label>
        <input
          id="signup-phone"
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="0612345678"
          required
          maxLength={10}
        />

        <label htmlFor="signup-password">Mot de passe (min. 8 caractères)</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
        />

        <button type="submit" className={styles.signupBtn} disabled={loading}>
          {loading ? "Inscription…" : "S'inscrire"}
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
}
