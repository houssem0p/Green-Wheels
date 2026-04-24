import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState({
    user_type: "",
    date_of_birth: "",
    address: "",
    city: "",
    student_id_url: "",
    employment_doc_url: "",
    verification_status: "unverified",
  });

  const [completion, setCompletion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // --- 1. Load data from backend on mount ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", { 
          credentials: "include" 
        });
        const data = await res.json();
        
        if (data.success && data.profile) {
          // Format date for input
          const profile = { ...data.profile };
          if (profile.date_of_birth) {
            profile.date_of_birth = profile.date_of_birth.split('T')[0];
          }
          setUser(profile);
          setCompletion(profile.completion_pct || 0);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage({ type: 'error', text: 'Erreur lors du chargement du profil' });
      }
    };
    fetchProfile();
  }, []);

  // --- 2. Input Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setUser((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // --- 3. Save to Backend (Using FormData for file uploads) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Create FormData object (handles both text and files)
    const formData = new FormData();
    
    // Append all fields
    formData.append('user_type', user.user_type || '');
    formData.append('date_of_birth', user.date_of_birth || '');
    formData.append('address', user.address || '');
    formData.append('city', user.city || '');
    
    // Append files if they exist
    if (user.student_id_url && typeof user.student_id_url === 'object') {
      formData.append('student_id_url', user.student_id_url);
    }
    if (user.employment_doc_url && typeof user.employment_doc_url === 'object') {
      formData.append('employment_doc_url', user.employment_doc_url);
    }

    try {
      const res = await fetch("http://localhost:5000/api/profile/update", {
        method: "POST",
        credentials: "include",
        body: formData, // Don't set Content-Type header - browser sets it with boundary
      });
      
      const data = await res.json();
      
      if (data.success) {
        setCompletion(data.completion_pct);
        setMessage({ 
          type: 'success', 
          text: `✅ Profil enregistré ! (${data.completion_pct}% complété)` 
        });
        
        // Update verification status if returned
        if (data.verification_status) {
          setUser(prev => ({ ...prev, verification_status: data.verification_status }));
        }
      } else {
        setMessage({ type: 'error', text: data.message || 'Erreur lors de la sauvegarde' });
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage({ type: 'error', text: 'Erreur réseau - Vérifiez votre connexion' });
    } finally {
      setLoading(false);
    }
  };

  // Check if AI is unlocked
  const isAIUnlocked = completion >= 75;

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <span className={styles.badge}>Gestion du compte</span>
          <h1 className={styles.title}>
            Mon <span className={styles.green}>Profil</span>
          </h1>
          <p className={styles.description}>
            Complétez vos informations pour débloquer les tarifs personnalisés.
          </p>
        </div>

        {/* AI Eligibility Status */}
        <div className={styles.aiStatus}>
          {isAIUnlocked ? (
            <div className={styles.aiUnlocked}>
              <span className={styles.unlockedIcon}>✅</span>
              <span>IA Activée - Vous bénéficiez des tarifs personnalisés !</span>
            </div>
          ) : (
            <div className={styles.aiLocked}>
              <span className={styles.lockedIcon}>🔒</span>
              <span>Complétez votre profil à 75% pour débloquer l'IA</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <div className={styles.progressLabel}>
            <span>Progression du profil</span>
            <span className={styles.progressPercent}>{completion}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${isAIUnlocked ? styles.unlocked : ''}`}
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          <div className={styles.progressThreshold}>
            <span className={styles.thresholdMarker} style={{ left: '75%' }}>
              ▼ 75% (IA)
            </span>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* User Type - CRITICAL for AI */}
          <div className={styles.group}>
            <label>
              Type d'utilisateur 
              <span className={styles.required}>*</span>
            </label>
            <select 
              name="user_type" 
              value={user.user_type || ""} 
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner...</option>
              <option value="student">🎓 Étudiant (-20%)</option>
              <option value="employed">💼 Employé (-5%)</option>
              <option value="tourist">🧳 Touriste</option>
              <option value="other">👤 Autre</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className={styles.group}>
            <label>
              Date de naissance
              <span className={styles.required}>*</span>
            </label>
            <input 
              type="date" 
              name="date_of_birth" 
              value={user.date_of_birth || ""} 
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className={`${styles.group} ${styles.fullWidth}`}>
            <label>
              Adresse
              <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="123 Rue Didouche Mourad"
              value={user.address || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* City */}
          <div className={`${styles.group} ${styles.fullWidth}`}>
            <label>
              Ville
              <span className={styles.required}>*</span>
            </label>
            <select
              name="city"
              value={user.city || ""}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une ville...</option>
              <option value="Alger">Alger</option>
              <option value="Oran">Oran</option>
              <option value="Boumerdes">Boumerdes</option>
              <option value="Tizi Ouzou">Tizi Ouzou</option>
              <option value="Annaba">Annaba</option>
            </select>
          </div>

          {/* Student ID Upload */}
          <div className={styles.group}>
            <label>
              Carte Étudiant
              {user.user_type === 'student' && <span className={styles.required}>*</span>}
            </label>
            <input 
              type="file" 
              name="student_id_url" 
              accept="image/*,.pdf"
              onChange={handleFileChange} 
            />
            {user.user_type === 'student' && !user.student_id_url && (
              <p className={styles.hint}>Requis pour la réduction étudiante</p>
            )}
          </div>

          {/* Employment Document Upload */}
          <div className={styles.group}>
            <label>
              Justificatif d'emploi
              {user.user_type === 'employed' && <span className={styles.required}>*</span>}
            </label>
            <input 
              type="file" 
              name="employment_doc_url" 
              accept="image/*,.pdf"
              onChange={handleFileChange} 
            />
            {user.user_type === 'employed' && !user.employment_doc_url && (
              <p className={styles.hint}>Requis pour la réduction employé</p>
            )}
          </div>

          {/* Verification Status */}
          <div className={styles.statusInfo}>
            <span>Statut de vérification : </span>
            <strong className={styles[user.verification_status?.toLowerCase() || 'unverified']}>
              {user.verification_status === 'verified' && '✅ Vérifié'}
              {user.verification_status === 'pending' && '⏳ En attente'}
              {user.verification_status === 'rejected' && '❌ Rejeté'}
              {user.verification_status === 'unverified' && '⚠️ Non vérifié'}
            </strong>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={styles.saveBtn}
            disabled={loading}
          >
            {loading ? '⏳ Enregistrement...' : '💾 Enregistrer les modifications'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;