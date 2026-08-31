import { useNavigate } from 'react-router-dom';
import styles from './RoleSelection.module.css';

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>
      
      <h1 className={styles.title}>RoofMatch</h1>
      <p className={styles.subtitle}>Elige cómo quieres ingresar</p>

      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Soy cliente</h2>
          <p className={styles.cardDesc}>Descubre y encuentra tu hogar ideal</p>
          <button className={styles.button} onClick={() => navigate('/login')}>
            Ingresar como cliente
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
              <path d="M9 22v-4h6v4" />
              <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
              <path d="M12 10h.01" /><path d="M12 14h.01" />
              <path d="M16 10h.01" /><path d="M16 14h.01" />
              <path d="M8 10h.01" /><path d="M8 14h.01" />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Soy inmobiliaria</h2>
          <p className={styles.cardDesc}>Administra propiedades y gestiona citas</p>
          <button className={`${styles.button} ${styles.buttonDark}`} onClick={() => navigate('/inmobiliaria/login')}>
            Ingresar como inmobiliaria
          </button>
        </div>
      </div>
    </div>
  );
}