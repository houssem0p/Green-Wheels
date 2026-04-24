import React from 'react';
import { 
  ActivityIcon, ArrowUpRightIcon, CheckIcon, XIcon, ClockIcon,
  BikeIcon, UsersIcon, MapPinIcon, CalendarIcon, CreditCardIcon
} from './Icons';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useSidebar } from '../../hooks/useSidebar';

const AdminDashboard = () => {
  const [collapsed] = useSidebar();
  
  return (
    <div className="flex min-h-screen font-sans bg-[#f7f9fc] text-[#333] dark:bg-[#121212] dark:text-[#e4e6eb]">
      <AdminSidebar activePage="dashboard" />

      {/* MAIN CONTENT */}
      <main 
        className="flex-1 p-[32px_40px] max-w-[1400px] transition-[margin-left] duration-300 ease-in-out dark:bg-[#121212]" 
        style={{ marginLeft: collapsed ? '72px' : '260px' }}
      >
        <header className="mb-8">
          <h1 className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">Tableau de bord</h1>
          <p className="text-[#666] m-0 text-[15px] dark:text-[#aaa]">Vue d'ensemble de la plateforme GreenWheels.</p>
        </header>

        {/* KPI CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex justify-between items-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-[#555] m-[0_0_12px_0] dark:text-[#aaa]">Véhicules totaux</h3>
              <p className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">156</p>
              <span className="text-xs text-[#888] dark:text-[#aaa]">+12 ce mois</span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#e8f8f0] text-[#2ad367]">
              <BikeIcon />
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex justify-between items-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-[#555] m-[0_0_12px_0] dark:text-[#aaa]">Véhicules disponibles</h3>
              <p className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">98</p>
              <span className="text-xs text-[#888] dark:text-[#aaa]">+5 actuellement</span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f8f9fa] text-[#2ad367] dark:bg-[#2b2b2b] dark:text-[#aaa]">
              <ActivityIcon />
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex justify-between items-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-[#555] m-[0_0_12px_0] dark:text-[#aaa]">Locations actives</h3>
              <p className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">78</p>
              <span className="text-xs text-[#888] dark:text-[#aaa]">+5 en cours</span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f8f9fa] text-[#2ad367] dark:bg-[#2b2b2b] dark:text-[#aaa]">
              <CalendarIcon />
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex justify-between items-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-[#555] m-[0_0_12px_0] dark:text-[#aaa]">Utilisateurs</h3>
              <p className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">2,430</p>
              <span className="text-xs text-[#888] dark:text-[#aaa]">+80 inscrits</span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f8f9fa] text-[#2ad367] dark:bg-[#2b2b2b] dark:text-[#aaa]">
              <UsersIcon />
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex justify-between items-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-[#555] m-[0_0_12px_0] dark:text-[#aaa]">Revenus du mois</h3>
              <p className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">850K DA</p>
              <span className="text-xs text-[#888] dark:text-[#aaa]">+15% vs mois dernier</span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f8f9fa] text-[#2ad367] dark:bg-[#2b2b2b] dark:text-[#aaa]">
              <CreditCardIcon />
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-5 flex justify-between items-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-[#555] m-[0_0_12px_0] dark:text-[#aaa]">Taux d'utilisation</h3>
              <p className="text-[28px] font-bold text-[#111] m-[0_0_8px_0] dark:text-[#e4e6eb]">72 %</p>
              <span className="text-xs text-[#888] dark:text-[#aaa]">-5% cette semaine</span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f8f9fa] text-[#2ad367] dark:bg-[#2b2b2b] dark:text-[#aaa]">
              <ArrowUpRightIcon />
            </div>
          </div>
        </section>

        {/* CHARTS (PLACEHOLDERS) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-[#eaeaea] rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <h3 className="text-lg font-semibold m-[0_0_8px_0] dark:text-[#e4e6eb]">Revenus mensuels</h3>
            <p className="text-xs text-[#888] m-[0_0_24px_0] dark:text-[#aaa]">Évolution des revenus sur 6 mois</p>
            <div className="relative w-full">
              {/* Fake SVG Line Chart */}
              <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M0 160 Q 50 150, 100 130 T 200 120 T 300 70 T 400 50 L 400 200 L 0 200 Z" fill="#e8f8f0" />
                <path d="M0 160 Q 50 150, 100 130 T 200 120 T 300 70 T 400 50" fill="none" stroke="#2ad367" strokeWidth="4" />
                <circle cx="150" cy="125" r="4" fill="#2ad367" />
                <rect x="120" y="140" width="60" height="25" rx="4" fill="white" stroke="#eaeaea" />
                <text x="150" y="156" fontSize="10" fill="#666" textAnchor="middle">Mai: 140K DA</text>
              </svg>
              <div className="flex justify-between mt-[10px] text-xs text-[#888] p-[0_10px] dark:text-[#aaa]">
                <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Jun</span><span>Jul</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <h3 className="text-lg font-semibold m-[0_0_8px_0] dark:text-[#e4e6eb]">Revenus cette semaine</h3>
            <p className="text-xs text-[#888] m-[0_0_24px_0] dark:text-[#aaa]">Revenus quotidiens en DA</p>
            <div className="flex items-end justify-around h-[200px] pt-5 border-b border-dashed border-[#eaeaea] dark:border-[#2b2b2b]">
              <div className="flex flex-col items-center h-full justify-end w-8"><div className="w-6 bg-[#2ad367] rounded-[4px_4px_0_0] mb-3" style={{height: "60%"}}></div><span className="text-xs text-[#888]">Lun</span></div>
              <div className="flex flex-col items-center h-full justify-end w-8"><div className="w-6 bg-[#2ad367] rounded-[4px_4px_0_0] mb-3" style={{height: "50%"}}></div><span className="text-xs text-[#888]">Mar</span></div>
              <div className="flex flex-col items-center h-full justify-end w-8"><div className="w-6 bg-[#2ad367] rounded-[4px_4px_0_0] mb-3" style={{height: "80%"}}></div><span className="text-xs text-[#888]">Mer</span></div>
              <div className="flex flex-col items-center h-full justify-end w-8"><div className="w-6 bg-[#2ad367] rounded-[4px_4px_0_0] mb-3" style={{height: "90%"}}></div><span className="text-xs text-[#888]">Jeu</span></div>
              <div className="flex flex-col items-center h-full justify-end w-8"><div className="w-6 bg-[#2ad367] rounded-[4px_4px_0_0] mb-3" style={{height: "55%"}}></div><span className="text-xs text-[#888]">Ven</span></div>
              <div className="flex flex-col items-center h-full justify-end w-8"><div className="w-6 bg-[#2ad367] rounded-[4px_4px_0_0] mb-3" style={{height: "45%"}}></div><span className="text-xs text-[#888]">Sam</span></div>
              <div className="flex flex-col items-center h-full justify-end w-8"><div className="w-6 bg-[#2ad367] rounded-[4px_4px_0_0] mb-3" style={{height: "40%"}}></div><span className="text-xs text-[#888]">Dim</span></div>
            </div>
          </div>
        </section>

        {/* DETAILS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          <div className="bg-white border border-[#eaeaea] rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <h3 className="text-lg font-semibold m-[0_0_4px_0] dark:text-[#e4e6eb]">État des véhicules</h3>
            <p className="text-xs text-[#888] m-[0_0_20px_0] dark:text-[#aaa]">Répartition par statut</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="p-[4px_12px] rounded-[20px] text-xs font-semibold bg-[#e8f8f0] text-[#2ad367]">Disponible</span>
                <strong>98 <span className="text-[#aaa] font-normal text-xs ml-1">véhicules</span></strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="p-[4px_12px] rounded-[20px] text-xs font-semibold bg-[#f5f5f5] text-[#666] dark:bg-[#2b2b2b] dark:text-[#aaa]">Loué</span>
                <strong>45 <span className="text-[#aaa] font-normal text-xs ml-1">véhicules</span></strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="p-[4px_12px] rounded-[20px] text-xs font-semibold bg-[#fadbd8] text-[#e74c3c]">Indisponible</span>
                <strong>13 <span className="text-[#aaa] font-normal text-xs ml-1">véhicules</span></strong>
              </div>
              <div className="mt-6 pt-4 border-t border-[#eaeaea] dark:border-[#2b2b2b]">
                <div className="flex justify-between text-[13px] text-[#666] mb-2 dark:text-[#aaa]">
                  <span>Total Flotte</span>
                  <strong>156 véhicules</strong>
                </div>
                <div className="flex h-2 rounded-[4px] overflow-hidden gap-[2px]">
                  <div className="bg-[#2ad367]" style={{width: "60%"}}></div>
                  <div className="bg-[#d0d0d0] dark:bg-[#2b2b2b]" style={{width: "30%"}}></div>
                  <div className="bg-[#e74c3c]" style={{width: "10%"}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <h3 className="text-lg font-semibold m-[0_0_4px_0] dark:text-[#e4e6eb]">Types de véhicules</h3>
            <p className="text-xs text-[#888] m-[0_0_20px_0] dark:text-[#aaa]">Distribution de la flotte</p>
            <div className="flex justify-center items-center mb-6">
              <svg width="120" height="120" viewBox="0 0 36 36" className="transform -rotate-90">
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#b6d9e8" strokeWidth="6" strokeDasharray="45 55" strokeDashoffset="25"></circle>
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#ab90ed" strokeWidth="6" strokeDasharray="23 77" strokeDashoffset="-20"></circle>
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#2ad367" strokeWidth="6" strokeDasharray="32 68" strokeDashoffset="57"></circle>
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center text-[13px] text-[#555] dark:text-[#aaa]">
                <span className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: "#b6d9e8"}}></span>
                <span>Vélo électrique</span>
                <strong className="ml-auto">45%</strong>
              </div>
              <div className="flex items-center text-[13px] text-[#555] dark:text-[#aaa]">
                <span className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: "#2ad367"}}></span>
                <span>Vélo classique</span>
                <strong className="ml-auto">32%</strong>
              </div>
              <div className="flex items-center text-[13px] text-[#555] dark:text-[#aaa]">
                <span className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: "#ab90ed"}}></span>
                <span>Scooter</span>
                <strong className="ml-auto">23%</strong>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
            <h3 className="text-lg font-semibold m-[0_0_4px_0] dark:text-[#e4e6eb]">Top Stations</h3>
            <p className="text-xs text-[#888] m-[0_0_20px_0] dark:text-[#aaa]">Les plus actives</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-[13px] text-[#333] flex items-center gap-2 dark:text-[#e4e6eb]"><span className="text-[#888] text-xs">#1</span> Alger Centre</div>
                <div className="h-1.5 bg-[#f0f0f0] rounded-[3px] overflow-hidden dark:bg-[#2b2b2b]"><div style={{width: "90%", backgroundColor: "#2ad367"}} className="h-full rounded-[3px]"></div></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[13px] text-[#333] flex items-center gap-2 dark:text-[#e4e6eb]"><span className="text-[#888] text-xs">#2</span> Bab El Oued</div>
                <div className="h-1.5 bg-[#f0f0f0] rounded-[3px] overflow-hidden dark:bg-[#2b2b2b]"><div style={{width: "70%", backgroundColor: "#2ad367"}} className="h-full rounded-[3px]"></div></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[13px] text-[#333] flex items-center gap-2 dark:text-[#e4e6eb]"><span className="text-[#888] text-xs">#3</span> Kouba</div>
                <div className="h-1.5 bg-[#f0f0f0] rounded-[3px) overflow-hidden dark:bg-[#2b2b2b]"><div style={{width: "60%", backgroundColor: "#2ad367"}} className="h-full rounded-[3px]"></div></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[13px] text-[#333] flex items-center gap-2 dark:text-[#e4e6eb]"><span className="text-[#888] text-xs">#4</span> Hussein Dey</div>
                <div className="h-1.5 bg-[#f0f0f0] rounded-[3px] overflow-hidden dark:bg-[#2b2b2b]"><div style={{width: "45%", backgroundColor: "#d0d0d0"}} className="h-full rounded-[3px]"></div></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[13px] text-[#333] flex items-center gap-2 dark:text-[#e4e6eb]"><span className="text-[#888] text-xs">#5</span> El Harrach</div>
                <div className="h-1.5 bg-[#f0f0f0] rounded-[3px] overflow-hidden dark:bg-[#2b2b2b]"><div style={{width: "30%", backgroundColor: "#d0d0d0"}} className="h-full rounded-[3px]"></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT ACTIVITIES */}
        <section className="bg-white border border-[#eaeaea] rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:bg-[#1a1a1a] dark:border-[#2b2b2b]">
          <h3 className="text-lg font-semibold m-[0_0_4px_0] dark:text-[#e4e6eb]">Locations récentes</h3>
          <p className="text-xs text-[#888] m-[0_0_24px_0] dark:text-[#aaa]">Dernières activités de location</p>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center p-4 border border-[#eaeaea] rounded-lg gap-4 dark:border-[#2b2b2b]">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#e8f8f0] text-[#2ad367]">
                <ClockIcon />
              </div>
              <div className="flex-1">
                <h4 className="m-0 mb-1.5 text-[15px] font-semibold dark:text-[#e4e6eb]">Karim B <span className="text-[#888] font-normal">— Vélo Urbain Pro</span></h4>
                <p className="m-0 text-[13px] text-[#888] flex items-center gap-1.5"><MapPinIcon /> Alger Centre — il y a 5 min</p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <strong className="text-base dark:text-[#e4e6eb]">400 DA</strong>
                <span className="p-[4px_12px] rounded-[20px] text-xs font-semibold bg-[#e8f8f0] text-[#2ad367]">En cours</span>
              </div>
            </div>

            <div className="flex items-center p-4 border border-[#eaeaea] rounded-lg gap-4 dark:border-[#2b2b2b]">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#e8f8f0] text-[#2ad367]">
                <ClockIcon />
              </div>
              <div className="flex-1">
                <h4 className="m-0 mb-1.5 text-[15px] font-semibold dark:text-[#e4e6eb]">Sarah M <span className="text-[#888] font-normal">— Scooter City</span></h4>
                <p className="m-0 text-[13px] text-[#888] flex items-center gap-1.5"><MapPinIcon /> Bab El Oued — il y a 15 min</p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <strong className="text-base dark:text-[#e4e6eb]">1,500 DA</strong>
                <span className="p-[4px_12px] rounded-[20px] text-xs font-semibold bg-[#e8f8f0] text-[#2ad367]">En cours</span>
              </div>
            </div>

            <div className="flex items-center p-4 border border-[#eaeaea] rounded-lg gap-4 dark:border-[#2b2b2b]">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#f5f5f5] text-[#888] dark:bg-[#2b2b2b] dark:text-[#aaa]">
                <CheckIcon />
              </div>
              <div className="flex-1">
                <h4 className="m-0 mb-1.5 text-[15px] font-semibold dark:text-[#e4e6eb]">Ahmed K <span className="text-[#888] font-normal">— E-Bike Sport</span></h4>
                <p className="m-0 text-[13px] text-[#888] flex items-center gap-1.5"><MapPinIcon /> Kouba — il y a 2h</p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <strong className="text-base dark:text-[#e4e6eb]">800 DA</strong>
                <span className="border border-[#eaeaea] text-[#666] bg-white p-[3px_12px] rounded-[20px] text-xs font-semibold dark:bg-[#1a1a1a] dark:border-[#333] dark:text-[#aaa]">Terminée</span>
              </div>
            </div>

            <div className="flex items-center p-4 border border-[#eaeaea] rounded-lg gap-4 dark:border-[#2b2b2b]">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#fadbd8] text-[#e74c3c]">
                <XIcon />
              </div>
              <div className="flex-1">
                <h4 className="m-0 mb-1.5 text-[15px] font-semibold dark:text-[#e4e6eb]">Amina R <span className="text-[#888] font-normal">— Vélo Classic</span></h4>
                <p className="m-0 text-[13px] text-[#888] flex items-center gap-1.5"><MapPinIcon /> Hussein Dey — il y a 45 min</p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <strong className="text-base dark:text-[#e4e6eb]">280 DA</strong>
                <span className="bg-[#e74c3c] text-white p-[4px_12px] rounded-[20px] text-xs font-semibold">Annulée</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;
