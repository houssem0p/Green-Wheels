import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
  DashboardIcon, BikeIcon, UsersIcon, MapPinIcon,
  CalendarIcon, CreditCardIcon, SettingsIcon, MoonIcon, ChevronLeftIcon, SunIcon
} from '../../pages/AdminDashboard/Icons';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useSidebar } from '../../hooks/useSidebar';
import styles from './AdminSidebar.module.css';

const AdminSidebar = ({ activePage }) => {
  const [theme, toggleTheme] = useDarkMode();
  const [collapsed, toggleSidebar] = useSidebar();

  const navItems = [
    { to: '/admin', icon: <DashboardIcon />, label: 'Dashboard', key: 'dashboard' },
    { to: '/admin/vehicules', icon: <BikeIcon />, label: 'Véhicules', key: 'vehicules' },
    { to: '/admin/stations', icon: <MapPinIcon />, label: 'Stations', key: 'stations' },
    { to: '/admin/utilisateurs', icon: <UsersIcon />, label: 'Utilisateurs', key: 'utilisateurs' },
    { to: '/admin/reservations', icon: <CalendarIcon />, label: 'Réservations', key: 'reservations' },
    { to: '/admin/paiements', icon: <CreditCardIcon />, label: 'Paiements', key: 'paiements' },
    { to: '/admin/maintenance', icon: <SettingsIcon />, label: 'Maintenance', key: 'maintenance' },
  ];

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="GreenWheels Logo" className={styles.logo} />
        {!collapsed && <span className={styles.logoText}>Admin</span>}
      </div>

      <nav className={styles.navMenu}>
        {navItems.map(item => (
          <Link
            key={item.key}
            to={item.to}
            className={`${styles.navItem} ${activePage === item.key ? styles.active : ''}`}
            title={collapsed ? item.label : ''}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className={styles.sidebarBottom}>
        <button className={styles.actionBtn} onClick={toggleTheme} title={collapsed ? (theme === 'light' ? 'Mode sombre' : 'Mode clair') : ''}>
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          {!collapsed && <span>{theme === 'light' ? 'Mode sombre' : 'Mode clair'}</span>}
        </button>
        <button className={`${styles.actionBtn} ${styles.collapseBtn}`} onClick={toggleSidebar} title={collapsed ? 'Expandre' : 'Réduire'}>
          <span className={`${styles.chevronIcon} ${collapsed ? styles.chevronRotated : ''}`}>
            <ChevronLeftIcon />
          </span>
          {!collapsed && <span>Réduire</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
