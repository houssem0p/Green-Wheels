import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminUtilisateurs.module.css';
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
      return <span className={`${styles.statusBadge} ${styles.bgGreen}`}>{status}</span>;
    }
    return <span className={`${styles.statusBadge} ${styles.bgRed}`}>{status}</span>;
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar activePage="utilisateurs" />

      {/* MAIN CONTENT */}
      <main className={styles.mainContent} style={{ marginLeft: collapsed ? '72px' : '260px' }}>
        <header className={styles.header}>
          <div>
            <h1>Utilisateurs</h1>
            <p>Gérez les utilisateurs de la plateforme.</p>
          </div>
        </header>

        {/* KPI CARDS (NO ICONS) */}
        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <h3>{users.length}</h3>
            <p>Total</p>
          </div>
          <div className={styles.kpiCard}>
            <h3>{users.filter(u => u.status === 'Actif').length}</h3>
            <p>Actifs</p>
          </div>
          <div className={styles.kpiCard}>
            <h3>{users.filter(u => u.status === 'Suspendu').length}</h3>
            <p>Suspendus</p>
          </div>
          <div className={styles.kpiCard}>
            <h3>43</h3>
            <p>Locations totales</p>
          </div>
        </section>

        {/* TOOLBAR */}
        <section className={styles.toolbar}>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input 
              type="text" 
              placeholder="Rechercher un utilisateur ..." 
              className={styles.searchInput} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.filterBox}>
            <button className={styles.filterBtn} onClick={() => setFilterOpen(!filterOpen)}>
              {filterRole} <ChevronDownIcon />
            </button>
            {filterOpen && (
              <div className={styles.filterDropdown}>
                <div className={`${styles.filterItem} ${filterRole === 'Tous les rôles' ? styles.filterActive : ''}`} onClick={() => {setFilterRole('Tous les rôles'); setFilterOpen(false);}}>
                  <span className={styles.check}>{filterRole === 'Tous les rôles' ? '✓' : ''}</span> Tous les rôles
                </div>
                <div className={`${styles.filterItem} ${filterRole === 'User' ? styles.filterActive : ''}`} onClick={() => {setFilterRole('User'); setFilterOpen(false);}}><span className={styles.check}>{filterRole === 'User' ? '✓' : ''}</span>User</div>
                <div className={`${styles.filterItem} ${filterRole === 'Admin' ? styles.filterActive : ''}`} onClick={() => {setFilterRole('Admin'); setFilterOpen(false);}}><span className={styles.check}>{filterRole === 'Admin' ? '✓' : ''}</span>Admin</div>
                <div className={`${styles.filterItem} ${filterRole === 'Manager' ? styles.filterActive : ''}`} onClick={() => {setFilterRole('Manager'); setFilterOpen(false);}}><span className={styles.check}>{filterRole === 'Manager' ? '✓' : ''}</span>Manager</div>
                <div className={`${styles.filterItem} ${filterRole === 'Technician' ? styles.filterActive : ''}`} onClick={() => {setFilterRole('Technician'); setFilterOpen(false);}}><span className={styles.check}>{filterRole === 'Technician' ? '✓' : ''}</span>Technician</div>
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
                <th>Nom</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td className={styles.boldCell}>{u.id}</td>
                  <td className={styles.boldCell}>{u.name}</td>
                  <td>
                    <div className={styles.roleSelectWrapper}>
                      <select 
                        className={styles.roleSelect} 
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
                  <td>{renderStatusBadge(u.status)}</td>
                  <td>
                    <div className={styles.actionsBox}>
                      <button className={styles.iconBtnTable} onClick={() => setSelectedUser(u)}>
                        <EyeIcon />
                      </button>
                      <button className={`${styles.iconBtnTable} ${styles.deleteIcon}`} onClick={() => handleToggleStatus(u.id)}>
                        <BanIcon />
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
        <div className={styles.modalOverlay}>
          <div className={styles.modalContentProfile}>
            <div className={styles.modalHeader}>
              <h2>Profil de {selectedUser.name}</h2>
              <button className={styles.closeBtn} onClick={() => setSelectedUser(null)}>
                <XIcon />
              </button>
            </div>
            
            <div className={styles.profileGrid}>
              <div className={styles.profileField}>
                <span className={styles.fieldLabel}>Nom</span>
                <span className={styles.fieldValue}>{selectedUser.name}</span>
              </div>
              <div className={styles.profileField}>
                <span className={styles.fieldLabel}>Téléphone</span>
                <span className={styles.fieldValue}>{selectedUser.telephone}</span>
              </div>
              <div className={styles.profileField}>
                <span className={styles.fieldLabel}>Rôle</span>
                <span className={styles.fieldValue}>{selectedUser.role}</span>
              </div>
              <div className={styles.profileField}>
                <span className={styles.fieldLabel}>Inscription</span>
                <span className={styles.fieldValue}>{selectedUser.inscription}</span>
              </div>
              <div className={styles.profileField}>
                <span className={styles.fieldLabel}>Locations</span>
                <span className={styles.fieldValue}>{selectedUser.locations}</span>
              </div>
              <div className={styles.profileField}>
                <span className={styles.fieldLabel}>Statu</span>
                <span className={styles.fieldValue}>{selectedUser.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATIONS */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'error' ? styles.toastError : styles.toastSuccess}`}>
          {toast.type === 'error' ? (
            <div className={styles.toastContent}>
               <span>{toast.text}</span>
               <button onClick={() => setToast(null)}><XIcon /></button>
            </div>
          ) : (
            <div className={styles.toastContentWhite}>
               {toast.title !== null && (
                 <div className={styles.toastHeader}>
                   <strong>{toast.title || 'Succès'}</strong>
                   <button onClick={() => setToast(null)}><XIcon /></button>
                 </div>
               )}
               {toast.title === null ? (
                 <div className={styles.toastSimpleRow}>
                   <span className={styles.toastSimpleText}>{toast.text}</span>
                   <button className={styles.toastSimpleClose} onClick={() => setToast(null)}><XIcon /></button>
                 </div>
               ) : (
                 <p>{toast.text}</p>
               )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUtilisateurs;
