import './ForgotPasswordForm.css'

const ForgotPasswordForm = ({ setCurrentView }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="forgot-form">
      <p className="forgot-description">
        Entrez votre email pour recevoir un lien de réinitialisation.
      </p>

      <div className="form-group">
        <label htmlFor="forgot-email" className="form-label">Email</label>
        <input type="email" id="forgot-email" className="form-input" />
      </div>

      <button type="submit" className="btn-primary" style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        Envoyer le lien
      </button>

      <div className="forgot-footer">
        <button 
          type="button" 
          className="link-back"
          onClick={() => setCurrentView('login')}
        >
          Retour à la connexion
        </button>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
