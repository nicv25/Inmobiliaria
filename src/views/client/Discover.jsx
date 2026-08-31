import React, { useState, useRef, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import TinderCard from "react-tinder-card";
import {
  Undo2,
  X,
  Star,
  Heart,
  Info,
  MapPin,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import Filters from "../../components/client/Filters";
import PropertyDetails from "../../components/client/PropertyDetails";
import styles from "./Discover.module.css";

const initialDb = [
  {
    id: 1,
    name: "Loft Industrial en Laureles",
    location: "Laureles, Medellín",
    price: "$1800K/mes",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    compat: "76%",
  },
  {
    id: 2,
    name: "Apartamento en El Poblado",
    location: "El Poblado, Medellín",
    price: "$420M",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    compat: "82%",
  },
  {
    id: 3,
    name: "Penthouse en Chapinero Alto",
    location: "Chapinero Alto, Bogotá",
    price: "$850M",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    compat: "94%",
  },
];

const secondaryDb = [
  {
    id: 4,
    name: "Casa Campestre en Envigado",
    location: "Envigado, Antioquia",
    price: "$1200M",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    compat: "60%",
  },
  {
    id: 5,
    name: "Estudio Moderno Centro",
    location: "Centro, Bogotá",
    price: "$350M",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    compat: "55%",
  },
];

export default function Discover() {
  const { activePanel, setActivePanel } = useOutletContext();
  const [properties, setProperties] = useState(initialDb);
  const [currentIndex, setCurrentIndex] = useState(initialDb.length - 1);
  const currentIndexRef = useRef(currentIndex);

  const [stats, setStats] = useState({ likes: 0, rejects: 0, saves: 0 });
  const [swipeHistory, setSwipeHistory] = useState([]);

  const childRefs = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map(() => React.createRef()),
    [],
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const handleSwipe = (dir, idx) => {
    setStats((prev) => ({
      ...prev,
      likes: dir === "right" ? prev.likes + 1 : prev.likes,
      rejects: dir === "left" ? prev.rejects + 1 : prev.rejects,
      saves: dir === "up" ? prev.saves + 1 : prev.saves,
    }));

    setSwipeHistory((prev) => [...prev, dir]);
    updateCurrentIndex(idx - 1);
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0 && currentIndex < properties.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (currentIndex < properties.length - 1) {
      const newIndex = currentIndex + 1;
      const lastDir = swipeHistory[swipeHistory.length - 1];

      if (lastDir) {
        setStats((prev) => ({
          ...prev,
          likes: lastDir === "right" ? prev.likes - 1 : prev.likes,
          rejects: lastDir === "left" ? prev.rejects - 1 : prev.rejects,
          saves: lastDir === "up" ? prev.saves - 1 : prev.saves,
        }));
        setSwipeHistory((prev) => prev.slice(0, -1));
      }

      updateCurrentIndex(newIndex);
      await childRefs[newIndex].current.restoreCard();
    }
  };

  const reloadDeck = () => {
    setProperties(secondaryDb);
    updateCurrentIndex(secondaryDb.length - 1);
    setStats({ likes: 0, rejects: 0, saves: 0 });
    setSwipeHistory([]);
  };

  const openDetails = () => {
    if (activePanel === "default") setActivePanel("details");
  };

  return (
    <div className={styles.container}>
      <div className={styles.swipeArea}>
        <div className={styles.cardStack}>
          {currentIndex < 0 && (
            <div className={styles.endOfDeck}>
              <RefreshCw
                size={48}
                color="var(--primary-color)"
                style={{ marginBottom: "1rem" }}
              />
              <h3>Has visto todas las propiedades</h3>
              <p>No hay más resultados exactos para tus filtros.</p>
              <button onClick={reloadDeck} className={styles.reloadBtn}>
                Ver opciones fuera de mis preferencias
              </button>
            </div>
          )}

          {properties.map((property, index) => (
            <TinderCard
              ref={childRefs[index]}
              key={property.id}
              className={styles.swipeWrapper}
              onSwipe={(dir) => handleSwipe(dir, index)}
              preventSwipe={["down"]}
            >
              <div className={styles.card}>
                <div className={styles.imageContainer}>
                  <img src={property.img} alt={property.name} />
                  <div className={styles.tagsTop}>
                    <span className={styles.tagDark}>Apartamento</span>
                    <span className={styles.tagCompat}>
                      ● {property.compat}
                    </span>
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2>{property.name}</h2>
                      <p className={styles.location}>
                        <MapPin size={14} /> {property.location}
                      </p>
                    </div>
                    <h2 className={styles.price}>{property.price}</h2>
                  </div>
                  <button
                    onClick={openDetails}
                    className={styles.detailsLink}
                    style={{
                      opacity: activePanel !== "default" ? 0.5 : 1,
                      cursor:
                        activePanel !== "default" ? "not-allowed" : "pointer",
                    }}
                    disabled={activePanel !== "default"}
                  >
                    Ver detalles completos ›
                  </button>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.btnWrapper}>
            <button
              onClick={() => goBack()}
              className={`${styles.actionBtn} ${styles.btnUndo}`}
            >
              <Undo2 size={24} />
            </button>
            <span className={styles.btnLabel}>Deshacer</span>
          </div>
          <div className={styles.btnWrapper}>
            <button
              onClick={() => swipe("left")}
              className={`${styles.actionBtn} ${styles.btnReject}`}
            >
              <X size={32} />
            </button>
            <span className={styles.btnLabel}>Descartar</span>
          </div>
          <div className={styles.btnWrapper}>
            <button
              onClick={() => swipe("up")}
              className={`${styles.actionBtn} ${styles.btnStar}`}
            >
              <Star size={24} />
            </button>
            <span className={styles.btnLabel}>Guardar</span>
          </div>
          <div className={styles.btnWrapper}>
            <button
              onClick={() => swipe("right")}
              className={`${styles.actionBtn} ${styles.btnLike}`}
            >
              <Heart size={32} />
            </button>
            <span className={styles.btnLabel}>Me interesa</span>
          </div>
          <div className={styles.btnWrapper}>
            <button
              onClick={openDetails}
              className={`${styles.actionBtn} ${styles.btnInfo}`}
              disabled={activePanel !== "default"}
              style={{ opacity: activePanel !== "default" ? 0.5 : 1 }}
            >
              <Info size={24} />
            </button>
            <span className={styles.btnLabel}>Detalles</span>
          </div>
        </div>
      </div>

      <div className={styles.sidePanel}>
        {activePanel === "filters" && (
          <Filters onClose={() => setActivePanel("default")} />
        )}
        {activePanel === "details" && (
          <PropertyDetails
            onClose={() => setActivePanel("default")}
            property={properties[currentIndex >= 0 ? currentIndex : 0]}
          />
        )}

        {activePanel === "default" && (
          <>
            <div className={styles.panelCard}>
              <h4
                style={{
                  fontSize: "0.75rem",
                  color: "#8E92A4",
                  margin: "0 0 1rem 0",
                }}
              >
                SESIÓN ACTUAL
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#22C55E",
                    }}
                  >
                    {stats.likes}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#8E92A4" }}>
                    Interés
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#EF4444",
                    }}
                  >
                    {stats.rejects}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#8E92A4" }}>
                    Descartadas
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#F59E0B",
                    }}
                  >
                    {stats.saves}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#8E92A4" }}>
                    Guardadas
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.tipsCard}>
              <h4
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Lightbulb size={16} /> Optimiza tu búsqueda
              </h4>
              <p>
                Desliza hacia arriba o usa la estrella para guardar las
                propiedades que más llamen tu atención. Podrás agendar visitas o
                compararlas más tarde en tu sección de Favoritos.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
