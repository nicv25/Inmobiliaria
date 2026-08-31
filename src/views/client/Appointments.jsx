import { useState } from 'react';
import { Calendar, Clock, MapPin, Building2, XCircle, CheckCircle2 } from 'lucide-react';
import PropertyDetails from '../../components/client/PropertyDetails';
import styles from './Appointments.module.css';

const initialAppointments = [
  {
    id: 1,
    name: 'Penthouse en Chapinero Alto', // Ajustado a 'name' para que coincida con PropertyDetails
    location: 'Chapinero Alto, Bogotá',
    price: '$850M',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    date: 'Mañana',
    time: '11:00 AM',
    agency: 'Medellín Luxury Homes',
    status: 'Confirmada',
    notes: 'Validar si aceptan mascotas.'
  },
  {
    id: 2,
    name: 'Loft Industrial en Laureles',
    location: 'Laureles, Medellín',
    price: '$1800K/mes',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    date: 'Sáb, 14 Sept',
    time: '02:30 PM',
    agency: 'Urbania Inmobiliaria',
    status: 'Pendiente',
    notes: 'Preguntar por parqueadero adicional.'
  }
];

export default function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState('Todas');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleCancel = (id) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: 'Cancelada' } : app));
  };

  const filteredAppointments = appointments.filter(app => {
    if (filter === 'Todas') return true;
    return app.status === filter;
  });

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div>
          <h2>Mis Citas y Visitas</h2>
          <p>Gestiona tus encuentros programados con las inmobiliarias</p>
        </div>
        <div className={styles.filterTabs}>
          {['Todas', 'Confirmada', 'Pendiente', 'Cancelada'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setFilter(tab)}
              className={`${styles.tabBtn} ${filter === tab ? styles.tabActive : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.appointmentsList}>
        {filteredAppointments.length === 0 ? (
          <div className={styles.emptyState}>
            <Calendar size={48} color="var(--text-muted)" />
            <h3>No tienes citas en esta categoría</h3>
            <p>Explora propiedades en el módulo de Descubrir y agenda tu primera visita.</p>
          </div>
        ) : (
          filteredAppointments.map(app => (
            <div key={app.id} className={styles.appointmentCard}>
              <img src={app.img} alt={app.name} className={styles.propertyImg} />
              
              <div className={styles.cardContent}>
                <div className={styles.cardTopRow}>
                  <span className={`${styles.statusBadge} ${styles[app.status.toLowerCase()]}`}>
                    {app.status === 'Confirmada' && <CheckCircle2 size={14} />}
                    {app.status === 'Cancelada' && <XCircle size={14} />}
                    {app.status}
                  </span>
                  <span className={styles.priceTag}>{app.price}</span>
                </div>

                <h3>{app.name}</h3>
                <p className={styles.location}><MapPin size={14} /> {app.location}</p>

                <div className={styles.dateTimeBox}>
                  <div className={styles.dateTimeItem}>
                    <Calendar size={16} color="var(--primary-color)" />
                    <span>{app.date}</span>
                  </div>
                  <div className={styles.dateTimeItem}>
                    <Clock size={16} color="var(--primary-color)" />
                    <span>{app.time}</span>
                  </div>
                  <div className={styles.dateTimeItem}>
                    <Building2 size={16} color="var(--primary-color)" />
                    <span>{app.agency}</span>
                  </div>
                </div>

                {app.notes && (
                  <p className={styles.notes}><strong>Nota:</strong> {app.notes}</p>
                )}
              </div>

              <div className={styles.cardActions}>
                {app.status !== 'Cancelada' && (
                  <button onClick={() => handleCancel(app.id)} className={styles.cancelBtn}>
                    Cancelar cita
                  </button>
                )}
                <button onClick={() => setSelectedAppointment(app)} className={styles.detailsBtn}>
                  Ver inmueble
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Drawer Overlay para ver los detalles sin salir de la pantalla */}
      {selectedAppointment && (
        <div className={styles.drawerOverlay} onClick={() => setSelectedAppointment(null)}>
          <div className={styles.drawerContainer} onClick={(e) => e.stopPropagation()}>
            <PropertyDetails 
              key={selectedAppointment.id} 
              property={selectedAppointment} 
              appointment={selectedAppointment} 
              onClose={() => setSelectedAppointment(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}