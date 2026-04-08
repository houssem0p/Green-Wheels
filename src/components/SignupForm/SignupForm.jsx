const SignupForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Nom</label>
        <input type="text" id="name" className="form-input" />
      </div>

      <div className="form-group">
        <label htmlFor="signup-email" className="form-label">Email</label>
        <input type="email" id="signup-email" className="form-input" />
      </div>
      
      <div className="form-group">
        <label htmlFor="phone" className="form-label">Téléphone</label>
        <input type="tel" id="phone" className="form-input" />
      </div>
      
      <div className="form-group">
        <label htmlFor="signup-password" className="form-label">Mot de passe</label>
        <input type="password" id="signup-password" className="form-input" />
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button type="submit" className="btn-primary">
          Créer mon compte
        </button>
      </div>
    </form>
  )
}

export default SignupForm
