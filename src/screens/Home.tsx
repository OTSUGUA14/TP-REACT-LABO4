import { useState, useEffect } from "react";
import "../styles/Home.css";

const images = [
  { src: "/img/nro1.jpg", alt: "Instrumento 1" },
  { src: "/img/nro2.jpg", alt: "Instrumento 2" },
  { src: "/img/nro3.jpg", alt: "Instrumento 3" },
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="home-container">
      <h1>Bienvenidos a Musical Hendrix</h1>
      <div className="slider-container">
        <img
          className="slider-image"
          src={images[current].src}
          alt={images[current].alt}
        />
        <div className="slider-buttons">
          <button className="slider-button" onClick={prevImage}>◀</button>
          <button className="slider-button" onClick={nextImage}>▶</button>
        </div>
      </div>
      <div className="home-description">
        <p>
          Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
          experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca
          de las mejores elecciones para tu compra musical.
        </p>
      </div>
    </div>
  );
};

export default Home;
