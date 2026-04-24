import React, { useState, useEffect } from 'react';
import styles from './Abonnements.module.css';
import RecommendationModal from '../components/RecommendationModal/RecommendationModal';
import { useNavigate } from 'react-router-dom';

const Abonnements = () => {
  const [showPub, setShowPub] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userStatus, setUserStatus] = useState({ pct: 0, eligible: false });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile status on load
    const checkEligibility = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", { credentials: "include" });
        const data = await res.json();
        if (data.success) {
          setUserStatus({ pct: data.profile.completion_pct, eligible: data.profile.completion_pct >= 75 });
        } else if (res.status === 401) {
          // User not logged in - show login prompt
          setUserStatus({ pct: 0, eligible: false });
        }
      } catch (err) {
        console.log('Profile check failed:', err);
        setUserStatus({ pct: 0, eligible: false });
      }
    };
    checkEligibility();
  }, []);

  const handleTryIt = () => {
    if (userStatus.pct >= 75) {
      setShowPub(false);
      setShowModal(true);
    } else {
      navigate('/profile'); // Redirect to profile completion
    }
  };

  return (
    <div className={styles.container}>
      {/* 1. THE "PUB" CARD */}
      {showPub && (
        <div className={styles.pubOverlay}>
          <div className={styles.pubCard}>
            <span className={styles.badge}>Offre Exclusive 🌟</span>
            <h2>Testez notre prix recommandé par IA !</h2>
            <p>
              {userStatus.pct > 0 
                ? `Obtenez un tarif sur mesure basé sur votre profil (${userStatus.pct}% complété).`
                : "Connectez-vous pour découvrir nos tarifs personnalisés par IA."
              }
            </p>
            <div className={styles.pubButtons}>
              <button className={styles.closeBtn} onClick={() => setShowPub(false)}>Plus tard</button>
              <button 
                className={styles.tryBtn} 
                onClick={userStatus.pct > 0 ? handleTryIt : () => navigate('/login')}
              >
                {userStatus.pct > 0 ? 'Essayer !' : 'Se connecter'}
              </button>
            </div>
          </div>
        </div>
      )}

      <h1>Nos Abonnements</h1>
      {/* Existing subscriptions grid... */}

      {/* 2. THE RECOMMENDATION LOGIC */}
      {showModal && (
        <RecommendationModal 
          eligible={userStatus.eligible}
          pct={userStatus.pct}
          onClose={() => setShowModal(false)}
          onRedirect={() => navigate('/profile')}
        />
      )}
    </div>
  );
};

export default Abonnements;