import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      {/* LEFT */}
      <div className={styles.left}>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>

      {/* CENTER */}
        <ul className={styles.navLinks}>
          <li>
            <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            Accueil
          </NavLink>
          </li>

          <li>
            <NavLink
              to="/vehicules"
              className={({ isActive }) =>
                isActive ? styles.active : ""
              }
            >
              Vélos
            </NavLink>
          </li>

          <li>Stations</li>
          <li>Abonnements</li>
          <li>À propos</li>
          <li>Contacts</li>
          <li>FAQ</li>
        </ul>

      {/* RIGHT */}
      <div className={styles.right}>
        <button type="button" className={styles.iconBtn}>
          🌙
        </button>
        {user === undefined ? null : user ? (
          <>
            <span className={styles.userLabel} title={user.email}>
              {user.full_name || user.email}
            </span>
            <button
              type="button"
              className={styles.loginBtn}
              onClick={async () => {
                await logout();
                navigate("/");
              }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <button
            type="button"
            className={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Connexion
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;