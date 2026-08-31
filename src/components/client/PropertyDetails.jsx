import { useState } from 'react';
import { X, BedDouble, Bath, Car, Maximize, Phone, Mail, TrendingUp, Calendar as CalendarIcon, Clock } from 'lucide-react';
import styles from './SidePanels.module.css';

export default function PropertyDetails({ onClose, property, appointment }) {
  // Si hay una cita, iniciamos automáticamente en el modo formulario (isScheduling = true)
  const [isScheduling, setIsScheduling] = useState(!!appointment);
  const [selectedDate, setSelectedDate] = useState(appointment?.date || '');
  const [selectedTime, setSelectedTime] = useState(appointment?.time || '');
  const [notes, setNotes] = useState(appointment?.notes || '');

  if (!property) return null;

  // Lógica de edición: Solo modificable si no hay cita previa, o si la cita está en 'Pendiente'
  const isEditable = !appointment || appointment.status === 'Pendiente';

  const dates = ['Hoy', 'Mañana', 'Sáb, 14', 'Dom, 15'];
  const times = ['09:00 AM', '11:00 AM', '02:30 PM', '04:00 PM'];

  const handleConfirm = () => {
    if (!isEditable) return;
    console.log(appointment ? 'Cita actualizada:' : 'Cita solicitada:', { 
      property: property.id, date: selectedDate, time: selectedTime, notes 
    });
    setIsScheduling(false);
    if (appointment) onClose(); // Cierra el panel si venimos de Mis Citas
  };

  return (
    <div className={styles.panelContainer}>
      <div className={styles.detailsHero}>
        <img src={property.img} alt={property.name} className={styles.heroImg} />
        <button onClick={onClose} className={styles.closeHeroBtn}><X size={20} /></button>
        <div className={styles.heroAvatar}></div>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.detailsHeader}>
          <div className={styles.tags}>
            <span className={styles.tag}>Apartamento</span>
            <span className={styles.tag}>Venta</span>
          </div>
          <h2 className={styles.detailsPrice}>{property.price}</h2>
        </div>
        
        <h3 className={styles.detailsTitle}>{property.name}</h3>
        <p className={styles.detailsLocation}>📍 {property.location}</p>

        <div className={styles.specsGrid}>
          <div className={styles.specItem}><BedDouble size={20} /><span>2 Hab.</span></div>
          <div className={styles.specItem}><Bath size={20} /><span>2 Baños</span></div>
          <div className={styles.specItem}><Car size={20} /><span>1 Parq.</span></div>
          <div className={styles.specItem}><Maximize size={20} /><span>95m²</span></div>
        </div>

        <div className={styles.section}>
          <h4>Sobre esta propiedad</h4>
          <p className={styles.description}>Moderno apartamento en la ubicación más codiciada. A pasos de restaurantes, parques y zonas comerciales.</p>
        </div>

        <div className={styles.agencyCard}>
          <div className={styles.agencyInfo}>
            <div className={styles.agencyLogo}>🏢</div>
            <div>
              <h5>{appointment ? appointment.agency : 'Medellín Luxury Homes'}</h5>
              <span className={styles.verifiedText}>✓ Agencia verificada</span>
            </div>
          </div>
          <div className={styles.agencyActions}>
            <button className={styles.iconBtn}><Phone size={16}/></button>
            <button className={styles.iconBtn}><Mail size={16}/></button>
          </div>
        </div>
      </div>

      {!isScheduling && (
        <div className={styles.panelFooter}>
          <button onClick={() => setIsScheduling(true)} className={styles.btnSolid}>
            Agendar visita
          </button>
        </div>
      )}

      {isScheduling && (
        <div className={styles.scheduleOverlay}>
          <div className={styles.scheduleHeader}>
            <h4>{appointment ? 'Detalles de la visita' : 'Agendar visita'}</h4>
            {/* Ocultamos el botón X si estamos en modo lectura para evitar confusiones, el usuario puede cerrar desde la foto */}
            {!appointment && <button onClick={() => setIsScheduling(false)} className={styles.closeBtn}><X size={16}/></button>}
          </div>
          
          <label className={styles.scheduleLabel}><CalendarIcon size={14}/> FECHAS DISPONIBLES</label>
          <div className={styles.chipsWrapper}>
            {dates.map(d => (
              <button 
                key={d} 
                onClick={() => isEditable && setSelectedDate(d)}
                className={`${styles.chip} ${selectedDate === d ? styles.chipSelected : ''}`}
                style={{ opacity: !isEditable && selectedDate !== d ? 0.4 : 1, cursor: isEditable ? 'pointer' : 'default' }}
              >
                {d}
              </button>
            ))}
          </div>

          <label className={styles.scheduleLabel}><Clock size={14}/> HORAS DISPONIBLES</label>
          <div className={styles.chipsWrapper}>
            {times.map(t => (
              <button 
                key={t} 
                onClick={() => isEditable && setSelectedTime(t)}
                className={`${styles.chip} ${selectedTime === t ? styles.chipSelected : ''}`}
                style={{ opacity: !isEditable && selectedTime !== t ? 0.4 : 1, cursor: isEditable ? 'pointer' : 'default' }}
              >
                {t}
              </button>
            ))}
          </div>

          <label className={styles.scheduleLabel}>INFORMACIÓN ADICIONAL</label>
          <textarea 
            className={styles.textArea} 
            placeholder="Ej: Necesito validar si aceptan mascotas..."
            value={notes}
            onChange={(e) => isEditable && setNotes(e.target.value)}
            readOnly={!isEditable}
            rows="2"
            style={{ opacity: !isEditable ? 0.7 : 1, backgroundColor: !isEditable ? '#F3F4F8' : 'white' }}
          />

          {isEditable && (
            <button 
              onClick={handleConfirm} 
              disabled={!selectedDate || !selectedTime}
              className={`${styles.btnSolid} ${(!selectedDate || !selectedTime) ? styles.btnDisabled : ''}`}
            >
              {appointment ? 'Actualizar cita' : 'Confirmar cita'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}