import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import styles from './BusinessAuth.module.css';

export default function BusinessPending() {
  const navigate = useNavigate();

  return (
    <div className={styles.pendingContainer}>
      <div className={styles.pendingCard}>
        <div className={styles.checkCircle}>
          <Check size={32} />
        </div>
        <h2>¡Solicitud enviada!</h2>
        <p>Tu cuenta está <strong>pendiente de verificación</strong>. Nuestro equipo revisará tu información en 1–3 días hábiles.</p>
        
        <div className={styles.alertBox}>
          📧 Recibirás un correo de confirmación una vez activada la cuenta.
        </div>

        <button onClick={() => navigate('/inmobiliaria/login')} className={styles.submitBtn} style={{ width: '100%' }}>
          Volver al inicio de sesión
        </button>
      </div>
    </div>
  );
}