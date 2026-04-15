import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminStations.module.css';
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
      return <span className={`${styles.statusBadge} ${styles.bgGreen}`}>{status}</span>;
    }
    return <span className={`${styles.statusBadge} ${styles.bgGray}`}>{status}</span>;
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar activePage="stations" />

      {/* MAIN CONTENT */}
      <main className={styles.mainContent} style={{ marginLeft: collapsed ? '72px' : '260px' }}>
        <header className={styles.header}>
          <div>
            <h1>Stations</h1>
            <p>Gérez les stations de vélos.</p>
          </div>
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
            <PlusIcon /> Ajouter une station
          </button>
        </header>

        {/* TOOLBAR */}
        <section className={styles.toolbar}>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input 
              type="text" 
              placeholder="Rechercher une station ..." 
              className={styles.searchInput} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* TABLE */}
        <section className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Vélos</th>
                <th>Emplacements</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td className={styles.boldCell}>{s.name}</td>
                  <td>{s.address}</td>
                  <td className={styles.boldCell}>{s.velos}</td>
                  <td>{s.emplacements}</td>
                  <td>{renderStatusBadge(s.status)}</td>
                  <td>
                    <div className={styles.actionsBox}>
                      <button className={styles.iconBtnTable} onClick={() => setEditStation({...s})}><EditIcon /></button>
                      <button className={`${styles.iconBtnTable} ${styles.deleteIcon}`} onClick={() => handleDelete(s.id)}>
                        <TrashIcon />
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
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Ajouter une station</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <XIcon />
              </button>
            </div>
            
            <form onSubmit={handleAddStation} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Nom</label>
                <input 
                  type="text" 
                  placeholder="Nom de la station" 
                  value={newStation.name} 
                  onChange={(e) => setNewStation({...newStation, name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Adresse</label>
                <input 
                  type="text" 
                  placeholder="Adresse" 
                  value={newStation.address} 
                  onChange={(e) => setNewStation({...newStation, address: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Latitude</label>
                  <input type="text" value={newStation.latitude} onChange={(e) => setNewStation({...newStation, latitude: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Longitude</label>
                  <input type="text" value={newStation.longitude} onChange={(e) => setNewStation({...newStation, longitude: e.target.value})} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Emplacements</label>
                <input type="number" placeholder="20" value={newStation.emplacements} onChange={(e) => setNewStation({...newStation, emplacements: e.target.value})} />
              </div>

              <div className={styles.modalFooter}>
                <button type="submit" className={styles.btnSubmitFull}>Ajouter la station</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MODIFIER */}
      {editStation && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Modifier la station</h2>
              <button className={styles.closeBtn} onClick={() => setEditStation(null)}>
                <XIcon />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Nom</label>
                <input type="text" value={editStation.name} onChange={(e) => setEditStation({...editStation, name: e.target.value})} required />
              </div>
              <div className={styles.formGroup}>
                <label>Adresse</label>
                <input type="text" value={editStation.address} onChange={(e) => setEditStation({...editStation, address: e.target.value})} required />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Vélos</label>
                  <input type="number" value={editStation.velos} onChange={(e) => setEditStation({...editStation, velos: Number(e.target.value)})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Emplacements</label>
                  <input type="number" value={editStation.emplacements} onChange={(e) => setEditStation({...editStation, emplacements: Number(e.target.value)})} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Statut</label>
                <select className={styles.statusSelect} value={editStation.status} onChange={(e) => setEditStation({...editStation, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className={styles.modalFooter}>
                <button type="submit" className={styles.btnSubmitFull}>Enregistrer les modifications</button>
              </div>
            </form>
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
               <div className={styles.toastHeader}>
                 <strong>Station ajoutée</strong>
                 <button onClick={() => setToast(null)}><XIcon /></button>
               </div>
               <p>{toast.text}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStations;
