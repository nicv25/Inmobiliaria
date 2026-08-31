import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/cliente');
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.overlay}>
          <h1 className={styles.heading}>Encuentra tu hogar ideal, una propiedad a la vez.</h1>
          <p className={styles.subheading}>Propiedades curadas según tu estilo, presupuesto y forma de vida, con total transparencia.</p>
        </div>
      </div>
      
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Bienvenido de nuevo</h2>
          <p className={styles.subtitle}>Inicia sesión para continuar tu búsqueda</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>CORREO ELECTRÓNICO</label>
              <input type="email" placeholder="ana@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className={styles.inputGroup}>
              <label>CONTRASEÑA</label>
              <div className={styles.passwordWrapper}>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            <div className={styles.forgotPassword}>
              <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
            </div>

            <button type="submit" className={styles.submitBtn}>Iniciar sesión</button>
          </form>

          <p className={styles.registerLink}>
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}