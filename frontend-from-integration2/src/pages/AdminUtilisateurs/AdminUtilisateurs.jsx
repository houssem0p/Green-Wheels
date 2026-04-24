import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  SearchIcon, ChevronDownIcon, EyeIcon, BanIcon, XIcon
} from '../AdminDashboard/Icons';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';

const initialUsers = [
  { id: 'U001', name: 'Karim Benali', role: 'User', status: 'Actif', telephone: '+213 555 111 111', inscription: '2025-10-12', locations: '4 locations' },
  { id: 'U002', name: 'Sarah Meziane', role: 'Admin', status: 'Actif', telephone: '+213 555 222 222', inscription: '2025-01-05', locations: '0 locations' },
  { id: 'U003', name: 'Ahmed Khelifi', role: 'User', status: 'Suspendu', telephone: '+213 555 333 333', inscription: '2025-11-20', locations: '8 locations' },
  { id: 'U004', name: 'Amina Rahal', role: 'Technician', status: 'Actif', telephone: '+213 555 444 444', inscription: '2025-06-15', locations: '1 location' },
  { id: 'U005', name: 'Yacine Larbi', role: 'Manager', status: 'Actif', telephone: '+213 555 555 555', inscription: '2025-02-10', locations: '0 locations' },
  { id: 'U006', name: 'Kenza Atmani', role: 'User', status: 'Actif', telephone: '+213 555 666 666', inscription: '2026-03-01', locations: '15 locations' },
];

const AdminUtilisateurs = () => {
  const [collapsed] = useSidebar();
  const [users, setUsers] = useState(initialUsers);
  const [toast, setToast] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterRole, setFilterRole] = useState('Tous les rôles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'Tous les rôles' || u.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleToggleStatus = (id) => {
    let newStatus = '';
    setUsers(users.map(u => {
      if (u.id === id) {
        newStatus = u.status === 'Actif' ? 'Suspendu' : 'Actif';
        return { ...u, status: newStatus };
      }
      return u;
    }));
    setToast({ type: 'success', text: 'Statu utilisateur mis à jour', title: null });
  };

  const handleChangeRole = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    setToast({ type: 'success', text: 'Rôle utilisateur mis à jour', title: null });
  };

  const renderStatusBadge = (status) => {
    if (status === 'Actif') {
      return <span className="inline-flex items-center justify-center p-[4px_16px] rounded-[16px] text-xs font-medium bg-[#e8f8f0] text-[#2ad367]">{status}</span>;
    }
    return <span className="inline-flex items-center justify-center p-[4px_16px] rounded-[16px] text-xs font-medium bg-[#fadbd8] text-[#e74c3c]">{status}</span>;
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#f7f9fc] text-[#333] dark:bg-[#121212] dark:text-[#e4e6eb]">
      <AdminSidebar activePage="utilisateurs" />

      {/* MAIN CONTENT */}
      <main 
        className="flex-1 p-[32px_40px] max-w-[1400px] transition-[margin-left] duration-300 ease-in-out dark:bg-[#121212]" 
        style={{ marginLeft: collapsed ? '72px' : '260px' }}
      >
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">Utilisateurs</h1>
            <p className="text-[#666] m-0 text-[15px] dark:text-[#aaa]">Gérez les utilisateurs de la plateforme.</p>
          </div>
        </header>

        {/* KPI CARDS (NO ICONS) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white border border-[#eaeaea] rounded-xl p-6 flex flex-col items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.01)] text-center dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <h3 className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">{users.length}</h3>
            <p className="text-sm text-[#666] m-0 font-medium dark:text-[#aaa]">Total</p>
          </div>
          <div className="bg-white border border-[#eaeaea] rounded-xl p-6 flex flex-col items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.01)] text-center dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <h3 className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">{users.filter(u => u.status === 'Actif').length}</h3>
            <p className="text-sm text-[#666] m-0 font-medium dark:text-[#aaa]">Actifs</p>
          </div>
          <div className="bg-white border border-[#eaeaea] rounded-xl p-6 flex flex-col items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.01)] text-center dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <h3 className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">{users.filter(u => u.status === 'Suspendu').length}</h3>
            <p className="text-sm text-[#666] m-0 font-medium dark:text-[#aaa]">Suspendus</p>
          </div>
          <div className="bg-white border border-[#eaeaea] rounded-xl p-6 flex flex-col items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.01)] text-center dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <h3 className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">43</h3>
            <p className="text-sm text-[#666] m-0 font-medium dark:text-[#aaa]">Locations totales</p>
          </div>
        </section>

        {/* TOOLBAR */}
        <section className="flex gap-4 mb-6">
          <div className="flex-1 relative flex items-center">
            <SearchIcon className="absolute left-4 text-[#999]" />
            <input 
              type="text" 
              placeholder="Rechercher un utilisateur ..." 
              className="w-full p-[12px_16px_12px_48px] border border-[#eaeaea] rounded-lg text-sm outline-none transition-colors focus:border-[#2ad367] dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center gap-2 p-[12px_20px] bg-white border border-[#eaeaea] rounded-lg text-sm text-[#333] cursor-pointer dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]" 
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {filterRole} <ChevronDownIcon />
            </button>
            {filterOpen && (
              <div className="absolute top-[110%] right-0 bg-white border border-[#eaeaea] rounded-xl w-[220px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 z-10 dark:bg-[#1a1a1a] dark:border-[#333]">
                <div 
                  className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterRole === 'Tous les rôles' ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`} 
                  onClick={() => {setFilterRole('Tous les rôles'); setFilterOpen(false);}}
                >
                  <span className="text-[#2ad367] mr-2 font-bold w-3.5 inline-block">{filterRole === 'Tous les rôles' ? '✓' : ''}</span> Tous les rôles
                </div>
                <div 
                  className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterRole === 'User' ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`} 
                  onClick={() => {setFilterRole('User'); setFilterOpen(false);}}
                >
                  <span className="text-[#2ad367] mr-2 font-bold w-3.5 inline-block">{filterRole === 'User' ? '✓' : ''}</span>User
                </div>
                <div 
                  className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterRole === 'Admin' ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`} 
                  onClick={() => {setFilterRole('Admin'); setFilterOpen(false);}}
                >
                  <span className="text-[#2ad367] mr-2 font-bold w-3.5 inline-block">{filterRole === 'Admin' ? '✓' : ''}</span>Admin
                </div>
                <div 
                  className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterRole === 'Manager' ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`} 
                  onClick={() => {setFilterRole('Manager'); setFilterOpen(false);}}
                >
                  <span className="text-[#2ad367] mr-2 font-bold w-3.5 inline-block">{filterRole === 'Manager' ? '✓' : ''}</span>Manager
                </div>
                <div 
                  className={`p-[10px_16px] text-sm text-[#333] cursor-pointer rounded-lg flex items-center hover:bg-[#f5f5f5] dark:text-[#e4e6eb] dark:hover:bg-[#2b2b2b] ${filterRole === 'Technician' ? 'bg-[#e8f8f0] dark:bg-[#2b2b2b]' : ''}`} 
                  onClick={() => {setFilterRole('Technician'); setFilterOpen(false);}}
                >
                  <span className="text-[#2ad367] mr-2 font-bold w-3.5 inline-block">{filterRole === 'Technician' ? '✓' : ''}</span>Technician
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
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Rôle</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Statut</th>
                <th className="p-[16px_20px] text-[13px] font-medium text-[#888]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id} className="border-b border-[#eaeaea] dark:border-[#2b2b2b]">
                  <td className="p-[16px_20px] text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{u.id}</td>
                  <td className="p-[16px_20px] text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{u.name}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">
                    <div className="inline-block">
                      <select 
                        className='p-[5px_28px_5px_12px] border border-[#d0d0d0] rounded-[20px] text-[13px] font-medium cursor-pointer bg-white bg-[url("data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23888\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"%3E%3Cpolyline points=\"6 9 12 15 18 9\"%3E%3C/polyline%3E%3C/svg%3E")] bg-no-repeat bg-[right_10px_center] text-[#555] appearance-none outline-none transition-colors font-inherit hover:border-[#2ad367] focus:border-[#2ad367] dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#e4e6eb]'
                        value={u.role} 
                        onChange={(e) => handleChangeRole(u.id, e.target.value)}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Technician">Technician</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">{renderStatusBadge(u.status)}</td>
                  <td className="p-[16px_20px] text-sm text-[#555] dark:text-[#aaa]">
                    <div className="flex gap-3">
                      <button 
                        className="bg-transparent border-none w-6 h-6 flex items-center justify-center text-[#666] cursor-pointer transition-colors p-0 hover:text-[#333] dark:text-[#aaa] dark:hover:text-[#e4e6eb]" 
                        onClick={() => setSelectedUser(u)}
                      >
                        <EyeIcon className="w-[18px] h-[18px]" />
                      </button>
                      <button 
                        className="bg-transparent border-none w-6 h-6 flex items-center justify-center text-[#666] cursor-pointer transition-colors p-0 hover:text-[#e74c3c] dark:text-[#aaa]" 
                        onClick={() => handleToggleStatus(u.id)}
                      >
                        <BanIcon className="w-[18px] h-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* MODAL PROFIL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
          <div className="bg-white w-[450px] rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] animate-in zoom-in-95 duration-200 dark:bg-[#1a1a1a] dark:border-[#2b2b2b] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold m-0 text-[#111] dark:text-[#e4e6eb]">Profil de {selectedUser.name}</h2>
              <button className="bg-transparent border-none text-[#888] cursor-pointer flex p-0" onClick={() => setSelectedUser(null)}>
                <XIcon />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-[24px_16px]">
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] text-[#888] font-medium dark:text-[#888]">Nom</span>
                <span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedUser.name}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] text-[#888] font-medium dark:text-[#888]">Téléphone</span>
                <span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedUser.telephone}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] text-[#888] font-medium dark:text-[#888]">Rôle</span>
                <span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedUser.role}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] text-[#888] font-medium dark:text-[#888]">Inscription</span>
                <span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedUser.inscription}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] text-[#888] font-medium dark:text-[#888]">Locations</span>
                <span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedUser.locations}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] text-[#888] font-medium dark:text-[#888]">Statu</span>
                <span className="text-sm text-[#333] font-semibold dark:text-[#e4e6eb]">{selectedUser.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATIONS */}
      {toast && (
        <div className={`fixed right-6 z-[1000] animate-in fade-in slide-in-from-right duration-300 ${toast.type === 'error' ? 'bottom-6 left-1/2 -translate-x-1/2 right-auto ml-[130px] animate-in slide-in-from-bottom duration-300' : 'bottom-6'}`}>
          {toast.type === 'error' ? (
            <div className="bg-[#e74c3c] text-white p-[12px_24px] rounded-lg flex items-center gap-4 font-medium text-sm">
               <span>{toast.text}</span>
               <button className="bg-transparent border-none text-white opacity-80 cursor-pointer flex hover:opacity-100" onClick={() => setToast(null)}><XIcon /></button>
            </div>
          ) : (
            <div className="bg-white border border-[#eaeaea] rounded-lg p-[16px_20px] w-[300px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:bg-[#1a1a1a] dark:border-[#333]">
               {toast.title !== null && (
                 <div className="flex justify-between items-center mb-1">
                   <strong className="text-[15px] text-[#333] dark:text-[#e4e6eb]">{toast.title || 'Succès'}</strong>
                   <button className="bg-transparent border-none text-[#999] cursor-pointer p-0 h-[18px]" onClick={() => setToast(null)}><XIcon className="w-4 h-4" /></button>
                 </div>
               )}
               {toast.title === null ? (
                 <div className="flex justify-between items-center gap-4 -m-[6px_-4px]">
                   <span className="text-sm font-semibold text-[#333] dark:text-[#e4e6eb]">{toast.text}</span>
                   <button className="bg-transparent border-none text-[#999] cursor-pointer p-0 flex" onClick={() => setToast(null)}><XIcon className="w-4 h-4" /></button>
                 </div>
               ) : (
                 <p className="m-0 text-[13px] text-[#666] dark:text-[#aaa]">{toast.text}</p>
               )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUtilisateurs;
