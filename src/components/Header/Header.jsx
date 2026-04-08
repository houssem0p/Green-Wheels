import { Moon, Bike, User } from 'lucide-react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        
        <div className="header-logo">
          <Bike className="logo-icon" size={28} />
          <span className="logo-text">GREEN WHEELS</span>
        </div>

        <nav className="header-nav">
          <a href="#" className="nav-link">Accueil</a>
          <a href="#" className="nav-link">Vélos</a>
          <a href="#" className="nav-link">Stations</a>
          <a href="#" className="nav-link">Abonnements</a>
          <a href="#" className="nav-link">À propos</a>
          <a href="#" className="nav-link">Contacts</a>
          <a href="#" className="nav-link">FAQ</a>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Toggle dark mode">
            <Moon size={20} />
          </button>
          <button className="btn-connect">
            <User size={18} />
            <span>Connexion</span>
          </button>
        </div>

      </div>
    </header>
  )
}

export default Header
