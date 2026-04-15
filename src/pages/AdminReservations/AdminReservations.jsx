import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminReservations.module.css';
import {
  SearchIcon, ChevronDownIcon, EyeIcon, XIcon
} from '../AdminDashboard/Icons';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';

// BanCircle icon for cancel action
const CancelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const initialReservations = [
  { id: 'R001', utilisateur: 'Karim Benali', vehicule: 'Vélo Urbain Pro', station: 'Alger Centre', date: '2026-03-15', duree: '2h00', montant: '400 DA', statut: 'En cours' },
  { id: 'R002', utilisateur: 'Sarah Meziane', vehicule: 'Scooter City', station: 'Bab El Oued', date: '2026-03-20', duree: '1h15', montant: '500 DA', statut: 'En cours' },
  { id: 'R003', utilisateur: 'Ahmed Khelifi', vehicule: 'E-Bike Sport', station: 'Kouba', date: '2026-02-10', duree: '3h00', montant: '450 DA', statut: 'Terminée' },
  { id: 'R004', utilisateur: 'Amina Rahal', vehicule: 'Vélo Classic', station: 'Hussein Dey', date: '2026-02-22', duree: '0h45', montant: '180 DA', statut: 'Terminée' },
  { id: 'R005', utilisateur: 'Yacine Larbi', vehicule: 'Scooter Express', station: 'El Harrach', date: '2026-01-30', duree: '1h00', montant: '600 DA', statut: 'Annulée' },
  { id: 'R006', utilisateur: 'Kenza Atmani', vehicule: 'Vélo Touring', station: 'Alger Centre', date: '2026-04-06', duree: '1h30', montant: '375 DA', statut: 'En cours' },
];

const AdminReservations = () => {
  const [collapsed] = useSidebar();
  const [reservations, setReservations] = useState(initialReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('Tous les statuts');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedResa, setSelectedResa] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const filtered = reservations.filter(r => {
    const matchSearch = r.utilisateur.toLowerCase().includes(searchTerm.toLowerCase())
      || r.id.toLowerCase().includes(searchTerm.toLowerCase())
      || r.vehicule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatut === 'Tous les statuts' || r.statut === filterStatut;
    return matchSearch && matchFilter;
  });

  const handleCancel = (id) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, statut: 'Annulée' } : r));
    setToast('Réservation annulée');
  };

  const total = reservations.length;
  const enCours = reservations.filter(r => r.statut === 'En cours').length;
  const terminees = reservations.filter(r => r.statut === 'Terminée').length;
  const revenus = reservations
    .filter(r => r.statut !== 'Annulée')
    .reduce((acc, r) => acc + parseInt(r.montant), 0);

  const renderBadge = (statut) => {
    if (statut === 'En cours') return <span className={`${styles.badge} ${styles.badgeGreen}`}>En cours</span>;
    if (statut === 'Terminée') return <span className={`${styles.badge} ${styles.badgeGray}`}>Terminée</span>;
    return <span className={`${styles.badge} ${styles.badgeRed}`}>Annulée</span>;
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar activePage="reservations" />

      {/* MAIN */}
      <main className={styles.mainContent} style={{ marginLeft: collapsed ? '72px' : '260px' }}>
        <header className={styles.header}>
          <h1>Réservations</h1>
          <p>Gérez toutes les réservations de la plateforme.</p>
        </header>

        {/* KPI */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}><span className={styles.kpiValue}>{total}</span><span className={styles.kpiLabel}>Total</span></div>
          <div className={styles.kpiCard}><span className={styles.kpiValue}>{enCours}</span><span className={styles.kpiLabel}>En cours</span></div>
          <div className={styles.kpiCard}><span className={styles.kpiValue}>{terminees}</span><span className={styles.kpiLabel}>Terminées</span></div>
          <div className={styles.kpiCard}><span className={`${styles.kpiValue} ${styles.kpiGreen}`}>{revenus.toLocaleString()} DA</span><span className={styles.kpiLabel}>Revenus</span></div>
        </div>

        {/* TOOLBAR */}
        <section className={styles.toolbar}>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Rechercher ..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.filterBox}>
            <button className={styles.filterBtn} onClick={() => setFilterOpen(!filterOpen)}>
              {filterStatut} <ChevronDownIcon />
            </button>
            {filterOpen && (
              <div className={styles.filterDropdown}>
                {['Tous les statuts', 'En cours', 'Terminée', 'Annulée'].map(opt => (
                  <div
                    key={opt}
                    className={`${styles.filterItem} ${filterStatut === opt ? styles.filterActive : ''}`}
                    onClick={() => { setFilterStatut(opt); setFilterOpen(false); }}
                  >
                    <span className={styles.check}>{filterStatut === opt ? '✓' : ''}</span> {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* TABLE */}
        <section className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Utilisateur</th>
                <th>Véhicule</th>
                <th>Station</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td className={styles.boldCell}>{r.id}</td>
                  <td>{r.utilisateur}</td>
                  <td>{r.vehicule}</td>
                  <td>{r.station}</td>
                  <td>{renderBadge(r.statut)}</td>
                  <td>
                    <div className={styles.actionsBox}>
                      <button className={styles.iconBtn} onClick={() => setSelectedResa(r)} title="Voir détails">
                        <EyeIcon />
                      </button>
                      {r.statut === 'En cours' && (
                        <button className={`${styles.iconBtn} ${styles.cancelBtn}`} onClick={() => handleCancel(r.id)} title="Annuler">
                          <CancelIcon />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* MODAL DETAILS */}
      {selectedResa && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Détails de la réservation {selectedResa.id}</h2>
              <button className={styles.closeBtn} onClick={() => setSelectedResa(null)}><XIcon /></button>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailField}><span className={styles.fieldLabel}>Utilisateur</span><span className={styles.fieldValue}>{selectedResa.utilisateur}</span></div>
              <div className={styles.detailField}><span className={styles.fieldLabel}>Véhicule</span><span className={styles.fieldValue}>{selectedResa.vehicule}</span></div>
              <div className={styles.detailField}><span className={styles.fieldLabel}>Station</span><span className={styles.fieldValue}>{selectedResa.station}</span></div>
              <div className={styles.detailField}><span className={styles.fieldLabel}>Date</span><span className={styles.fieldValue}>{selectedResa.date}</span></div>
              <div className={styles.detailField}><span className={styles.fieldLabel}>Durée</span><span className={styles.fieldValue}>{selectedResa.duree}</span></div>
              <div className={styles.detailField}><span className={styles.fieldLabel}>Montant</span><span className={styles.fieldValue}>{selectedResa.montant}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className={styles.toastWrap}>
          <div className={styles.toastBox}>
            <span>{toast}</span>
            <button className={styles.toastClose} onClick={() => setToast(null)}><XIcon /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;
