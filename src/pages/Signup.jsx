import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="logo" className={styles.logo} />
        <h1>Inscription</h1>
        <p>Créez votre compte</p>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button onClick={() => navigate("/login")}>Connexion</button>
        <button className={styles.activeTab}>Inscription</button>
      </div>

      {/* Card */}
      <div className={styles.card}>
        <label>Nom</label>
        <input type="text" />

        <label>Email</label>
        <input type="email" />

        <label>Mot de passe</label>
        <input type="password" />

        <button className={styles.signupBtn}>
          S’inscrire
        </button>

        <button className={styles.googleBtn}>
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
    alt="google"
  />
  Se connecter avec Google
</button>
      </div>
    </div>
  );
}