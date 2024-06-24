import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext } from "../context/AuthProvider";

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Perceptive Automotive</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto"> 
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Accueil</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Mon compte
              </a>
              <ul className="dropdown-menu">
                {user ? (
                  <>
                    <li><a className="dropdown-item" href="/Administration">Mes informations</a></li>
                    <li><button className="dropdown-item" onClick={logout}>Déconnexion</button></li>
                  </>
                ) : (
                  <>
                    <li><a className="dropdown-item" href="/Connexion">Connexion</a></li>
                    <li><a className="dropdown-item" href="/Inscription">Inscription</a></li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
