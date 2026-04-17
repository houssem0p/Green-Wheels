import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  EditIcon, TrashIcon, SearchIcon, PlusIcon, XIcon
} from '../AdminDashboard/Icons';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';

const initialStations = [
  { id: 'S001', name: 'Alger Centre', address: 'Rue Didouche Mourad', velos: 12, emplacements: 20, status: 'Active' },
  { id: 'S002', name: 'Bab El Oued', address: 'Place des Martyrs', velos: 8, emplacements: 15, status: 'Active' },
  { id: 'S003', name: 'Hussein Dey', address: 'Avenue Hassiba Ben Bouali', velos: 5, emplacements: 10, status: 'Active' },
  { id: 'S004', name: 'Bir Mourad Raïs', address: 'Rue Ahmed Zabana', velos: 18, emplacements: 18, status: 'Active' },
  { id: 'S005', name: 'El Harrach', address: 'Boulevard Mohamed V', velos: 7, emplacements: 12, status: 'Inactive' },
];

const AdminStations = () => {
  const [collapsed] = useSidebar();
  const [stations, setStations] = useState(initialStations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStation, setEditStation] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = stations.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [newStation, setNewStation] = useState({
    name: '', address: '', latitude: '', longitude: '', emplacements: ''
  });

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAddStation = (e) => {
    e.preventDefault();
    if (!newStation.name || !newStation.address) return;

    const newId = `S00${stations.length + 1}`;
    setStations([...stations, {
      id: newId,
      name: newStation.name,
      address: newStation.address,
      velos: 0,
      emplacements: newStation.emplacements || 0,
      status: 'Active'
    }]);

    setIsModalOpen(false);
    setNewStation({ name: '', address: '', latitude: '', longitude: '', emplacements: '' });
    setToast({ type: 'success', text: 'Nom de la Station a été ajouté à la flotte' });
  };

  const handleDelete = (id) => {
    setStations(stations.filter(s => s.id !== id));
    setToast({ type: 'error', text: 'Station supprimée' });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setStations(stations.map(s => s.id === editStation.id ? { ...editStation } : s));
    setEditStation(null);
    setToast({ type: 'success', text: 'Station mise à jour avec succès' });
  };

  const renderStatusBadge = (status) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center justify-center p-[4px_16px] rounded-[20px] text-xs font-semibold bg-[#e8f8f0] text-[#2ad367]">
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center p-[4px_16px] rounded-[20px] text-xs font-semibold bg-[#f5f5f5] text-[#888] dark:bg-[#2b2b2b] dark:text-[#aaa]">
        {status}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#f7f9fc] text-[#333] dark:bg-[#121212] dark:text-[#e4e6eb]">
      <AdminSidebar activePage="stations" />

      {/* MAIN CONTENT */}
      <main
        className="flex-1 p-[32px_40px] max-w-[1400px] transition-[margin-left] duration-300 ease-in-out dark:bg-[#121212]"
        style={{ marginLeft: collapsed ? '72px' : '260px' }}
      >
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">Stations</h1>
            <p className="text-[#666] m-0 text-[15px] dark:text-[#aaa]">Gérez les stations de vélos.</p>
          </div>
          <button
            className="bg-[#2ad367] text-white border-none p-[10px_20px] rounded-[20px] font-semibold text-sm flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#24b557]"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon /> Ajouter une station
          </button>
        </header>

        {/* TOOLBAR */}
        <section className="flex gap-4 mb-6">
          <div className="flex-1 relative flex items-center">
            <SearchIcon className="absolute left-4 text-[#999]" />
            <input
              type="text"
              placeholder="Rechercher une station ..."
              className="w-full p-[12px_16px_12px_48px] border border-[#eaeaea] rounded-[20px] text-sm outline-none transition-colors focus:border-[#2ad367] dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* TABLE */}
        <section className="bg-white border border-[#eaeaea] rounded-xl overflow-hidden dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#eaeaea] dark:border-[#2b2b2b]">
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">ID</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Nom</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Adresse</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Vélos</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Emplacements</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Statut</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map(s => (
                <tr key={s.id} className="border-b border-[#eaeaea] dark:border-[#2b2b2b]">
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{s.id}</td>
                  <td className="p-[16px_20px] text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{s.name}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{s.address}</td>
                  <td className="p-[16px_20px] text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{s.velos}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{s.emplacements}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{renderStatusBadge(s.status)}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">
                    <div className="flex gap-2">
                      <button
                        className="bg-transparent border border-[#eaeaea] rounded-md w-8 h-8 flex items-center justify-center text-[#666] cursor-pointer transition-colors p-0 hover:bg-[#f5f5f5] hover:text-[#333] dark:border-[#333] dark:text-[#aaa] dark:hover:bg-[#2b2b2b] dark:hover:text-[#e4e6eb]"
                        onClick={() => setEditStation({ ...s })}
                      >
                        <EditIcon className="w-4 h-4 !block" />
                      </button>
                      <button
                        className="bg-transparent border border-[#eaeaea] rounded-md w-8 h-8 flex items-center justify-center text-[#666] cursor-pointer transition-colors p-0 hover:bg-[#fadbd8] hover:text-[#e74c3c] hover:border-[#fadbd8] dark:border-[#333] dark:text-[#aaa]"
                        onClick={() => handleDelete(s.id)}
                      >
                        <TrashIcon className="w-4 h-4 !block" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* MODAL AJOUTER */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
          <div className="bg-white w-[450px] rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold m-0 dark:text-[#e4e6eb]">Ajouter une station</h2>
              <button className="bg-transparent border-none text-[#888] cursor-pointer flex" onClick={() => setIsModalOpen(false)}>
                <XIcon />
              </button>
            </div>

            <form onSubmit={handleAddStation} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Nom</label>
                <input
                  type="text"
                  placeholder="Nom de la station"
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                  value={newStation.name}
                  onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Adresse</label>
                <input
                  type="text"
                  placeholder="Adresse"
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                  value={newStation.address}
                  onChange={(e) => setNewStation({ ...newStation, address: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Latitude</label>
                  <input
                    type="text"
                    className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                    value={newStation.latitude}
                    onChange={(e) => setNewStation({ ...newStation, latitude: e.target.value })}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Longitude</label>
                  <input
                    type="text"
                    className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                    value={newStation.longitude}
                    onChange={(e) => setNewStation({ ...newStation, longitude: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Emplacements</label>
                <input
                  type="number"
                  placeholder="20"
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                  value={newStation.emplacements}
                  onChange={(e) => setNewStation({ ...newStation, emplacements: e.target.value })}
                />
              </div>

              <div className="mt-4">
                <button type="submit" className="w-full p-[14px] bg-[#2ad367] border-none text-white rounded-lg font-semibold text-sm cursor-pointer transition-colors hover:bg-[#24b557]">Ajouter la station</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MODIFIER */}
      {editStation && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
          <div className="bg-white w-[450px] rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold m-0 dark:text-[#e4e6eb]">Modifier la station</h2>
              <button className="bg-transparent border-none text-[#888] cursor-pointer flex" onClick={() => setEditStation(null)}>
                <XIcon />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Nom</label>
                <input
                  type="text"
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                  value={editStation.name}
                  onChange={(e) => setEditStation({ ...editStation, name: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Adresse</label>
                <input
                  type="text"
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                  value={editStation.address}
                  onChange={(e) => setEditStation({ ...editStation, address: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Vélos</label>
                  <input
                    type="number"
                    className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                    value={editStation.velos}
                    onChange={(e) => setEditStation({ ...editStation, velos: Number(e.target.value) })}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Emplacements</label>
                  <input
                    type="number"
                    className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                    value={editStation.emplacements}
                    onChange={(e) => setEditStation({ ...editStation, emplacements: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Statut</label>
                <select
                  className={`p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm font-semibold outline-none dark:bg-[#1a1a1a] dark:border-[#333] cursor-pointer ${editStation.status === 'Active' ? 'bg-[#e8f8f0] text-[#2ad367]' : 'bg-[#f2f2f2] text-[#888]'}`}
                  value={editStation.status}
                  onChange={(e) => setEditStation({ ...editStation, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mt-4">
                <button type="submit" className="w-full p-[14px] bg-[#2ad367] border-none text-white rounded-lg font-semibold text-sm cursor-pointer transition-colors hover:bg-[#24b557]">Enregistrer les modifications</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATIONS */}
      {toast && (
        <div className={`fixed right-6 z-[1000] animate-in fade-in slide-in-from-right duration-300 ${toast.type === 'error' ? 'bottom-6 left-1/2 -translate-x-1/2 right-auto ml-[130px]' : 'bottom-6'}`}>
          {toast.type === 'error' ? (
            <div className="bg-[#e74c3c] text-white p-[12px_24px] rounded-lg flex items-center gap-4 font-medium text-sm">
              <span>{toast.text}</span>
              <button className="bg-transparent border-none text-white opacity-80 cursor-pointer flex hover:opacity-100" onClick={() => setToast(null)}><XIcon /></button>
            </div>
          ) : (
            <div className="bg-white border border-[#eaeaea] rounded-lg p-[16px_20px] w-[300px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:bg-[#1a1a1a] dark:border-[#333]">
              <div className="flex justify-between items-center mb-1">
                <strong className="text-[15px] text-[#333] dark:text-[#e4e6eb]">Station ajoutée</strong>
                <button className="bg-transparent border-none text-[#999] cursor-pointer flex p-0 h-[18px]" onClick={() => setToast(null)}><XIcon className="w-4 h-4" /></button>
              </div>
              <p className="m-0 text-[13px] text-[#666] dark:text-[#aaa]">{toast.text}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStations;
