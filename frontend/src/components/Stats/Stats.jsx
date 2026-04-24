import styles from "./Stats.module.css";

function Stats() {
  return (
    <section className={styles.stats}>
      <div>
        <h2>500+</h2>
        <p>Vélos disponibles</p>
      </div>

      <div>
        <h2>50+</h2>
        <p>Stations</p>
      </div>

      <div>
        <h2>10K+</h2>
        <p>Utilisateurs</p>
      </div>

      <div>
        <h2>50K+</h2>
        <p>Trajets effectués</p>
      </div>
    </section>
  );
}

export default Stats;