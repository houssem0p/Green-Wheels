import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
  DashboardIcon, BikeIcon, UsersIcon, MapPinIcon,
  CalendarIcon, CreditCardIcon, SettingsIcon, MoonIcon, ChevronLeftIcon, SunIcon
} from '../../pages/AdminDashboard/Icons';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useSidebar } from '../../hooks/useSidebar';

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
    <aside className={`fixed top-0 left-0 bottom-0 z-[100] flex flex-col bg-white border-r border-[#eaeaea] transition-[width] duration-300 ease-in-out overflow-hidden dark:bg-[#1a1a1a] dark:border-[#2b2b2b] ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}>
      <div className="p-[20px_16px] flex items-center gap-[10px] border-b border-[#eaeaea] min-h-[72px] overflow-hidden dark:border-[#2b2b2b]">
        <img src={logo} alt="GreenWheels Logo" className="h-8 object-contain shrink-0" />
        {!collapsed && <span className="text-base font-bold text-[#2ad367] whitespace-nowrap overflow-hidden transition-opacity duration-300">Admin</span>}
      </div>

      <nav className="flex-1 p-[16px_10px] flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {navItems.map(item => (
          <Link
            key={item.key}
            to={item.to}
            className={`flex items-center gap-3 p-[11px_12px] rounded-[10px] no-underline font-medium text-sm transition-all duration-200 whitespace-nowrap overflow-hidden ${
              activePage === item.key 
                ? 'bg-[#2ad367] text-white' 
                : 'text-[#666] hover:bg-[#f5f5f5] hover:text-[#333] dark:text-[#aaa] dark:hover:bg-[#2b2b2b] dark:hover:text-white'
            }`}
            title={collapsed ? item.label : ''}
          >
            <span className="w-5 h-5 shrink-0 flex items-center justify-center">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-[12px_10px] border-t border-[#eaeaea] flex flex-col gap-1 overflow-hidden dark:border-[#2b2b2b]">
        <button 
          className="flex items-center gap-3 p-[11px_12px] bg-none border-none text-[#666] font-medium text-sm cursor-pointer rounded-[10px] text-left w-full transition-colors duration-200 whitespace-nowrap overflow-hidden hover:bg-[#f5f5f5] hover:text-[#333] dark:text-[#aaa] dark:hover:bg-[#2b2b2b] dark:hover:text-white" 
          onClick={toggleTheme} 
          title={collapsed ? (theme === 'light' ? 'Mode sombre' : 'Mode clair') : ''}
        >
          <span className="shrink-0">{theme === 'light' ? <MoonIcon /> : <SunIcon />}</span>
          {!collapsed && <span>{theme === 'light' ? 'Mode sombre' : 'Mode clair'}</span>}
        </button>
        <button 
          className="flex items-center gap-3 p-[11px_12px] bg-none border-none text-[#666] font-medium text-sm cursor-pointer rounded-[10px] text-left w-full transition-colors duration-200 whitespace-nowrap overflow-hidden hover:bg-[#f5f5f5] hover:text-[#333] dark:text-[#aaa] dark:hover:bg-[#2b2b2b] dark:hover:text-white" 
          onClick={toggleSidebar} 
          title={collapsed ? 'Expandre' : 'Réduire'}
        >
          <span className={`block transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
            <ChevronLeftIcon />
          </span>
          {!collapsed && <span>Réduire</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
