import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/cliente');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h2 className={styles.title}>Crear cuenta</h2>
          <p className={styles.subtitle}>Únete a miles que ya encontraron su hogar</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>NOMBRE COMPLETO</label>
              <input type="text" name="fullName" placeholder="Ana Martínez" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className={styles.inputGroup}>
              <label>CORREO ELECTRÓNICO</label>
              <input type="email" name="email" placeholder="ana@correo.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className={styles.inputGroup}>
              <label>CONTRASEÑA</label>
              <div className={styles.passwordWrapper}>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>Crear cuenta</button>
          </form>

          <p className={styles.registerLink}>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}