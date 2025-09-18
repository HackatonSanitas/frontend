import React from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import Header from "../../components/header/Header";
import portada from "../../assets/image5.svg";

const Home = () => {
  return (
         <main className="home">
         <div className="home__image-container">
            <img src={portada} alt="Medicamentos" className="home__image" />
        </div>
        <div className="home__content">
          <h2 className="home__title">Tu dosis, siempre a tiempo</h2>
          <p className="home__description">
            Nuestra aplicación te ayuda a organizar la dosificación de tus
            medicamentos de manera sencilla y segura.
          </p>
          <Link to="/recordatorios" className="home__button">Empieza ahora</Link>
        </div>
      </main>

  );
};

export default Home;