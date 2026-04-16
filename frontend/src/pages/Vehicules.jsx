import Navbar from "../components/layout/Navbar";
import styles from "./Vehicules.module.css";
import VehicleCard from "../components/Cards/VehicleCard";
import scooter1 from "../assets/scooter1.png";
import scooter2 from "../assets/scooter2.png";
import velo from "../assets/velo.png";
function Vehicules() {
  return (
    <>
      

      <div className={styles.container}>
        <h1>Nos Véhicules</h1>
        <p>Trouvez le véhicule parfait pour votre trajet.</p>

        {/* Filters */}
        <div className={styles.filters}>
          <input placeholder="🔍 Rechercher un véhicule..." />

          <select>
            <option>Tous les types</option>
          </select>

          <select>
            <option>Tous</option>
          </select>
        </div>

        <div className={styles.grid}>
  <VehicleCard
    title="Scooter express"
    price="400"
    image={scooter1}
    available={true}
  />

  <VehicleCard
    title="Scooter city"
    price="350"
    image={scooter2}
    available={true}
  />

  <VehicleCard
    title="Vélo Urbain Pro"
    price="200"
    image={velo}
    available={false}
  />
</div>

      </div>
    </>
  );
}

export default Vehicules;