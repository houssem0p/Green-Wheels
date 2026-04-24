import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminPayments.module.css';
import {
  SearchIcon, ChevronDownIcon, XIcon
} from '../AdminDashboard/Icons';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';

// Icons for KPI cards
const RevenueIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);
const ArrowUpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
  </svg>
);
const RefundIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.52"/>
  </svg>
);

const initialPayments = [
  { id: 'P001', utilisateur: 'Karim Benali',  type: 'Location',    montant: 400,    methode: 'Carte bancaire', date: '2026-04-06', statut: 'Payé' },
  { id: 'P002', utilisateur: 'Sarah Meziane',  type: 'Abonnement',  montant: 5000,   methode: 'Carte bancaire', date: '2026-04-07', statut: 'Payé' },
  { id: 'P003', utilisateur: 'Ahmed Khelifi',  type: 'Location',    montant: 280,    methode: 'Carte bancaire', date: '2026-04-05', statut: 'En attente' },
  { id: 'P004', utilisateur: 'Amina Rahal',    type: 'Location',    montant: 400,    methode: 'Carte bancaire', date: '2026-04-09', statut: 'Remboursé' },
  { id: 'P005', utilisateur: 'Yacine Larbi',   type: 'Abonnement',  montant: 40000,  methode: 'Carte bancaire', date: '2026-04-03', statut: 'Payé' },
  { id: 'P006', utilisateur: 'Kenza Atmani',   type: 'Location',    montant: 750,    methode: 'Carte bancaire', date: '2026-04-06', statut: 'Payé' },
];

const weekData = [
  { day: 'Lun', value: 30000 },
  { day: 'Mar', value: 18000 },
  { day: 'Mer', value: 22000 },
  { day: 'Jeu', value: 48000 },
  { day: 'Ven', value: 38000 },
  { day: 'Sam', value: 28000 },
  { day: 'Dim', value: 20000 },
];

const AdminPayments = () => {
  const [collapsed] = useSidebar();
  const [payments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('Tous les statuts');
  const [filterOpen, setFilterOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);

  const filtered = payments.filter(p => {
    const matchSearch = p.utilisateur.toLowerCase().includes(searchTerm.toLowerCase())
      || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatut === 'Tous les statuts' || p.statut === filterStatut;
    return matchSearch && matchFilter;
  });

  const totalRevenu = payments.filter(p => p.statut === 'Payé').reduce((a, p) => a + p.montant, 0);
  const enAttente = payments.filter(p => p.statut === 'En attente').reduce((a, p) => a + p.montant, 0);
  const enAttenteCount = payments.filter(p => p.statut === 'En attente').length;
  const remboursements = payments.filter(p => p.statut === 'Remboursé').reduce((a, p) => a + p.montant, 0);
  const remboursementsCount = payments.filter(p => p.statut === 'Remboursé').length;

  const maxVal = Math.max(...weekData.map(d => d.value));

  const renderBadge = (statut) => {
    if (statut === 'Payé') return <span className={`${styles.badge} ${styles.badgeGreen}`}>Payé</span>;
    if (statut === 'En attente') return <span className={`${styles.badge} ${styles.badgeGray}`}>En attente</span>;
    return <span className={`${styles.badge} ${styles.badgeRed}`}>Remboursé</span>;
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar activePage="paiements" />

      {/* MAIN */}
      <main className={styles.mainContent} style={{ marginLeft: collapsed ? '72px' : '260px' }}>
        <header className={styles.header}>
          <h1>Paiements</h1>
          <p>Historique des paiements et revenus de la plateforme.</p>
        </header>

        {/* KPI CARDS */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.iconGreen}`}><RevenueIcon /></div>
            <div className={styles.kpiInfo}>
              <span className={styles.kpiLabel}>Revenus totaux</span>
              <span className={styles.kpiValue}>{totalRevenu.toLocaleString()} DA</span>
              <span className={styles.kpiSub}>+65% vs mois dernier</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.iconOrange}`}><ArrowUpIcon /></div>
            <div className={styles.kpiInfo}>
              <span className={styles.kpiLabel}>En attente</span>
              <span className={styles.kpiValue}>{enAttente.toLocaleString()} DA</span>
              <span className={styles.kpiSub}>{enAttenteCount} paiement(s)</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.iconBlue}`}><RefundIcon /></div>
            <div className={styles.kpiInfo}>
              <span className={styles.kpiLabel}>Remboursements</span>
              <span className={styles.kpiValue}>{remboursements.toLocaleString()} DA</span>
              <span className={styles.kpiSub}>{remboursementsCount} remboursement(s)</span>
            </div>
          </div>
        </div>

        {/* BAR CHART */}
        <div className={styles.chartCard}>
          <h3>Revenus cette semaine</h3>
          <p>Revenus quotidiens en DA</p>
          <div className={styles.chartOuter}>
            {/* Y-axis labels */}
            <div className={styles.yAxis}>
              {['60K', '45K', '30K', '15K', '0K'].map(l => (
                <span key={l}>{l}</span>
              ))}
            </div>

            {/* Chart body with grid + bars */}
            <div className={styles.chartBody}>
              {/* Grid lines */}
              <div className={styles.gridLines}>
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className={styles.gridLine} />
                ))}
              </div>

              {/* Bars */}
              <div className={styles.barsRow}>
                {weekData.map((d, i) => {
                  const heightPct = (d.value / 60000) * 100;
                  const isHovered = hoveredBar === i;
                  return (
                    <div
                      key={d.day}
                      className={styles.barCol}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className={styles.barTrack}>
                        {isHovered && (
                          <div className={styles.tooltip}>
                            <strong>{d.day}</strong>
                            <span>Revenues : {d.value.toLocaleString()} DA</span>
                          </div>
                        )}
                        <div
                          className={`${styles.bar} ${isHovered ? styles.barHovered : ''}`}
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <span className={styles.barLabel}>{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
                {['Tous les statuts', 'Payé', 'En attente', 'Remboursé'].map(opt => (
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
                <th>Type</th>
                <th>Montant</th>
                <th>Méthode</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td className={styles.boldCell}>{p.id}</td>
                  <td>{p.utilisateur}</td>
                  <td>{p.type}</td>
                  <td className={styles.boldCell}>{p.montant.toLocaleString()} DA</td>
                  <td>{p.methode}</td>
                  <td>{p.date}</td>
                  <td>{renderBadge(p.statut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminPayments;
