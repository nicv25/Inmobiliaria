import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Building2 } from 'lucide-react';
import styles from './AppointmentRequests.module.css';

const dbRequests = [
  { id: 1, clientInitials: 'ML', clientName: 'María López', property: 'Apartamento Rosales', date: '8 Jul 2026', time: '10:00 AM', requestedAt: '5 Jul 2026', status: 'Pendiente' },
  { id: 2, clientInitials: 'VR', clientName: 'Valentina Ríos', property: 'Penthouse Santa Bárbara', date: '11 Jul 2026', time: '11:00 AM', requestedAt: '6 Jul 2026', status: 'Pendiente' },
  { id: 3, clientInitials: 'RC', clientName: 'Roberto Castillo', property: 'Loft Zona T', date: '22 Jun 2026', time: '4:00 PM', requestedAt: '20 Jun 2026', status: 'Completada' }
];

export default function AppointmentRequests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pendiente');
  const tabs = ['Pendiente', 'Aceptada', 'Reprogramada', 'Rechazada', 'Completada'];

  const filteredRequests = dbRequests.filter(req => req.status === activeTab);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Solicitudes de cita</h1>

      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
          >
            {tab} {tab === 'Pendiente' && <span className={styles.badge}>2</span>}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filteredRequests.length === 0 ? (
          <p className={styles.emptyMsg}>No hay solicitudes en este estado.</p>
        ) : (
          filteredRequests.map(req => (
            <div key={req.id} className={styles.requestCard}>
              <div className={styles.clientSection}>
                <div className={styles.avatar}>{req.clientInitials}</div>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>
                    <h4>{req.clientName}</h4>
                    <span className={styles.statusBadge}>{req.status}</span>
                  </div>
                  <p className={styles.property}><Building2 size={14}/> {req.property}</p>
                  <div className={styles.dateTime}>
                    <span><Calendar size={14}/> {req.date}</span>
                    <span><Clock size={14}/> {req.time}</span>
                    <span className={styles.requestedAt}>Solicitado: {req.requestedAt}</span>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <button onClick={() => navigate(`/inmobiliaria/solicitudes/${req.id}`)} className={styles.btnOutline}>Ver detalle</button>
                {req.status === 'Pendiente' && (
                  <>
                    <button className={styles.btnSolidGreen}>Aceptar</button>
                    <button className={styles.btnOutlineRed}>Rechazar</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}