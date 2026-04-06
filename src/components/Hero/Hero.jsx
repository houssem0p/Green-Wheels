import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <span className={styles.badge}>
          🌱 Mobilité verte intelligente
        </span>

        <h1 className={styles.title}>
          Roulez <span className={styles.green}>vert</span>, roulez libre
        </h1>

        <p className={styles.description}>
          Louez un vélo ou un scooter électrique en quelques clics.
          Contribuez à un futur plus propre avec GreenWheels.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primary}>Voir le catalogue</button>
          <button className={styles.secondary}>Comment ça marche</button>
        </div>

        <div className={styles.features}>
          <span>⚡ 100% Électrique</span>
          <span>🍃 Zéro émission</span>
        </div>
      </div>

      <div className={styles.right}>
        <img src="/bike.jpg" alt="scooter" />
      </div>
    </section>
  );
}

export default Hero;