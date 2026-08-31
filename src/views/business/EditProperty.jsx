import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import styles from './EditProperty.module.css';

export default function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // Simulamos fotos precargadas solo si estamos en modo edición
  const [images, setImages] = useState(
    isEditMode ? [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80'
    ] : []
  );

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>{isEditMode ? 'Editar inmueble' : 'Registrar inmueble'}</h1>
        <button onClick={handleSave} className={styles.saveBtn}>
          <Save size={18} /> {isEditMode ? 'Guardar cambios' : 'Publicar inmueble'}
        </button>
      </div>

      <form className={styles.formLayout} onSubmit={handleSave}>
        {/* Información Básica */}
        <div className={styles.formCard}>
          <h2>Información básica</h2>
          
          <div className={styles.inputGroup}>
            <label>NOMBRE O TÍTULO DEL INMUEBLE *</label>
            <input type="text" defaultValue={isEditMode ? "Apartamento Rosales" : ""} required />
          </div>

          <div className={styles.rowTwo}>
            <div className={styles.inputGroup}>
              <label>TIPO *</label>
              <select defaultValue={isEditMode ? "Apartamento" : ""} required>
                <option value="" disabled>Selecciona un tipo</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Estudio">Estudio</option>
                <option value="Local">Local</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>MODALIDAD *</label>
              <select defaultValue={isEditMode ? "Venta" : ""} required>
                <option value="" disabled>Selecciona modalidad</option>
                <option value="Venta">Venta</option>
                <option value="Arriendo">Arriendo</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>PRECIO *</label>
            <input type="number" defaultValue={isEditMode ? "650000000" : ""} required />
          </div>
        </div>

        {/* Ubicación */}
        <div className={styles.formCard}>
          <h2>Ubicación</h2>
          
          <div className={styles.rowTwo}>
            <div className={styles.inputGroup}>
              <label>CIUDAD *</label>
              <input type="text" defaultValue={isEditMode ? "Bogotá" : ""} required />
            </div>
            <div className={styles.inputGroup}>
              <label>ZONA O BARRIO *</label>
              <input type="text" defaultValue={isEditMode ? "Rosales" : ""} required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>DIRECCIÓN</label>
            <input type="text" defaultValue={isEditMode ? "Calle 72 # 10-34, Apto 501" : ""} />
          </div>
        </div>

        {/* Características */}
        <div className={styles.formCard}>
          <h2>Características</h2>
          
          <div className={styles.rowFour}>
            <div className={styles.inputGroup}>
              <label>ÁREA (m²)</label>
              <input type="number" defaultValue={isEditMode ? "120" : ""} />
            </div>
            <div className={styles.inputGroup}>
              <label>HABITACIONES</label>
              <input type="number" defaultValue={isEditMode ? "3" : ""} />
            </div>
            <div className={styles.inputGroup}>
              <label>BAÑOS</label>
              <input type="number" defaultValue={isEditMode ? "2" : ""} />
            </div>
            <div className={styles.inputGroup}>
              <label>PARQUEADEROS</label>
              <input type="number" defaultValue={isEditMode ? "1" : ""} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>DESCRIPCIÓN</label>
            <textarea 
              rows="4" 
              placeholder="Describe el inmueble, sus acabados, vistas, cercanía a servicios..."
              defaultValue={isEditMode ? "Excelente apartamento iluminado con acabados modernos..." : ""}
            ></textarea>
          </div>
        </div>

        {/* Fotografías */}
        <div className={styles.formCard}>
          <h2>Fotografías</h2>
          
          <div className={styles.photoGrid}>
            {images.map((img, index) => (
              <div key={index} className={styles.photoWrapper}>
                <img src={img} alt={`Propiedad ${index + 1}`} />
                <button 
                  type="button" 
                  onClick={() => handleRemoveImage(index)} 
                  className={styles.removePhotoBtn}
                  title="Eliminar foto"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {images.length < 10 && (
              <div className={styles.uploadBox}>
                <Upload size={24} color="var(--primary-color)" />
                <p>Subir foto</p>
                <span>Formatos JPG/PNG</span>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}