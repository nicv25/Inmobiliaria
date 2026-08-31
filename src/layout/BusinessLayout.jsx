import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Building2, Plus, Calendar, Clock, BarChart2, Settings, LogOut, ArrowLeft } from 'lucide-react';
import styles from './BusinessLayout.module.css';

export default function BusinessLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/inmobiliaria', label: 'Panel principal', icon: <Home size={20} /> },
    { path: '/inmobiliaria/inmuebles', label: 'Mis inmuebles', icon: <Building2 size={20} /> },
    { path: '/inmobiliaria/registrar', label: 'Registrar inmueble', icon: <Plus size={20} /> },
    { path: '/inmobiliaria/solicitudes', label: 'Solicitudes de cita', icon: <Calendar size={20} />, badge: 2 },
    { path: '/inmobiliaria/historial', label: 'Historial de citas', icon: <Clock size={20} /> },
    { path: '/inmobiliaria/metricas', label: 'Métricas', icon: <BarChart2 size={20} /> },
    { path: '/inmobiliaria/perfil', label: 'Perfil de empresa', icon: <Settings size={20} /> },
  ];

  const getPageTitle = () => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Detalle';
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}><Building2 color="white" size={20} /></div>
          <div className={styles.brandText}>
            <h2>Premium Realty</h2>
            <span>✓ Verificada</span>
          </div>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.logout}>
          <Link to="/"><span className={styles.icon}><LogOut size={20} /></span> Cerrar sesión</Link>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumbs}>
            <span>Inmobiliaria</span> <span className={styles.separator}>›</span> <strong>{getPageTitle()}</strong>
          </div>
          <div className={styles.topActions}>
            <Link to="/cliente" className={styles.clientModeBtn}>
              <ArrowLeft size={16} /> Módulo cliente
            </Link>
            <div className={styles.avatar}>PR</div>
          </div>
        </header>

        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}