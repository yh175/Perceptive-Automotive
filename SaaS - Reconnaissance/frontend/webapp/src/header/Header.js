import React, { useContext } from 'react';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { AuthContext } from "../context/AuthProvider";

function Header() {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Perceptive automotive</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Accueil</a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/Reserver">Réserver</a>
            </li>
    

            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle btn" data-bs-toggle="dropdown" aria-expanded="false">
                Mon compte
              </button>
              <ul className="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
                {user ? (
                  <>
                    {user.role === 'admin' ? (
                      <li><a className="dropdown-item" href="/Administration">Panneau d'administration</a></li>
                    ) : (
                      <li><a className="dropdown-item" href="/Dashboard">Mon compte</a></li>
                    )}
                    <li><a className="dropdown-item" href="/Administration">Mes informations</a></li>
                    <li><hr class="dropdown-divider"/></li>
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

        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Rechercher</button>
        </form>

      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" defer></script>

    </nav>
  );
}

export default Header;
