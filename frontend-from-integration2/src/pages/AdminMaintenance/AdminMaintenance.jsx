import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';
import { SearchIcon, ChevronDownIcon, PlusIcon, XIcon } from '../AdminDashboard/Icons';

const initialTasks = [
  { id: 'M001', vehicule: 'Vélo Classic',    probleme: 'Pneu crevé',        priorite: 'Haute',   technicien: 'Amina R.',  date: '2026-04-06', statut: 'En cours'  },
  { id: 'M002', vehicule: 'Scooter City',    probleme: 'Batterie faible',    priorite: 'Moyenne', technicien: 'Kenza A.',  date: '2026-04-06', statut: 'Planifiée' },
  { id: 'M003', vehicule: 'E-Bike Sport',    probleme: 'Frein défectueux',   priorite: 'Haute',   technicien: 'Amine L.',  date: '2026-04-05', statut: 'Terminée'  },
  { id: 'M004', vehicule: 'Vélo Cargo',      probleme: 'Chaîne usée',        priorite: 'Basse',   technicien: 'Chaima B.', date: '2026-04-09', statut: 'Planifiée' },
];

const AdminMaintenance = () => {
  const [collapsed] = useSidebar();
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('Tous les statuts');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    vehicule: '',
    probleme: '',
    priorite: 'Moyenne',
    type: 'Réparation',
    date: ''
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    const id = `M00${tasks.length + 1}`;
    const taskToAdd = {
      ...newTask,
      id,
      technicien: 'Nouveau Tech', // Placeholder
      statut: 'Planifiée'
    };
    setTasks([taskToAdd, ...tasks]);
    setIsModalOpen(false);
    setNewTask({ vehicule: '', probleme: '', priorite: 'Moyenne', type: 'Réparation', date: '' });
  };

  const filtered = tasks.filter(t => {
    const matchSearch = t.vehicule.toLowerCase().includes(searchTerm.toLowerCase())
      || t.id.toLowerCase().includes(searchTerm.toLowerCase())
      || t.probleme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatut === 'Tous les statuts' || t.statut === filterStatut;
    return matchSearch && matchFilter;
  });

  const renderPriority = (p) => {
    const commonClasses = "inline-flex items-center p-[4px_14px] rounded-[20px] text-xs font-semibold";
    if (p === 'Haute')   return <span className={`${commonClasses} bg-[#fde8e8] text-[#e53e3e]`}>Haute</span>;
    if (p === 'Moyenne') return <span className={`${commonClasses} bg-[#fff3cd] text-[#d97706]`}>Moyenne</span>;
    return <span className={`${commonClasses} bg-[#f5f5f5] text-[#888] dark:bg-[#2b2b2b] dark:text-[#aaa]`}>Basse</span>;
  };

  const renderStatut = (s) => {
    const commonClasses = "inline-flex items-center p-[4px_14px] rounded-[20px] text-xs font-semibold";
    if (s === 'En cours')  return <span className={`${commonClasses} bg-[#e8f8f0] text-[#2ad367]`}>En cours</span>;
    if (s === 'Planifiée') return <span className={`${commonClasses} bg-[#e8f0fe] text-[#3b82f6]`}>Planifiée</span>;
    return <span className={`${commonClasses} bg-[#f5f5f5] text-[#666] dark:bg-[#2b2b2b] dark:text-[#aaa]`}>Terminée</span>;
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#f7f9fc] text-[#333] dark:bg-[#121212] dark:text-[#e4e6eb]">
      <AdminSidebar activePage="maintenance" />

      <main 
        className="flex-1 p-[36px_48px] transition-[margin-left] duration-300 ease-in-out dark:bg-[#121212]" 
        style={{ marginLeft: collapsed ? '72px' : '260px' }}
      >
        <header className="flex justify-between items-start mb-7">
          <div>
            <h1 className="text-[28px] font-bold text-[#111] m-[0_0_6px] dark:text-[#e4e6eb]">Maintenance</h1>
            <p className="text-[#666] m-0 text-[15px] dark:text-[#aaa]">Suivi de la maintenance des véhicules.</p>
          </div>
          <button 
            className="bg-[#2ad367] text-white border-none p-[10px_20px] rounded-[20px] font-semibold text-sm flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#24b557]" 
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon /> Nouvelle tâche
          </button>
        </header>

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
                {['Tous les statuts', 'En cours', 'Planifiée', 'Terminée'].map(opt => (
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
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Véhicule</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Problème</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Priorité</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Technicien</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Date</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b border-[#f0f0f0] last:border-none dark:border-[#2b2b2b]">
                  <td className="p-[18px_20px] text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{t.id}</td>
                  <td className="p-[18px_20px] text-sm text-[#555] dark:text-[#aaa]">{t.vehicule}</td>
                  <td className="p-[18px_20px] text-sm text-[#555] dark:text-[#aaa]">{t.probleme}</td>
                  <td className="p-[18px_20px] text-sm text-[#555] dark:text-[#aaa]">{renderPriority(t.priorite)}</td>
                  <td className="p-[18px_20px] text-sm text-[#555] dark:text-[#aaa]">{t.technicien}</td>
                  <td className="p-[18px_20px] text-sm text-[#555] dark:text-[#aaa]">{t.date}</td>
                  <td className="p-[18px_20px] text-sm text-[#555] dark:text-[#aaa]">{renderStatut(t.statut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* MODAL NOUVELLE TÂCHE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[450px] rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b] animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold m-0 dark:text-[#e4e6eb]">Nouvelle tâche de maintenance</h2>
              <button 
                className="bg-transparent border-none text-[#888] cursor-pointer flex hover:text-red-500 transition-colors" 
                onClick={() => setIsModalOpen(false)}
              >
                <XIcon />
              </button>
            </div>
            
            <form onSubmit={handleAddTask} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Véhicule</label>
                <input 
                  type="text" 
                  placeholder="Nom du véhicule" 
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                  value={newTask.vehicule} 
                  onChange={(e) => setNewTask({...newTask, vehicule: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Type</label>
                <select 
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367] cursor-pointer"
                  value={newTask.type} 
                  onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                >
                  <option value="Réparation">Réparation</option>
                  <option value="Inspection">Inspection</option>
                  <option value="Nettoyage">Nettoyage</option>
                  <option value="Révision">Révision</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Priorité</label>
                <select 
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367] cursor-pointer"
                  value={newTask.priorite} 
                  onChange={(e) => setNewTask({...newTask, priorite: e.target.value})}
                >
                  <option value="Basse">Basse</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Haute">Haute</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Description</label>
                <textarea 
                  placeholder="Décrivez le problème ..." 
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367] min-h-[100px] resize-none"
                  value={newTask.probleme} 
                  onChange={(e) => setNewTask({...newTask, probleme: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Date planifiée</label>
                <input 
                  type="date" 
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                  value={newTask.date} 
                  onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                  required
                />
              </div>

              <div className="mt-4">
                <button type="submit" className="w-full p-[14px] bg-[#2ad367] border-none text-white rounded-lg font-bold text-sm cursor-pointer transition-colors hover:bg-[#24b557]">Ajouter la tâche</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMaintenance;
