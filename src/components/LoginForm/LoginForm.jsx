import './LoginForm.css'

const LoginForm = ({ setCurrentView }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" id="email" className="form-input" />
      </div>
      
      <div className="form-group">
        <label htmlFor="password" className="form-label">Mot de passe</label>
        <input type="password" id="password" className="form-input" />
      </div>
      
      <div className="form-options">
        <button 
          type="button" 
          className="link-forgot"
          onClick={() => setCurrentView('forgot')}
        >
          Mot de passe oublié ?
        </button>
      </div>

      <button type="submit" className="btn-primary">
        Se connecter
      </button>
    </form>
  )
}

export default LoginForm
