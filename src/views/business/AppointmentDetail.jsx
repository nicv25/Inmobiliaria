import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Calendar as CalIcon, X } from "lucide-react";
import styles from "./AppointmentDetail.module.css";

export default function AppointmentDetail() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={24} /> Detalle de cita
        </button>
      </div>

      <div className={styles.content}>
        {/* Cliente */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Información del cliente</h2>
          <div className={styles.clientProfile}>
            <div className={styles.avatar}>ML</div>
            <div>
              <h3>María López</h3>
              <p>cliente@correo.com • +57 300 000 0000</p>
            </div>
          </div>
          <div className={styles.messageBubble}>
            "Me interesa mucho el apartamento. ¿Es posible visitarlo en la
            mañana?"
          </div>
        </div>

        {/* Inmueble */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Inmueble</h2>
          <div className={styles.propertyPreview}>
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&q=80"
              alt="Inmueble"
            />
            <div>
              <h3>Apartamento Rosales</h3>
              <p>Rosales • $650M</p>
              <span className={styles.statusGreen}>Disponible</span>
            </div>
          </div>
        </div>

        {/* Fecha y hora */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Fecha y hora solicitadas</h2>
          <div className={styles.dateTimeRow}>
            <div>
              <span className={styles.label}>FECHA</span>
              <strong>8 Jul 2026</strong>
            </div>
            <div>
              <span className={styles.label}>HORA</span>
              <strong>10:00 AM</strong>
            </div>
            <div>
              <span className={styles.label}>ESTADO</span>
              <span className={styles.statusYellow}>Pendiente</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Acciones</h2>
          <div className={styles.inputGroup}>
            <label>OBSERVACIONES O MOTIVO (OPCIONAL)</label>
            <textarea placeholder="Indica el motivo del rechazo o comentarios adicionales..."></textarea>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnAccept}>
              <Check size={18} /> Aceptar cita
            </button>
            <button className={styles.btnReschedule}>
              <CalIcon size={18} /> Nueva fecha
            </button>
            <button className={styles.btnReject}>
              <X size={18} /> Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
