import React from "react";
import { Link } from "react-router-dom";
import "../css/Accueil.css";

function Accueil() {
  return (
    <div className="accueil">
      <aside className="accueil__title">
        <div className="accueil__mainTitle">
          <h1>KIND OF COOL</h1>
          <h2>FRIP EN LIGNE</h2>
        </div>

        {/* <div className="accueil__onglets">
          <h2>categorie 1</h2>
          <h2>categorie 2</h2>
          <h2>categorie 3</h2>
        </div> */}
      </aside>
      <div>
        <div className="accueil__categories">
          <Link to="/product">
            <h2>Nos Produits</h2>
            <img src="../img/kind_of_cool_logo.jpeg" alt="logo" />
          </Link>
          <Link to="/">
            <h2>Qui sommes nous ?</h2>
            <img src="../img/logo3.jpg" alt="logo" />
          </Link>
          <Link to="/">
            <h2>Contactez-nous</h2>
            <img src="../img/logo2.jpg" alt="logo" />
          </Link>
        </div>
        <div className="accueil__categories__reverse">
          <img src="../img/reverse_logo2.jpg" alt="logo" />

          <img src="../img/reverse_logo3.jpg" alt="logo" />

          <img src="../img/reverse_kind_of_cool_logo.jpeg" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Accueil;
