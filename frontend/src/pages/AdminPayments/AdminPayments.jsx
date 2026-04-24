import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  SearchIcon, ChevronDownIcon, XIcon
} from '../AdminDashboard/Icons';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';

// Icons for KPI cards
const RevenueIcon = (props) => (
  <svg {...props} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);
const ArrowUpIcon = (props) => (
  <svg {...props} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
  </svg>
);
const RefundIcon = (props) => (
  <svg {...props} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

  const renderBadge = (statut) => {
    const commonClasses = "inline-flex items-center p-[4px_14px] rounded-[20px] text-xs font-semibold";
    if (statut === 'Payé') return <span className={`${commonClasses} bg-[#e8f8f0] text-[#2ad367]`}>Payé</span>;
    if (statut === 'En attente') return <span className={`${commonClasses} bg-[#f5f5f5] text-[#666] dark:bg-[#2b2b2b] dark:text-[#aaa]`}>En attente</span>;
    return <span className={`${commonClasses} bg-[#fadbd8] text-[#e74c3c]`}>Remboursé</span>;
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#f7f9fc] text-[#333] dark:bg-[#121212] dark:text-[#e4e6eb]">
      <AdminSidebar activePage="paiements" />

      {/* MAIN */}
      <main 
        className="flex-1 p-[32px_40px] max-w-[1400px] transition-[margin-left] duration-300 ease-in-out dark:bg-[#121212]" 
        style={{ marginLeft: collapsed ? '72px' : '260px' }}
      >
        <header className="mb-7">
          <h1 className="text-[28px] font-bold text-[#111] m-[0_0_6px_0] dark:text-[#e4e6eb]">Paiements</h1>
          <p className="text-[#666] m-0 text-[15px] dark:text-[#aaa]">Historique des paiements et revenus de la plateforme.</p>
        </header>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          <div className="bg-white border border-[#eaeaea] rounded-xl p-[20px_24px] flex items-center gap-4 shadow-[0_2px_5px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#e8f8f0] text-[#2ad367]"><RevenueIcon /></div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#888] font-medium dark:text-[#aaa]">Revenus totaux</span>
              <span className="text-[22px] font-bold text-[#111] dark:text-[#e4e6eb]">{totalRevenu.toLocaleString()} DA</span>
              <span className="text-[12px] text-[#aaa] dark:text-[#aaa]">+65% vs mois dernier</span>
            </div>
          </div>
          <div className="bg-white border border-[#eaeaea] rounded-xl p-[20px_24px] flex items-center gap-4 shadow-[0_2px_5px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#fff3e0] text-[#f59e0b]"><ArrowUpIcon /></div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#888] font-medium dark:text-[#aaa]">En attente</span>
              <span className="text-[22px] font-bold text-[#111] dark:text-[#e4e6eb]">{enAttente.toLocaleString()} DA</span>
              <span className="text-[12px] text-[#aaa] dark:text-[#aaa]">{enAttenteCount} paiement(s)</span>
            </div>
          </div>
          <div className="bg-white border border-[#eaeaea] rounded-xl p-[20px_24px] flex items-center gap-4 shadow-[0_2px_5px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#e8f0fe] text-[#3b82f6]"><RefundIcon /></div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#888] font-medium dark:text-[#aaa]">Remboursements</span>
              <span className="text-[22px] font-bold text-[#111] dark:text-[#e4e6eb]">{remboursements.toLocaleString()} DA</span>
              <span className="text-[12px] text-[#aaa] dark:text-[#aaa]">{remboursementsCount} remboursement(s)</span>
            </div>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white border border-[#eaeaea] rounded-xl p-6 mb-6 shadow-[0_2px_5px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
          <h3 className="text-[18px] font-semibold m-0 text-[#111] dark:text-[#e4e6eb]">Revenus cette semaine</h3>
          <p className="text-[13px] text-[#888] m-0 mb-6 dark:text-[#888]">Revenus quotidiens en DA</p>
          <div className="flex gap-3">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between text-[12px] text-[#bbb] text-right min-w-[36px] pb-7 dark:text-[#888]">
              {['60K', '45K', '30K', '15K', '0K'].map(l => (
                <span key={l}>{l}</span>
              ))}
            </div>

            {/* Chart body with grid + bars */}
            <div className="flex-1 relative h-[220px] flex flex-col">
              {/* Grid lines */}
              <div className="absolute top-0 left-0 right-0 bottom-7 flex flex-col justify-between pointer-events-none z-0">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="w-full h-[1px] bg-[#f0f0f0] dark:bg-[#2b2b2b]" />
                ))}
              </div>

              {/* Bars */}
              <div className="absolute top-0 left-0 right-0 bottom-7 flex items-end gap-2 z-10">
                {weekData.map((d, i) => {
                  const heightPct = (d.value / 60000) * 100;
                  const isHovered = hoveredBar === i;
                  return (
                    <div
                      key={d.day}
                      className="flex-1 flex flex-col items-center h-full cursor-pointer relative"
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex-1 w-full flex items-end justify-center relative">
                        {isHovered && (
                          <div className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white rounded-lg p-[8px_14px] text-[12px] whitespace-nowrap z-20 flex flex-col gap-[3px] shadow-[0_4px_16px_rgba(0,0,0,0.2)] after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-6 after:border-transparent after:border-t-[#1a1a1a]">
                            <strong className="text-[13px] font-semibold">{d.day}</strong>
                            <span className="opacity-85">Revenues : {d.value.toLocaleString()} DA</span>
                          </div>
                        )}
                        <div
                          className={`w-[70%] max-w-[40px] bg-[#2ad367] rounded-t-md transition-[background-color,transform] duration-150 ${isHovered ? 'bg-[#1faf56] scale-x-[1.05]' : ''}`}
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <span className="absolute -bottom-6 text-[12px] text-[#999] whitespace-nowrap dark:text-[#888]">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* TOOLBAR */}
        <section className="flex gap-3 mb-5">
          <div className="flex-1 relative flex items-center">
            <SearchIcon className="absolute left-4 text-[#999]" />
            <input
              type="text"
              placeholder="Rechercher ..."
              className="w-full p-[11px_16px_11px_46px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit transition-colors bg-white focus:border-[#2ad367] dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button 
              className="flex items-center gap-2 p-[11px_20px] bg-white border border-[#eaeaea] rounded-lg text-sm text-[#333] cursor-pointer font-inherit whitespace-nowrap dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]" 
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {filterStatut} <ChevronDownIcon />
            </button>
            {filterOpen && (
              <div className="absolute top-[110%] right-0 bg-white border border-[#eaeaea] rounded-xl w-[200px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-2 z-20 dark:bg-[#1a1a1a] dark:border-[#333]">
                {['Tous les statuts', 'Payé', 'En attente', 'Remboursé'].map(opt => (
                  <div
                    key={opt}
                    className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterStatut === opt ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`}
                    onClick={() => { setFilterStatut(opt); setFilterOpen(false); }}
                  >
                    <span className="text-[#2ad367] mr-2 font-bold w-3.5 inline-block">{filterStatut === opt ? '✓' : ''}</span> {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* TABLE */}
        <section className="bg-white border border-[#eaeaea] rounded-xl overflow-hidden dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#eaeaea] dark:border-[#2b2b2b]">
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">ID</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Utilisateur</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Type</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Montant</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Méthode</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Date</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-[#eaeaea] dark:border-[#2b2b2b]">
                  <td className="p-[16px_20px] text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{p.id}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{p.utilisateur}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{p.type}</td>
                  <td className="p-[16px_20px] text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{p.montant.toLocaleString()} DA</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{p.methode}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{p.date}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{renderBadge(p.statut)}</td>
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
