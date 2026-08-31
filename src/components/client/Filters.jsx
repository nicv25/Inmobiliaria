import { useState } from 'react';
import { X } from 'lucide-react';
import styles from './SidePanels.module.css';

export default function Filters({ onClose }) {
  const [type, setType] = useState('Casa');
  const [operation, setOperation] = useState('Venta');
  const [rooms, setRooms] = useState('3+');

  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelHeader}>
        <h3>Filtros</h3>
        <button onClick={onClose} className={styles.closeBtn}><X size={20} /></button>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.filterGroup}>
          <label>TIPO DE INMUEBLE</label>
          <div className={styles.pills}>
            {['Todos', 'Apartamento', 'Casa', 'Estudio'].map(t => (
              <button key={t} onClick={() => setType(t)} className={`${styles.pill} ${type === t ? styles.pillActive : ''}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>OPERACIÓN</label>
          <div className={styles.pills}>
            {['Todos', 'Venta', 'Arriendo'].map(o => (
              <button key={o} onClick={() => setOperation(o)} className={`${styles.pill} ${operation === o ? styles.pillActive : ''}`}>{o}</button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>MÍN. HABITACIONES</label>
          <div className={styles.pills}>
            {['Todos', '1+', '2+', '3+', '4+'].map(r => (
              <button key={r} onClick={() => setRooms(r)} className={`${styles.pill} ${rooms === r ? styles.pillActive : ''}`}>{r}</button>
            ))}
          </div>
        </div>

        <div className={styles.filterToggle}>
          <div>
            <h4>Solo agencias verificadas</h4>
            <p>Filtra propiedades de agentes verificados</p>
          </div>
          <div className={styles.toggleSwitch}></div>
        </div>

        <div className={styles.resultsCount}>
          <strong>24 propiedades</strong> coinciden con estos filtros
        </div>
      </div>

      <div className={styles.panelFooter}>
        <button className={styles.btnOutline}>Restablecer</button>
        <button className={styles.btnSolid}>Aplicar filtros</button>
      </div>
    </div>
  );
}