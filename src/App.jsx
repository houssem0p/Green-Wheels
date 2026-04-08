import { useState } from 'react'
import Header from './components/Header/Header'
import AuthLayout from './components/AuthLayout/AuthLayout'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('login') // 'login', 'signup', 'forgot'

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <AuthLayout currentView={currentView} setCurrentView={setCurrentView}>
          {currentView === 'login' && <LoginForm setCurrentView={setCurrentView} />}
          {currentView === 'signup' && <SignupForm />}
          {currentView === 'forgot' && <ForgotPasswordForm setCurrentView={setCurrentView} />}
        </AuthLayout>
      </main>
    </div>
  )
}

export default App
