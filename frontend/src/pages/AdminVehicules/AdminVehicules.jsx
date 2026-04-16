import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './AdminVehicules.module.css';
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
    switch(status) {
      case 'Disponible': return <span className={`${styles.statusDropdown} ${styles.textGreen}`}>{status} <ChevronDownIcon /></span>;
      case 'Loué': return <span className={`${styles.statusDropdown} ${styles.textGray}`}>{status} <ChevronDownIcon /></span>;
      case 'Indisponible': return <span className={`${styles.statusDropdown} ${styles.textRed}`}>{status} <ChevronDownIcon /></span>;
      default: return status;
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar activePage="vehicules" />

      {/* MAIN CONTENT */}
      <main className={styles.mainContent} style={{ marginLeft: collapsed ? '72px' : '260px' }}>
        <header className={styles.header}>
          <div>
            <h1>Véhicules</h1>
            <p>Gérez les véhicules de la flotte GreenWheels.</p>
          </div>
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
            <PlusIcon /> Ajouter un véhicule
          </button>
        </header>

        {/* VEHICLE KPI CARDS */}
        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.iconGreen}`}>
              <BikeIcon />
            </div>
            <div className={styles.kpiInfo}>
              <h3>{vehicles.length}</h3>
              <p>Total</p>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.iconGreenBorder}`}>
              <BatteryIcon />
            </div>
            <div className={styles.kpiInfo}>
              <h3>{vehicles.filter(v => v.status === 'Disponible').length}</h3>
              <p>Disponibles</p>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.iconGrayBorder}`}>
              <MapPinIcon />
            </div>
            <div className={styles.kpiInfo}>
              <h3>{vehicles.filter(v => v.status === 'Loué').length}</h3>
              <p>Loués</p>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.iconRedBorder}`}>
              <EditIcon />
            </div>
            <div className={styles.kpiInfo}>
              <h3>{vehicles.filter(v => v.status === 'Indisponible').length}</h3>
              <p>Maintenance</p>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <section className={styles.toolbar}>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input 
              type="text" 
              placeholder="Rechercher un véhicule ..." 
              className={styles.searchInput} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.filterBox}>
            <button className={styles.filterBtn} onClick={() => setFilterOpen(!filterOpen)}>
              {filterValue} <ChevronDownIcon />
            </button>
            {filterOpen && (
              <div className={styles.filterDropdown}>
                <div className={`${styles.filterItem} ${styles.filterActive}`} onClick={() => {setFilterValue('Tous les status'); setFilterOpen(false);}}>
                  <span className={styles.check}>✓</span> Tous les status
                </div>
                <div className={styles.filterItem} onClick={() => {setFilterValue('Disponible'); setFilterOpen(false);}}>Disponible</div>
                <div className={styles.filterItem} onClick={() => {setFilterValue('Loué'); setFilterOpen(false);}}>Loué</div>
                <div className={styles.filterItem} onClick={() => {setFilterValue('Indisponible'); setFilterOpen(false);}}>Indisponible</div>
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
                <th>Type</th>
                <th>Prix/h</th>
                <th>Batterie</th>
                <th>Autonomie</th>
                <th>Station</th>
                <th>État</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map(v => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td className={styles.boldCell}>{v.name}</td>
                  <td>{v.type}</td>
                  <td>{v.price} DA</td>
                  <td>
                    <div className={styles.batteryCell}>
                      <div className={styles.batteryBarWrap}>
                        <div className={styles.batteryBarFill} style={{width: `${v.battery}%`}}></div>
                      </div>
                      <span className={styles.boldCell}>{v.battery}%</span>
                    </div>
                  </td>
                  <td>{v.autonomie}</td>
                  <td>{v.station}</td>
                  <td>
                    <div className={styles.statusWrap}>
                      {renderStatusBadge(v.status)}
                    </div>
                  </td>
                  <td>
                    <div className={styles.actionsBox}>
                      <button className={styles.iconBtnTable} onClick={() => setEditVehicle({...v})}><EditIcon /></button>
                      <button className={`${styles.iconBtnTable} ${styles.deleteIcon}`} onClick={() => handleDelete(v.id)}>
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

      {/* OVERLAY MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Ajouter un véhicule</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <XIcon />
              </button>
            </div>
            
            <form onSubmit={handleAddVehicle} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Nom</label>
                <input 
                  type="text" 
                  placeholder="Nom du véhicule" 
                  value={newVehicle.name} 
                  onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Type</label>
                <div className={styles.selectWrapper}>
                  <select value={newVehicle.type} onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}>
                    <option>Vélo électrique</option>
                    <option>Vélo Classique</option>
                    <option>Scooter électrique</option>
                  </select>
                  <ChevronDownIcon className={styles.selectIcon} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Prix (DA/h)</label>
                  <input type="number" value={newVehicle.price} onChange={(e) => setNewVehicle({...newVehicle, price: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Autonomie</label>
                  <input type="text" value={newVehicle.autonomy} onChange={(e) => setNewVehicle({...newVehicle, autonomy: e.target.value})} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Station</label>
                <div className={styles.selectWrapper}>
                  <select value={newVehicle.station} onChange={(e) => setNewVehicle({...newVehicle, station: e.target.value})}>
                    <option>Alger Centre</option>
                    <option>Bab El Oued</option>
                    <option>Hussein Dey</option>
                    <option>Kouba</option>
                    <option>El Harrach</option>
                  </select>
                  <ChevronDownIcon className={styles.selectIcon} />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Annuler</button>
                <button type="submit" className={styles.btnSubmit}>Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MODIFIER */}
      {editVehicle && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Modifier le véhicule</h2>
              <button className={styles.closeBtn} onClick={() => setEditVehicle(null)}>
                <XIcon />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Nom</label>
                <input type="text" value={editVehicle.name} onChange={(e) => setEditVehicle({...editVehicle, name: e.target.value})} required />
              </div>
              <div className={styles.formGroup}>
                <label>Type</label>
                <div className={styles.selectWrapper}>
                  <select value={editVehicle.type} onChange={(e) => setEditVehicle({...editVehicle, type: e.target.value})}>
                    <option>Vélo électrique</option>
                    <option>Vélo Classique</option>
                    <option>Scooter électrique</option>
                  </select>
                  <ChevronDownIcon className={styles.selectIcon} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Prix (DA/h)</label>
                  <input type="number" value={editVehicle.price} onChange={(e) => setEditVehicle({...editVehicle, price: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Batterie (%)</label>
                  <input type="number" min="0" max="100" value={editVehicle.battery} onChange={(e) => setEditVehicle({...editVehicle, battery: Number(e.target.value)})} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Autonomie</label>
                  <input type="text" value={editVehicle.autonomy} onChange={(e) => setEditVehicle({...editVehicle, autonomy: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Station</label>
                  <div className={styles.selectWrapper}>
                    <select value={editVehicle.station} onChange={(e) => setEditVehicle({...editVehicle, station: e.target.value})}>
                      <option>Alger Centre</option>
                      <option>Bab El Oued</option>
                      <option>Hussein Dey</option>
                      <option>Kouba</option>
                      <option>El Harrach</option>
                    </select>
                    <ChevronDownIcon className={styles.selectIcon} />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Statut</label>
                <div className={styles.selectWrapper}>
                  <select value={editVehicle.status} onChange={(e) => setEditVehicle({...editVehicle, status: e.target.value})}>
                    <option value="Disponible">Disponible</option>
                    <option value="Loué">Loué</option>
                    <option value="Indisponible">Indisponible</option>
                  </select>
                  <ChevronDownIcon className={styles.selectIcon} />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnCancel} onClick={() => setEditVehicle(null)}>Annuler</button>
                <button type="submit" className={styles.btnSubmit}>Enregistrer</button>
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
                 <strong>Véhicule ajouté</strong>
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

export default AdminVehicules;
