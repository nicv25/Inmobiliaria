import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, Heart, Star, ChevronRight, Plus, BarChart2 } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const recentProps = [
    { id: 1, name: 'Apartamento Rosales', price: '$650M', status: 'Disponible', likes: 23, apps: 8, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=150&q=80' },
    { id: 2, name: 'Casa Chicó', price: '$4500K/mes', status: 'Reservado', likes: 18, apps: 5, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=150&q=80' },
    { id: 3, name: 'Loft Zona T', price: '$2200K/mes', status: 'Disponible', likes: 35, apps: 12, img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=150&q=80' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Panel principal</h1>
        <p className={styles.subtitle}>Bienvenido, Premium Realty Group</p>
        <button onClick={() => navigate('/inmobiliaria/registrar')} className={styles.addBtn}>
          <Plus size={18} /> Registrar inmueble
        </button>
      </div>

      <div className={styles.statsGrid}>
        {/* ... (Tarjetas de estadísticas sin cambios) ... */}
        <div className={styles.statCard}><div className={`${styles.statIcon} ${styles.blue}`}><Building2 size={20} /></div><h3>5</h3><h4>Inmuebles publicados</h4><p>3 disponibles</p></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} ${styles.orange}`}><Calendar size={20} /></div><h3>2</h3><h4>Citas pendientes</h4><p>Requieren respuesta</p></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} ${styles.green}`}><Heart size={20} /></div><h3>333</h3><h4>Total intereses</h4><p>En todos tus inmuebles</p></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} ${styles.yellow}`}><Star size={20} /></div><h3>194</h3><h4>Favoritos recibidos</h4><p>Este mes</p></div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.mainCol}>
          <div className={styles.panelCard}>
            <div className={styles.cardHeader}>
              <h3>Inmuebles recientes</h3>
              {/* Cambiamos el link 'a' por un botón de navegación */}
              <button onClick={() => navigate('/inmobiliaria/inmuebles')} className={styles.link} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                Ver todos →
              </button>
            </div>
            <div className={styles.list}>
              {recentProps.map(prop => (
                <div key={prop.id} className={styles.listItem}>
                  <img src={prop.img} alt={prop.name} />
                  <div className={styles.itemInfo}>
                    <h4>{prop.name}</h4>
                    <p>Venta • {prop.price}</p>
                  </div>
                  <span className={`${styles.badge} ${prop.status === 'Disponible' ? styles.badgeGreen : styles.badgeOrange}`}>{prop.status}</span>
                  <div className={styles.itemMetrics}>
                    <span><Heart size={14}/> {prop.likes}</span>
                    <span><Calendar size={14}/> {prop.apps}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.panelCard}>
            <h3>Accesos rápidos</h3>
            <div className={styles.quickLinks}>
              <button onClick={() => navigate('/inmobiliaria/registrar')}>
                <div className={styles.qlIcon}><Plus size={16}/></div> Registrar inmueble <ChevronRight size={16}/>
              </button>
              <button onClick={() => navigate('/inmobiliaria/solicitudes')}>
                <div className={styles.qlIcon}><Calendar size={16}/></div> Ver solicitudes de cita <ChevronRight size={16}/>
              </button>
              <button onClick={() => navigate('/inmobiliaria/metricas')}>
                <div className={styles.qlIcon}><BarChart2 size={16}/></div> Ver métricas <ChevronRight size={16}/>
              </button>
            </div>
          </div>

          <div className={styles.panelCard}>
            <h3>Citas pendientes</h3>
            <div className={styles.appointments}>
              <div className={styles.apptItem}>
                <div className={styles.apptAvatar}>ML</div>
                <div className={styles.apptInfo}>
                  <h4>María López</h4>
                  <p>8 Jul 2026 • 10:00 AM</p>
                </div>
                <button onClick={() => navigate('/inmobiliaria/solicitudes')} className={styles.textBtn}>Ver</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}