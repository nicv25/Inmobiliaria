import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Heart, Calendar, Clock, Settings, LogOut, Search, SlidersHorizontal, Bell } from 'lucide-react';
import styles from './ClientLayout.module.css';

export default function ClientLayout() {
  const location = useLocation();
  const [activePanel, setActivePanel] = useState('default');

  const navItems = [
    { path: '/cliente', label: 'Descubrir', icon: <Home size={20} /> },
    { path: '/cliente/favoritos', label: 'Favoritos', icon: <Heart size={20} /> },
    { path: '/cliente/citas', label: 'Mis Citas', icon: <Calendar size={20} /> },
    { path: '/cliente/historial', label: 'Historial', icon: <Clock size={20} /> },
    { path: '/cliente/cuenta', label: 'Mi Cuenta', icon: <Settings size={20} /> },
  ];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><Home color="white" size={20} /></div>
          <h2>RoofMatch</h2>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}>
              <span className={styles.icon}>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.logout}>
          <Link to="/"><span className={styles.icon}><LogOut size={20} /></span> Cerrar sesión</Link>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} color="#8E92A4" />
            <input type="text" placeholder="Buscar propiedades, barrios..." />
          </div>
          <div className={styles.topActions}>
            <button 
              className={styles.filterBtn} 
              onClick={() => activePanel === 'default' && setActivePanel('filters')}
              style={{ opacity: activePanel !== 'default' ? 0.5 : 1, cursor: activePanel !== 'default' ? 'not-allowed' : 'pointer' }}
            >
              <SlidersHorizontal size={16} /> Filtros
            </button>
            <button className={styles.iconBtn}><Bell size={20} /></button>
            <div className={styles.avatar}>AM</div>
          </div>
        </header>
        <div className={styles.pageContent}>
          <Outlet context={{ activePanel, setActivePanel }} />
        </div>
      </main>
    </div>
  );
}