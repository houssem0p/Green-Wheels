import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <img src={logo} className={styles.logo} />
        <h1>Connexion</h1>
        <p>Connectez-vous à votre compte</p>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        <button className={styles.active}>Connexion</button>
        <button onClick={() => navigate("/signup")}>
          Inscription
        </button>
      </div>

      {/* CARD */}
      <div className={styles.card}>
        <label>Email</label>
        <input type="email" />

        <label>Mot de passe</label>
        <input type="password" />

        <button 
          className={styles.forgot}
          onClick={() => navigate("/ForgotPassword")}
        >
          Mot de passe oublié ?
        </button>

        <button className={styles.loginBtn}>
          Se connecter
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
};

export default Login;