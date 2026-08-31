import { useNavigate } from "react-router-dom";
import { ArrowLeft, BedDouble, Bath, Car, Maximize } from "lucide-react";
import styles from "./PropertyPreview.module.css";

export default function PropertyPreview() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={24} /> Apartamento Rosales
        </button>
        <button
          onClick={() => navigate("/inmobiliaria/editar-inmueble/1")}
          className={styles.editBtn}
        >
          Editar
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <div className={styles.imageGallery}>
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                alt="Principal"
                className={styles.mainImg}
              />
              <div className={styles.thumbnails}>
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=150&q=80"
                  className={styles.activeThumb}
                  alt="1"
                />
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=150&q=80"
                  alt="2"
                />
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=150&q=80"
                  alt="3"
                />
              </div>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.topInfo}>
                <div className={styles.tags}>
                  <span className={styles.tagDark}>Apartamento</span>
                  <span className={styles.tagGreen}>Disponible</span>
                </div>
                <h2 className={styles.price}>$650M</h2>
              </div>

              <h1 className={styles.title}>Apartamento Rosales</h1>
              <p className={styles.location}>📍 Rosales, Bogotá</p>

              <div className={styles.specsRow}>
                <div className={styles.spec}>
                  <BedDouble size={20} /> <strong>3</strong> Hab.
                </div>
                <div className={styles.spec}>
                  <Bath size={20} /> <strong>2</strong> Baños
                </div>
                <div className={styles.spec}>
                  <Car size={20} /> <strong>1</strong> Parq.
                </div>
                <div className={styles.spec}>
                  <Maximize size={20} /> <strong>120m²</strong> Área
                </div>
              </div>

              <div className={styles.footerDates}>
                <span>
                  📅 Publicado: <strong>15 May 2026</strong>
                </span>
                <span>
                  🔄 Actualizado: <strong>Hace 2 días</strong>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Cambiar disponibilidad</h3>
            <div className={styles.statusPills}>
              {[
                "Disponible",
                "Reservado",
                "Vendido",
                "Arrendado",
                "Inactivo",
              ].map((status) => (
                <button
                  key={status}
                  className={`${styles.pill} ${status === "Disponible" ? styles.pillActive : ""}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Resumen de interacciones</h3>
            <div className={styles.metricsList}>
              <div className={styles.metricRow}>
                <span>Visualizaciones</span> <strong>312</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Me interesa</span>{" "}
                <strong style={{ color: "#15803D" }}>47</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Favoritos</span>{" "}
                <strong style={{ color: "#4338CA" }}>23</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Descartes</span> <strong>125</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Citas solicitadas</span>{" "}
                <strong style={{ color: "#C2410C" }}>8</strong>
              </div>
              <hr className={styles.divider} />
              <div className={styles.metricRow}>
                <span>Conversión interés → cita</span> <strong>17%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
