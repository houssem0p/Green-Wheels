import styles from "./VehicleCard.module.css";

function VehicleCard({ title, price, image, available }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.content}>
        <h3>{title}</h3>

        <span className={available ? styles.available : styles.unavailable}>
          {available ? "Disponible" : "Indisponible"}
        </span>

        <p className={styles.price}>{price} DA/h</p>

        <button>Détails</button>
      </div>
    </div>
  );
}

export default VehicleCard;