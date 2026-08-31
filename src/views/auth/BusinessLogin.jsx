import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';
import styles from './BusinessAuth.module.css';

export default function BusinessLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/inmobiliaria'); // Redirige al dashboard B2B
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.brandHeader}>
          <Building2 size={24} /> RoofMatch • Inmobiliarias
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heading}>Administra tus propiedades y conecta con compradores reales.</h1>
          <p className={styles.subheading}>Publica inmuebles, gestiona citas y analiza el desempeño de cada propiedad desde un solo lugar.</p>
          <div className={styles.statsRow}>
            <div className={styles.statItem}><h3>1.200+</h3><p>Inmobiliarias activas</p></div>
            <div className={styles.statItem}><h3>98%</h3><p>Satisfacción</p></div>
            <div className={styles.statItem}><h3>45K+</h3><p>Citas gestionadas</p></div>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Acceso inmobiliaria</h2>
          <p className={styles.subtitle}>Ingresa con tu correo empresarial</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>CORREO EMPRESARIAL</label>
              <input type="email" placeholder="contacto@inmobiliaria.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className={styles.inputGroup}>
              <label>CONTRASEÑA</label>
              <div className={styles.passwordWrapper}>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.forgotPassword}>
              <Link to="#">¿Olvidaste tu contraseña?</Link>
            </div>

            <button type="submit" className={styles.submitBtn}>Iniciar sesión</button>
          </form>

          <p className={styles.registerLink}>
            ¿No tienes cuenta? <Link to="/inmobiliaria/registro">Registrar inmobiliaria</Link>
          </p>

          <div className={styles.demoBanner}>
            Demo: haz clic en <strong>Iniciar sesión</strong> para ver el panel
          </div>
        </div>
      </div>
    </div>
  );
}