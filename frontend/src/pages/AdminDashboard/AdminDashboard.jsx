import React from 'react';
import styles from './AdminDashboard.module.css';
import { 
  CarIcon, ActivityIcon, ArrowUpRightIcon, CheckIcon, XIcon, ClockIcon,
  BikeIcon, UsersIcon, MapPinIcon, CalendarIcon, CreditCardIcon
} from './Icons';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';

const AdminDashboard = () => {
  const [collapsed] = useSidebar();
  
  return (
    <div className={styles.adminContainer}>
      <AdminSidebar activePage="dashboard" />

      {/* MAIN CONTENT */}
      <main className={styles.mainContent} style={{ marginLeft: collapsed ? '72px' : '260px' }}>
        <header className={styles.header}>
          <h1>Tableau de bord</h1>
          <p>Vue d'ensemble de la plateforme GreenWheels.</p>
        </header>

        {/* KPI CARDS */}
        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiInfo}>
              <h3>Véhicules totaux</h3>
              <p className={styles.kpiValue}>156</p>
              <span className={styles.kpiSubtitle}>+12 ce mois</span>
            </div>
            <div className={`${styles.kpiIcon} ${styles.iconGreen}`}>
              <BikeIcon />
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiInfo}>
              <h3>Véhicules disponibles</h3>
              <p className={styles.kpiValue}>98</p>
              <span className={styles.kpiSubtitle}>+5 actuellement</span>
            </div>
            <div className={`${styles.kpiIcon} ${styles.iconLight}`}>
              <ActivityIcon />
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiInfo}>
              <h3>Locations actives</h3>
              <p className={styles.kpiValue}>78</p>
              <span className={styles.kpiSubtitle}>+5 en cours</span>
            </div>
            <div className={`${styles.kpiIcon} ${styles.iconLight}`}>
              <CalendarIcon />
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiInfo}>
              <h3>Utilisateurs</h3>
              <p className={styles.kpiValue}>2,430</p>
              <span className={styles.kpiSubtitle}>+80 inscrits</span>
            </div>
            <div className={`${styles.kpiIcon} ${styles.iconLight}`}>
              <UsersIcon />
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiInfo}>
              <h3>Revenus du mois</h3>
              <p className={styles.kpiValue}>850K DA</p>
              <span className={styles.kpiSubtitle}>+15% vs mois dernier</span>
            </div>
            <div className={`${styles.kpiIcon} ${styles.iconLight}`}>
              <CreditCardIcon />
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiInfo}>
              <h3>Taux d'utilisation</h3>
              <p className={styles.kpiValue}>72 %</p>
              <span className={styles.kpiSubtitle}>-5% cette semaine</span>
            </div>
            <div className={`${styles.kpiIcon} ${styles.iconLight}`}>
              <ArrowUpRightIcon />
            </div>
          </div>
        </section>

        {/* CHARTS (PLACEHOLDERS) */}
        <section className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <h3>Revenus mensuels</h3>
            <p>Évolution des revenus sur 6 mois</p>
            <div className={styles.chartArea}>
              {/* Fake SVG Line Chart */}
              <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M0 160 Q 50 150, 100 130 T 200 120 T 300 70 T 400 50 L 400 200 L 0 200 Z" fill="#e8f8f0" />
                <path d="M0 160 Q 50 150, 100 130 T 200 120 T 300 70 T 400 50" fill="none" stroke="#2ad367" strokeWidth="4" />
                <circle cx="150" cy="125" r="4" fill="#2ad367" />
                <rect x="120" y="140" width="60" height="25" rx="4" fill="white" stroke="#eaeaea" />
                <text x="150" y="156" fontSize="10" fill="#666" textAnchor="middle">Mai: 140K DA</text>
              </svg>
              <div className={styles.chartLabels}>
                <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Jun</span><span>Jul</span>
              </div>
            </div>
          </div>

          <div className={styles.chartCard}>
            <h3>Revenus cette semaine</h3>
            <p>Revenus quotidiens en DA</p>
            <div className={styles.chartAreaBars}>
              <div className={styles.barItem}><div className={styles.bar} style={{height: "60%"}}></div><span>Lun</span></div>
              <div className={styles.barItem}><div className={styles.bar} style={{height: "50%"}}></div><span>Mar</span></div>
              <div className={styles.barItem}><div className={styles.bar} style={{height: "80%"}}></div><span>Mer</span></div>
              <div className={styles.barItem}><div className={styles.bar} style={{height: "90%"}}></div><span>Jeu</span></div>
              <div className={styles.barItem}><div className={styles.bar} style={{height: "55%"}}></div><span>Ven</span></div>
              <div className={styles.barItem}><div className={styles.bar} style={{height: "45%"}}></div><span>Sam</span></div>
              <div className={styles.barItem}><div className={styles.bar} style={{height: "40%"}}></div><span>Dim</span></div>
            </div>
          </div>
        </section>

        {/* DETAILS GRID */}
        <section className={styles.detailsGrid}>
          <div className={styles.detailsCard}>
            <h3>État des véhicules</h3>
            <p>Répartition par statut</p>
            <div className={styles.statusList}>
              <div className={styles.statusRow}>
                <span className={`${styles.badge} ${styles.badgeGreen}`}>Disponible</span>
                <strong>98 <span className={styles.faded}>véhicules</span></strong>
              </div>
              <div className={styles.statusRow}>
                <span className={`${styles.badge} ${styles.badgeGray}`}>Loué</span>
                <strong>45 <span className={styles.faded}>véhicules</span></strong>
              </div>
              <div className={styles.statusRow}>
                <span className={`${styles.badge} ${styles.badgeRed}`}>Indisponible</span>
                <strong>13 <span className={styles.faded}>véhicules</span></strong>
              </div>
              <div className={styles.progressContainer}>
                <div className={styles.progressLabels}>
                  <span>Total Flotte</span>
                  <strong>156 véhicules</strong>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressGreen} style={{width: "60%"}}></div>
                  <div className={styles.progressGray} style={{width: "30%"}}></div>
                  <div className={styles.progressRed} style={{width: "10%"}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailsCard}>
            <h3>Types de véhicules</h3>
            <p>Distribution de la flotte</p>
            <div className={styles.donutArea}>
              <svg width="120" height="120" viewBox="0 0 36 36" className={styles.donut}>
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#b6d9e8" strokeWidth="6" strokeDasharray="45 55" strokeDashoffset="25"></circle>
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#ab90ed" strokeWidth="6" strokeDasharray="23 77" strokeDashoffset="-20"></circle>
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#2ad367" strokeWidth="6" strokeDasharray="32 68" strokeDashoffset="57"></circle>
              </svg>
            </div>
            <div className={styles.legendList}>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{backgroundColor: "#b6d9e8"}}></span>
                <span>Vélo électrique</span>
                <strong>45%</strong>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{backgroundColor: "#2ad367"}}></span>
                <span>Vélo classique</span>
                <strong>32%</strong>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{backgroundColor: "#ab90ed"}}></span>
                <span>Scooter</span>
                <strong>23%</strong>
              </div>
            </div>
          </div>

          <div className={styles.detailsCard}>
            <h3>Top Stations</h3>
            <p>Les plus actives</p>
            <div className={styles.stationsList}>
              <div className={styles.stationItem}>
                <div className={styles.stationLabel}><span>#1</span> Alger Centre</div>
                <div className={styles.stationBar}><div style={{width: "90%", backgroundColor: "#2ad367"}}></div></div>
              </div>
              <div className={styles.stationItem}>
                <div className={styles.stationLabel}><span>#2</span> Bab El Oued</div>
                <div className={styles.stationBar}><div style={{width: "70%", backgroundColor: "#2ad367"}}></div></div>
              </div>
              <div className={styles.stationItem}>
                <div className={styles.stationLabel}><span>#3</span> Kouba</div>
                <div className={styles.stationBar}><div style={{width: "60%", backgroundColor: "#2ad367"}}></div></div>
              </div>
              <div className={styles.stationItem}>
                <div className={styles.stationLabel}><span>#4</span> Hussein Dey</div>
                <div className={styles.stationBar}><div style={{width: "45%", backgroundColor: "#d0d0d0"}}></div></div>
              </div>
              <div className={styles.stationItem}>
                <div className={styles.stationLabel}><span>#5</span> El Harrach</div>
                <div className={styles.stationBar}><div style={{width: "30%", backgroundColor: "#d0d0d0"}}></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT ACTIVITIES */}
        <section className={styles.recentSection}>
          <h3>Locations récentes</h3>
          <p>Dernières activités de location</p>
          
          <div className={styles.recentList}>
            <div className={styles.recentItem}>
              <div className={`${styles.iconWrap} ${styles.iconGreen}`}>
                <ClockIcon />
              </div>
              <div className={styles.recentDetails}>
                <h4>Karim B <span>— Vélo Urbain Pro</span></h4>
                <p><MapPinIcon /> Alger Centre — il y a 5 min</p>
              </div>
              <div className={styles.recentStatus}>
                <strong>400 DA</strong>
                <span className={`${styles.badge} ${styles.badgeGreen}`}>En cours</span>
              </div>
            </div>

            <div className={styles.recentItem}>
              <div className={`${styles.iconWrap} ${styles.iconGreen}`}>
                <ClockIcon />
              </div>
              <div className={styles.recentDetails}>
                <h4>Sarah M <span>— Scooter City</span></h4>
                <p><MapPinIcon /> Bab El Oued — il y a 15 min</p>
              </div>
              <div className={styles.recentStatus}>
                <strong>1,500 DA</strong>
                <span className={`${styles.badge} ${styles.badgeGreen}`}>En cours</span>
              </div>
            </div>

            <div className={styles.recentItem}>
              <div className={`${styles.iconWrap} ${styles.iconGray}`}>
                <CheckIcon />
              </div>
              <div className={styles.recentDetails}>
                <h4>Ahmed K <span>— E-Bike Sport</span></h4>
                <p><MapPinIcon /> Kouba — il y a 2h</p>
              </div>
              <div className={styles.recentStatus}>
                <strong>800 DA</strong>
                <span className={`${styles.badge} ${styles.badgeGrayBorder}`}>Terminée</span>
              </div>
            </div>

            <div className={styles.recentItem}>
              <div className={`${styles.iconWrap} ${styles.iconRed}`}>
                <XIcon />
              </div>
              <div className={styles.recentDetails}>
                <h4>Amina R <span>— Vélo Classic</span></h4>
                <p><MapPinIcon /> Hussein Dey — il y a 45 min</p>
              </div>
              <div className={styles.recentStatus}>
                <strong>280 DA</strong>
                <span className={`${styles.badge} ${styles.badgeRedSolid}`}>Annulée</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;
