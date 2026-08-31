import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Heart, Star, Calendar, Plus } from "lucide-react";
import styles from "./Properties.module.css";

const dbProperties = [
  {
    id: 1,
    name: "Apartamento Rosales",
    location: "Rosales",
    type: "Apartamento",
    transaction: "Venta",
    price: "$650M",
    status: "Disponible",
    views: 312,
    likes: 47,
    favs: 23,
    apps: 8,
    date: "15 May 2026",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80",
  },
  {
    id: 2,
    name: "Casa Chicó",
    location: "Chicó",
    type: "Casa",
    transaction: "Arriendo",
    price: "$4500K/mes",
    status: "Reservado",
    views: 198,
    likes: 31,
    favs: 18,
    apps: 5,
    date: "2 Jun 2026",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80",
  },
];

export default function Properties() {
  const navigate = useNavigate(); // Inicializamos el hook
  const [filter, setFilter] = useState("Todos");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mis inmuebles</h1>
        <button
          onClick={() => navigate("/inmobiliaria/registrar")}
          className={styles.addBtn}
        >
          <Plus size={18} /> Registrar inmueble
        </button>
      </div>

      <div className={styles.searchBar}>
        <input type="text" placeholder="Buscar por nombre o barrio..." />
      </div>

      <div className={styles.filters}>
        {[
          "Todos",
          "Disponible",
          "Reservado",
          "Vendido",
          "Arrendado",
          "Inactivo",
        ].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ""}`}
          >
            {f}
          </button>
        ))}
        <div className={styles.divider}></div>
        {["Venta", "Arriendo"].map((f) => (
          <button key={f} className={styles.filterBtn}>
            {f}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {dbProperties.map((prop) => (
          <div key={prop.id} className={styles.propertyCard}>
            <img src={prop.img} alt={prop.name} className={styles.cardImg} />

            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <h3>{prop.name}</h3>
                <span
                  className={`${styles.badge} ${prop.status === "Disponible" ? styles.bgGreen : styles.bgOrange}`}
                >
                  {prop.status}
                </span>
              </div>

              <div className={styles.cardDetails}>
                <span>📍 {prop.location}</span>
                <span>
                  {prop.type} • {prop.transaction}
                </span>
                <span className={styles.price}>{prop.price}</span>
              </div>

              <div className={styles.cardMetrics}>
                <span>
                  <Eye size={14} /> {prop.views}
                </span>
                <span>
                  <Heart size={14} /> {prop.likes}
                </span>
                <span style={{ color: "#F59E0B" }}>
                  <Star size={14} /> {prop.favs}
                </span>
                <span>
                  <Calendar size={14} /> {prop.apps} citas
                </span>
                <span className={styles.publishDate}>
                  • Publicado {prop.date}
                </span>
              </div>
            </div>

            <div className={styles.cardActions}>
              {/* Ajusta estos 3 botones */}
              <button
                onClick={() => navigate(`/inmobiliaria/inmuebles/${prop.id}`)}
                className={styles.actionBtn}
              >
                Ver
              </button>
              <button
                onClick={() =>
                  navigate(`/inmobiliaria/editar-inmueble/${prop.id}`)
                }
                className={styles.actionBtn}
              >
                Editar
              </button>
              <button
                onClick={() => navigate(`/inmobiliaria/inmuebles/${prop.id}`)}
                className={styles.actionBtn}
              >
                Estado
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
