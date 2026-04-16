import styles from "./Hero.module.css";
import bikeImg from "../../assets/bike.png";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <span className={styles.badge}>
          🌱 Mobilité verte intelligente
        </span>

        <h1 className={styles.title}>
          Roulez <span className={styles.green}>vert</span>, <br />
          roulez libre
        </h1>

        <p className={styles.description}>
          Louez un vélo ou un scooter électrique en quelques clics.
          Explorez votre ville de manière écologique avec GreenWheels.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primary}>
            Explorer les vélos →
          </button>

          <button className={styles.secondary}>
            📍 Voir les stations
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <img src={bikeImg} alt="bike" />
      </div>
    </section>
  );
}

export default Hero;