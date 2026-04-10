import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { apiForgotPassword } from "../api/auth";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [devLink, setDevLink] = useState("");
  const [devHint, setDevHint] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setDevLink("");
    setDevHint("");
    setCopied(false);
    setLoading(true);
    try {
      const { ok, data } = await apiForgotPassword({ email: email.trim() });
      if (!ok) {
        const msg =
          data.message ||
          (Array.isArray(data.errors) ? data.errors.join(" ") : "Impossible d'envoyer la demande.");
        setError(msg);
        return;
      }
      setMessage(
        data.message ||
          "Si cet e-mail est enregistré, un lien de réinitialisation a été envoyé."
      );
      if (data.devHint) {
        setDevHint(data.devHint);
      }
      if (data.devResetUrl) {
        setDevLink(data.devResetUrl);
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    if (!devLink) return;
    try {
      await navigator.clipboard.writeText(devLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="logo" className={styles.logo} />
        <h1>Mot de passe oublié</h1>
        <p>Entrez votre email pour réinitialiser</p>
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>
        {error ? <p className={styles.error}>{error}</p> : null}
        {message ? <p className={styles.success}>{message}</p> : null}
        {message ? (
          <p className={styles.spamHint}>
            Pensez à vérifier le dossier <strong>spam / courrier indésirable</strong> si vous ne voyez rien
            dans la boîte de réception.
          </p>
        ) : null}

        {devLink ? (
          <div className={styles.devPanel}>
            <p className={styles.devTitle}>Lien de réinitialisation (mode développement)</p>
            {devHint ? <p className={styles.devHint}>{devHint}</p> : null}
            <div className={styles.devLinkRow}>
              <a className={styles.devLinkBtn} href={devLink}>
                Ouvrir la page de nouveau mot de passe
              </a>
              <button type="button" className={styles.copyBtn} onClick={copyLink}>
                {copied ? "Copié !" : "Copier le lien"}
              </button>
            </div>
            <textarea className={styles.devTextarea} readOnly value={devLink} rows={3} />
          </div>
        ) : null}

        <label htmlFor="forgot-email">Email</label>
        <input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className={styles.resetBtn} disabled={loading}>
          {loading ? "Envoi…" : "Envoyer le lien"}
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
