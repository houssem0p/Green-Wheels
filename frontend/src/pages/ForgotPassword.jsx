import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="logo" className={styles.logo} />
        <h1>Mot de passe oublié</h1>
        <p>Entrez votre email pour réinitialiser</p>
      </div>

      <div className={styles.card}>
        <label>Email</label>
        <input type="email" />

        <button className={styles.resetBtn}>
          Envoyer le lien
        </button>

        <button
          className={styles.backBtn}
          onClick={() => navigate("/login")}
        >
          Retour à la connexion
        </button>
      </div>
    </div>
  );
}