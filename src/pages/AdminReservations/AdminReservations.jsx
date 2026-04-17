import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  SearchIcon, ChevronDownIcon, EyeIcon, XIcon
} from '../AdminDashboard/Icons';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';

// BanCircle icon for cancel action
const CancelIcon = (props) => (
  <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    const commonClasses = "inline-flex items-center p-[4px_14px] rounded-[20px] text-xs font-semibold";
    if (statut === 'En cours') return <span className={`${commonClasses} bg-[#e8f8f0] text-[#2ad367]`}>En cours</span>;
    if (statut === 'Terminée') return <span className={`${commonClasses} bg-[#f5f5f5] text-[#666] dark:bg-[#2b2b2b] dark:text-[#aaa]`}>Terminée</span>;
    return <span className={`${commonClasses} bg-[#fadbd8] text-[#e74c3c]`}>Annulée</span>;
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#f7f9fc] text-[#333] dark:bg-[#121212] dark:text-[#e4e6eb]">
      <AdminSidebar activePage="reservations" />

      {/* MAIN */}
      <main 
        className="flex-1 p-[32px_40px] max-w-[1400px] transition-[margin-left] duration-300 ease-in-out dark:bg-[#121212]" 
        style={{ marginLeft: collapsed ? '72px' : '260px' }}
      >
        <header className="mb-7">
          <h1 className="text-[28px] font-bold text-[#111] m-[0_0_6px_0] dark:text-[#e4e6eb]">Réservations</h1>
          <p className="text-[#666] m-0 text-[15px] dark:text-[#aaa]">Gérez toutes les réservations de la plateforme.</p>
        </header>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white border border-[#eaeaea] rounded-xl p-[20px_24px] flex flex-col items-center gap-1.5 shadow-[0_2px_5px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <span className="text-[26px] font-bold text-[#111] dark:text-[#e4e6eb]">{total}</span>
            <span className="text-[13px] text-[#888] font-medium">Total</span>
          </div>
          <div className="bg-white border border-[#eaeaea] rounded-xl p-[20px_24px] flex flex-col items-center gap-1.5 shadow-[0_2px_5px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <span className="text-[26px] font-bold text-[#111] dark:text-[#e4e6eb]">{enCours}</span>
            <span className="text-[13px] text-[#888] font-medium">En cours</span>
          </div>
          <div className="bg-white border border-[#eaeaea] rounded-xl p-[20px_24px] flex flex-col items-center gap-1.5 shadow-[0_2px_5px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <span className="text-[26px] font-bold text-[#111] dark:text-[#e4e6eb]">{terminees}</span>
            <span className="text-[13px] text-[#888] font-medium">Terminées</span>
          </div>
          <div className="bg-white border border-[#eaeaea] rounded-xl p-[20px_24px] flex flex-col items-center gap-1.5 shadow-[0_2px_5px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <span className="text-[26px] font-bold text-[#2ad367]">{revenus.toLocaleString()} DA</span>
            <span className="text-[13px] text-[#888] font-medium">Revenus</span>
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
                {['Tous les statuts', 'En cours', 'Terminée', 'Annulée'].map(opt => (
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
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Véhicule</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Station</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Statut</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-[#eaeaea] dark:border-[#2b2b2b]">
                  <td className="p-[16px_20px] text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{r.id}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{r.utilisateur}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{r.vehicule}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{r.station}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{renderBadge(r.statut)}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">
                    <div className="flex gap-2">
                      <button 
                        className="bg-transparent border-none text-[#888] cursor-pointer flex items-center justify-center p-1 rounded-md transition-colors hover:text-[#333] hover:bg-[#f5f5f5] dark:hover:bg-[#2b2b2b] dark:hover:text-[#e4e6eb]" 
                        onClick={() => setSelectedResa(r)} 
                        title="Voir détails"
                      >
                        <EyeIcon className="w-[18px] h-[18px]" />
                      </button>
                      {r.statut === 'En cours' && (
                        <button 
                          className="bg-transparent border-none text-[#888] cursor-pointer flex items-center justify-center p-1 rounded-md transition-colors hover:text-[#e74c3c] hover:bg-[#fadbd8]" 
                          onClick={() => handleCancel(r.id)} 
                          title="Annuler"
                        >
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
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
          <div className="bg-white w-[440px] rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] animate-in zoom-in-95 duration-200 dark:bg-[#1a1a1a]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[18px] font-semibold m-0 text-[#111] dark:text-[#e4e6eb]">Détails de la réservation {selectedResa.id}</h2>
              <button className="bg-transparent border-none text-[#888] cursor-pointer flex p-0" onClick={() => setSelectedResa(null)}><XIcon /></button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5"><span className="text-xs text-[#888] font-medium">Utilisateur</span><span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedResa.utilisateur}</span></div>
              <div className="flex flex-col gap-1.5"><span className="text-xs text-[#888] font-medium">Véhicule</span><span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedResa.vehicule}</span></div>
              <div className="flex flex-col gap-1.5"><span className="text-xs text-[#888] font-medium">Station</span><span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedResa.station}</span></div>
              <div className="flex flex-col gap-1.5"><span className="text-xs text-[#888] font-medium">Date</span><span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedResa.date}</span></div>
              <div className="flex flex-col gap-1.5"><span className="text-xs text-[#888] font-medium">Durée</span><span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedResa.duree}</span></div>
              <div className="flex flex-col gap-1.5"><span className="text-xs text-[#888] font-medium">Montant</span><span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedResa.montant}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[1100] animate-in slide-in-from-right duration-300">
          <div className="bg-white border border-[#eaeaea] rounded-lg p-[14px_20px] flex items-center gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-sm font-semibold text-[#333] min-w-[220px] dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]">
            <span>{toast}</span>
            <button className="bg-transparent border-none text-[#999] cursor-pointer flex p-0" onClick={() => setToast(null)}><XIcon /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;
