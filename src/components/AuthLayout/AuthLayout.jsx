import { Bike } from 'lucide-react'
import './AuthLayout.css'

const AuthLayout = ({ children, currentView, setCurrentView }) => {
  
  const getHeaderInfo = () => {
    switch(currentView) {
      case 'login':
        return {
          title: 'Connexion',
          subtitle: 'Connectez-vous à votre compte'
        }
      case 'signup':
        return {
          title: 'Inscription',
          subtitle: 'Créez votre compte GreenWheels'
        }
      case 'forgot':
        return {
          title: 'Mot de passe oublié',
          subtitle: 'Réinitialisez votre mot de passe'
        }
      default:
        return { title: '', subtitle: '' }
    }
  }

  const { title, subtitle } = getHeaderInfo()

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-logo">
          <Bike size={36} className="logo-icon" />
          <span className="logo-text">GREEN WHEELS</span>
        </div>
        <h1 className="auth-title">{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>
      </div>

      {(currentView === 'login' || currentView === 'signup') && (
        <div className="auth-toggle">
          <button 
            className={`toggle-btn ${currentView === 'login' ? 'active' : ''}`}
            onClick={() => setCurrentView('login')}
          >
            Connexion
          </button>
          <button 
            className={`toggle-btn ${currentView === 'signup' ? 'active' : ''}`}
            onClick={() => setCurrentView('signup')}
          >
            Inscription
          </button>
        </div>
      )}

      <div className="auth-card">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
