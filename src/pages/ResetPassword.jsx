import styles from "./ForgotPassword.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { apiResetPassword } from "../api/auth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== password2) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!token) {
      setError("Lien invalide ou expiré. Demandez un nouveau lien.");
      return;
    }
    setLoading(true);
    try {
      const { ok, data } = await apiResetPassword({ token, password });
      if (!ok) {
        const msg =
          data.message ||
          (Array.isArray(data.errors) ? data.errors.join(" ") : "Réinitialisation impossible.");
        setError(msg);
        return;
      }
      navigate("/login", { replace: true, state: { resetOk: true } });
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
        <h1>Nouveau mot de passe</h1>
        <p>Choisissez un mot de passe sécurisé</p>
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>
        {error ? <p className={styles.error}>{error}</p> : null}
        {!token ? (
          <p className={styles.error}>Aucun jeton dans l’URL. Utilisez le lien reçu par email.</p>
        ) : null}

        <label htmlFor="reset-pass">Nouveau mot de passe</label>
        <input
          id="reset-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
        />

        <label htmlFor="reset-pass2">Confirmer le mot de passe</label>
        <input
          id="reset-pass2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
        />

        <button type="submit" className={styles.resetBtn} disabled={loading || !token}>
          {loading ? "Enregistrement…" : "Enregistrer"}
        </button>

        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate("/login")}
        >
          Retour à la connexion
        </button>
      </form>
    </div>
  );
}
