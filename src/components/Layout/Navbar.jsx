import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Green Wheels</div>

      <ul className={styles.navLinks}>
        <li>Accueil</li>
        <li>Catalogue</li>
        <li>Comment ça marche</li>
        <li>Contact</li>
      </ul>

      <div className={styles.rightSection}>
        <button className={styles.reserveBtn}>Réserver</button>
      </div>
    </nav>
  );
}

export default Navbar;