import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  EditIcon, TrashIcon, SearchIcon, ChevronDownIcon, BatteryIcon, PlusIcon, XIcon,
  MapPinIcon, BikeIcon
} from '../AdminDashboard/Icons'; // Reusing icons from the dashboard
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';

const initialVehicles = [
  { id: 'V001', name: 'Vélo Urbain Pro', type: 'Vélo électrique', price: 200, battery: 85, autonomy: '45 km', station: 'Alger Centre', status: 'Disponible' },
  { id: 'V002', name: 'Scooter City', type: 'Scooter électrique', price: 350, battery: 62, autonomy: '60 km', station: 'Bab El Oued', status: 'Indisponible' },
  { id: 'V003', name: 'Vélo Classic', type: 'Vélo Classique', price: 100, battery: 100, autonomy: 'N/A', station: 'Hussein Dey', status: 'Loué' },
  { id: 'V004', name: 'E-Bike Sport', type: 'Vélo électrique', price: 280, battery: 75, autonomy: '30 km', station: 'Kouba', status: 'Disponible' },
  { id: 'V005', name: 'Scooter Express', type: 'Scooter électrique', price: 400, battery: 95, autonomy: '70 km', station: 'El Harrach', status: 'Disponible' },
  { id: 'V006', name: 'Vélo Touring', type: 'Vélo électrique', price: 250, battery: 50, autonomy: '40 km', station: 'Alger Centre', status: 'Loué' },
];

const AdminVehicules = () => {
  const [collapsed] = useSidebar();
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  const [toast, setToast] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('Tous les status');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterValue === 'Tous les status' || v.status === filterValue;
    return matchesSearch && matchesFilter;
  });

  const [newVehicle, setNewVehicle] = useState({
    name: '', type: 'Vélo électrique', price: '', autonomy: '', station: 'Alger Centre'
  });

  // Auto-hide toast after 3s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newVehicle.name) return; // basic validation
    
    const newId = `V00${vehicles.length + 1}`;
    setVehicles([...vehicles, {
      ...newVehicle,
      id: newId,
      battery: 100, // defaults
      status: 'Disponible'
    }]);

    setIsModalOpen(false);
    setNewVehicle({ name: '', type: 'Vélo électrique', price: '', autonomy: '', station: 'Alger Centre' });
    setToast({ type: 'success', text: 'Nom du Véhicule a été ajouté à la flotte' });
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    setToast({ type: 'error', text: 'Véhicule supprimé' });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setVehicles(vehicles.map(v => v.id === editVehicle.id ? { ...editVehicle } : v));
    setEditVehicle(null);
    setToast({ type: 'success', text: 'Véhicule mis à jour avec succès' });
  };

  const renderStatusBadge = (status) => {
    const commonClasses = "inline-flex items-center gap-1.5 p-[6px_12px] border border-[#eaeaea] rounded-2xl text-xs font-medium cursor-pointer bg-white dark:bg-[#1a1a1a] dark:border-[#333]";
    switch(status) {
      case 'Disponible': return <span className={`${commonClasses} text-[#2ad367]`}>{status} <ChevronDownIcon /></span>;
      case 'Loué': return <span className={`${commonClasses} text-[#888] dark:text-[#aaa]`}>{status} <ChevronDownIcon /></span>;
      case 'Indisponible': return <span className={`${commonClasses} text-[#e74c3c]`}>{status} <ChevronDownIcon /></span>;
      default: return status;
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#f7f9fc] text-[#333] dark:bg-[#121212] dark:text-[#e4e6eb]">
      <AdminSidebar activePage="vehicules" />

      {/* MAIN CONTENT */}
      <main 
        className="flex-1 p-[32px_40px] max-w-[1400px] transition-[margin-left] duration-300 ease-in-out dark:bg-[#121212]" 
        style={{ marginLeft: collapsed ? '72px' : '260px' }}
      >
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">Véhicules</h1>
            <p className="text-[#666] m-0 text-[15px] dark:text-[#aaa]">Gérez les véhicules de la flotte GreenWheels.</p>
          </div>
          <button 
            className="bg-[#2ad367] text-white border-none p-[10px_20px] rounded-[20px] font-semibold text-sm flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#24b557]" 
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon /> Ajouter un véhicule
          </button>
        </header>

        {/* VEHICLE KPI CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex items-center gap-4 shadow-[0_2px_5px_rgba(0,0,0,0.01)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#e8f8f0] text-[#2ad367]">
              <BikeIcon />
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-[#111] m-[0_0_4px_0] dark:text-[#e4e6eb]">{vehicles.length}</h3>
              <p className="text-sm text-[#666] m-0 dark:text-[#aaa]">Total</p>
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex items-center gap-4 shadow-[0_2px_5px_rgba(0,0,0,0.01)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white text-[#2ad367] border-[1.5px] border-[#2ad367] dark:bg-[#1a1a1a]">
              <BatteryIcon />
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-[#111] m-[0_0_4px_0] dark:text-[#e4e6eb]">{vehicles.filter(v => v.status === 'Disponible').length}</h3>
              <p className="text-sm text-[#666] m-0 dark:text-[#aaa]">Disponibles</p>
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex items-center gap-4 shadow-[0_2px_5px_rgba(0,0,0,0.01)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white text-[#888] border-[1.5px] border-[#d0d0d0] dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#aaa]">
              <MapPinIcon />
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-[#111] m-[0_0_4px_0] dark:text-[#e4e6eb]">{vehicles.filter(v => v.status === 'Loué').length}</h3>
              <p className="text-sm text-[#666] m-0 dark:text-[#aaa]">Loués</p>
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex items-center gap-4 shadow-[0_2px_5px_rgba(0,0,0,0.01)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#fadbd8] text-[#e74c3c] border-[1.5px] border-[#e74c3c]">
              <EditIcon />
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-[#111] m-[0_0_4px_0] dark:text-[#e4e6eb]">{vehicles.filter(v => v.status === 'Indisponible').length}</h3>
              <p className="text-sm text-[#666] m-0 dark:text-[#aaa]">Maintenance</p>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <section className="flex gap-4 mb-6">
          <div className="flex-1 relative flex items-center">
            <SearchIcon className="absolute left-4 text-[#999]" />
            <input 
              type="text" 
              placeholder="Rechercher un véhicule ..." 
              className="w-full p-[12px_16px_12px_48px] border border-[#eaeaea] rounded-[20px] text-sm outline-none transition-colors focus:border-[#2ad367] dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center gap-2 p-[12px_20px] bg-white border border-[#eaeaea] rounded-[20px] text-sm text-[#333] cursor-pointer dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]" 
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {filterValue} <ChevronDownIcon />
            </button>
            {filterOpen && (
              <div className="absolute top-[110%] right-0 bg-white border border-[#eaeaea] rounded-xl w-[220px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 z-10 dark:bg-[#1a1a1a] dark:border-[#333]">
                <div 
                  className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterValue === 'Tous les status' ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`} 
                  onClick={() => {setFilterValue('Tous les status'); setFilterOpen(false);}}
                >
                  {filterValue === 'Tous les status' && <span className="text-[#2ad367] mr-2 font-bold">✓</span>} Tous les status
                </div>
                <div 
                  className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterValue === 'Disponible' ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`} 
                  onClick={() => {setFilterValue('Disponible'); setFilterOpen(false);}}
                >
                  {filterValue === 'Disponible' && <span className="text-[#2ad367] mr-2 font-bold">✓</span>} Disponible
                </div>
                <div 
                  className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterValue === 'Loué' ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`} 
                  onClick={() => {setFilterValue('Loué'); setFilterOpen(false);}}
                >
                   {filterValue === 'Loué' && <span className="text-[#2ad367] mr-2 font-bold">✓</span>} Loué
                </div>
                <div 
                  className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterValue === 'Indisponible' ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`} 
                  onClick={() => {setFilterValue('Indisponible'); setFilterOpen(false);}}
                >
                   {filterValue === 'Indisponible' && <span className="text-[#2ad367] mr-2 font-bold">✓</span>} Indisponible
                </div>
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
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Nom</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Type</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Prix/h</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Batterie</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Autonomie</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Station</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">État</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map(v => (
                <tr key={v.id} className="border-b border-[#eaeaea] dark:border-[#2b2b2b]">
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{v.id}</td>
                  <td className="p-[16px_20px] text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{v.name}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{v.type}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{v.price} DA</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">
                    <div className="flex items-center gap-2">
                       <div className="w-10 h-1.5 bg-[#eaeaea] rounded-[3px] overflow-hidden dark:bg-[#333]">
                        <div className="h-full bg-[#2ad367]" style={{width: `${v.battery}%`}}></div>
                      </div>
                      <span className="font-semibold text-[#333] dark:text-[#e4e6eb]">{v.battery}%</span>
                    </div>
                  </td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{v.autonomie}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{v.station}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">
                    <div className="inline-flex">
                      {renderStatusBadge(v.status)}
                    </div>
                  </td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">
                    <div className="flex gap-2">
                      <button 
                        className="bg-transparent border border-[#eaeaea] rounded-md w-8 h-8 flex items-center justify-center text-[#666] cursor-pointer transition-colors p-0 hover:bg-[#f5f5f5] hover:text-[#333] dark:border-[#333] dark:text-[#aaa] dark:hover:bg-[#2b2b2b] dark:hover:text-[#e4e6eb]" 
                        onClick={() => setEditVehicle({...v})}
                      >
                        <EditIcon className="w-4 h-4 !block" />
                      </button>
                      <button 
                        className="bg-transparent border border-[#eaeaea] rounded-md w-8 h-8 flex items-center justify-center text-[#666] cursor-pointer transition-colors p-0 hover:bg-[#fadbd8] hover:text-[#e74c3c] hover:border-[#fadbd8] dark:border-[#333] dark:text-[#aaa]" 
                        onClick={() => handleDelete(v.id)}
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

      {/* OVERLAY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
          <div className="bg-white w-[450px] rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold m-0 dark:text-[#e4e6eb]">Ajouter un véhicule</h2>
              <button className="bg-transparent border-none text-[#888] cursor-pointer flex" onClick={() => setIsModalOpen(false)}>
                <XIcon />
              </button>
            </div>
            
            <form onSubmit={handleAddVehicle} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Nom</label>
                <input 
                  type="text" 
                  placeholder="Nom du véhicule" 
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                  value={newVehicle.name} 
                  onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Type</label>
                <div className="relative flex items-center">
                  <select 
                    className="w-full p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit appearance-none dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] cursor-pointer focus:border-[#2ad367]"
                    value={newVehicle.type} 
                    onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}
                  >
                    <option>Vélo électrique</option>
                    <option>Vélo Classique</option>
                    <option>Scooter électrique</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3.5 text-[#888] pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Prix (DA/h)</label>
                  <input 
                    type="number" 
                    className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                    value={newVehicle.price} 
                    onChange={(e) => setNewVehicle({...newVehicle, price: e.target.value})} 
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Autonomie</label>
                  <input 
                    type="text" 
                    className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                    value={newVehicle.autonomy} 
                    onChange={(e) => setNewVehicle({...newVehicle, autonomy: e.target.value})} 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Station</label>
                <div className="relative flex items-center">
                  <select 
                    className="w-full p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit appearance-none dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] cursor-pointer focus:border-[#2ad367]"
                    value={newVehicle.station} 
                    onChange={(e) => setNewVehicle({...newVehicle, station: e.target.value})}
                  >
                    <option>Alger Centre</option>
                    <option>Bab El Oued</option>
                    <option>Hussein Dey</option>
                    <option>Kouba</option>
                    <option>El Harrach</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3.5 text-[#888] pointer-events-none" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button 
                  type="button" 
                  className="p-[10px_20px] bg-white border border-[#eaeaea] rounded-[20px] text-sm font-medium cursor-pointer text-[#333] dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="p-[10px_24px] bg-[#2ad367] border-none text-white rounded-[20px] text-sm font-semibold cursor-pointer">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MODIFIER */}
      {editVehicle && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
          <div className="bg-white w-[450px] rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold m-0 dark:text-[#e4e6eb]">Modifier le véhicule</h2>
              <button className="bg-transparent border-none text-[#888] cursor-pointer flex" onClick={() => setEditVehicle(null)}>
                <XIcon />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Nom</label>
                <input 
                  type="text" 
                  className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                  value={editVehicle.name} 
                  onChange={(e) => setEditVehicle({...editVehicle, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Type</label>
                <div className="relative flex items-center">
                  <select 
                    className="w-full p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit appearance-none dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] cursor-pointer focus:border-[#2ad367]"
                    value={editVehicle.type} 
                    onChange={(e) => setEditVehicle({...editVehicle, type: e.target.value})}
                  >
                    <option>Vélo électrique</option>
                    <option>Vélo Classique</option>
                    <option>Scooter électrique</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3.5 text-[#888] pointer-events-none" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Prix (DA/h)</label>
                  <input 
                    type="number" 
                    className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                    value={editVehicle.price} 
                    onChange={(e) => setEditVehicle({...editVehicle, price: e.target.value})} 
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Batterie (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                    value={editVehicle.battery} 
                    onChange={(e) => setEditVehicle({...editVehicle, battery: Number(e.target.value)})} 
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Autonomie</label>
                  <input 
                    type="text" 
                    className="p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] focus:border-[#2ad367]"
                    value={editVehicle.autonomy} 
                    onChange={(e) => setEditVehicle({...editVehicle, autonomy: e.target.value})} 
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Station</label>
                  <div className="relative flex items-center">
                    <select 
                      className="w-full p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit appearance-none dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] cursor-pointer focus:border-[#2ad367]"
                      value={editVehicle.station} 
                      onChange={(e) => setEditVehicle({...editVehicle, station: e.target.value})}
                    >
                      <option>Alger Centre</option>
                      <option>Bab El Oued</option>
                      <option>Hussein Dey</option>
                      <option>Kouba</option>
                      <option>El Harrach</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3.5 text-[#888] pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#555] dark:text-[#aaa]">Statut</label>
                <div className="relative flex items-center">
                  <select 
                    className="w-full p-[12px_14px] border border-[#eaeaea] rounded-lg text-sm outline-none font-inherit appearance-none dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb] cursor-pointer focus:border-[#2ad367]"
                    value={editVehicle.status} 
                    onChange={(e) => setEditVehicle({...editVehicle, status: e.target.value})}
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Loué">Loué</option>
                    <option value="Indisponible">Indisponible</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3.5 text-[#888] pointer-events-none" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button 
                  type="button" 
                  className="p-[10px_20px] bg-white border border-[#eaeaea] rounded-[20px] text-sm font-medium cursor-pointer text-[#333] dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]" 
                  onClick={() => setEditVehicle(null)}
                >
                  Annuler
                </button>
                <button type="submit" className="p-[10px_24px] bg-[#2ad367] border-none text-white rounded-[20px] text-sm font-semibold cursor-pointer">Enregistrer</button>
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
                 <strong className="text-[15px] text-[#333] dark:text-[#e4e6eb]">Véhicule ajouté</strong>
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

export default AdminVehicules;
