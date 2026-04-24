import React, { useState } from 'react';
import styles from './AdminMaintenance.module.css';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';
import { SearchIcon, ChevronDownIcon } from '../AdminDashboard/Icons';

const initialTasks = [
  { id: 'M001', vehicule: 'Vélo Classic',    probleme: 'Pneu crevé',        priorite: 'Haute',   technicien: 'Amina R.',  date: '2026-04-06', statut: 'En cours'  },
  { id: 'M002', vehicule: 'Scooter City',    probleme: 'Batterie faible',    priorite: 'Moyenne', technicien: 'Kenza A.',  date: '2026-04-06', statut: 'Planifiée' },
  { id: 'M003', vehicule: 'E-Bike Sport',    probleme: 'Frein défectueux',   priorite: 'Haute',   technicien: 'Amine L.',  date: '2026-04-05', statut: 'Terminée'  },
  { id: 'M004', vehicule: 'Vélo Cargo',      probleme: 'Chaîne usée',        priorite: 'Basse',   technicien: 'Chaima B.', date: '2026-04-09', statut: 'Planifiée' },
];

const AdminMaintenance = () => {
  const [collapsed] = useSidebar();
  const [tasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('Tous les statuts');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = tasks.filter(t => {
    const matchSearch = t.vehicule.toLowerCase().includes(searchTerm.toLowerCase())
      || t.id.toLowerCase().includes(searchTerm.toLowerCase())
      || t.probleme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatut === 'Tous les statuts' || t.statut === filterStatut;
    return matchSearch && matchFilter;
  });

  const renderPriority = (p) => {
    if (p === 'Haute')   return <span className={`${styles.badge} ${styles.priorityHigh}`}>Haute</span>;
    if (p === 'Moyenne') return <span className={`${styles.badge} ${styles.priorityMed}`}>Moyenne</span>;
    return                      <span className={`${styles.badge} ${styles.priorityLow}`}>Basse</span>;
  };

  const renderStatut = (s) => {
    if (s === 'En cours')  return <span className={`${styles.badge} ${styles.statutGreen}`}>En cours</span>;
    if (s === 'Planifiée') return <span className={`${styles.badge} ${styles.statutBlue}`}>Planifiée</span>;
    return                        <span className={`${styles.badge} ${styles.statutGray}`}>Terminée</span>;
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar activePage="maintenance" />

      <main className={styles.mainContent} style={{ marginLeft: collapsed ? '72px' : '260px' }}>
        <header className={styles.header}>
          <h1>Maintenance</h1>
          <p>Suivi de la maintenance des véhicules.</p>
        </header>

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
                {['Tous les statuts', 'En cours', 'Planifiée', 'Terminée'].map(opt => (
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
                <th>Véhicule</th>
                <th>Problème</th>
                <th>Priorité</th>
                <th>Technicien</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td className={styles.boldCell}>{t.id}</td>
                  <td>{t.vehicule}</td>
                  <td>{t.probleme}</td>
                  <td>{renderPriority(t.priorite)}</td>
                  <td>{t.technicien}</td>
                  <td>{t.date}</td>
                  <td>{renderStatut(t.statut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminMaintenance;
