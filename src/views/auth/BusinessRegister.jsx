import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';
import styles from './BusinessAuth.module.css';

export default function BusinessRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/inmobiliaria/solicitud-enviada');
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
          <h2 className={styles.title}>Registrar inmobiliaria</h2>
          <p className={styles.subtitle}>Completa el formulario para registrarte</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.rowTwo}>
              <div className={styles.inputGroup}><label>NOMBRE COMERCIAL</label><input type="text" placeholder="Inmobiliaria XYZ" required /></div>
              <div className={styles.inputGroup}><label>NIT</label><input type="text" placeholder="900.123.456-7" required /></div>
            </div>

            <div className={styles.rowTwo}>
              <div className={styles.inputGroup}><label>TELÉFONO</label><input type="text" placeholder="+57 300 000 0000" required /></div>
              <div className={styles.inputGroup}><label>CIUDAD</label><input type="text" placeholder="Bogotá" required /></div>
            </div>

            <div className={styles.inputGroup}><label>DIRECCIÓN</label><input type="text" placeholder="Calle 100 # 12-34, Oficina 502" required /></div>
            <div className={styles.inputGroup}><label>NOMBRE DEL REPRESENTANTE</label><input type="text" placeholder="Carlos Rodríguez" required /></div>
            <div className={styles.inputGroup}><label>CORREO EMPRESARIAL</label><input type="email" placeholder="contacto@inmobiliaria.com" required /></div>

            <div className={styles.rowTwo}>
              <div className={styles.inputGroup}>
                <label>CONTRASEÑA</label>
                <div className={styles.passwordWrapper}>
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                  <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className={styles.inputGroup}><label>CONFIRMAR CONTRASEÑA</label><input type="password" placeholder="••••••••" required /></div>
            </div>

            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">Acepto los <a href="#">términos y condiciones</a> y la <a href="#">política de privacidad</a></label>
            </div>

            <button type="submit" className={styles.submitBtn}>Crear cuenta</button>
          </form>

          <p className={styles.registerLink}>
            ¿Ya tienes cuenta? <Link to="/inmobiliaria/login">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}