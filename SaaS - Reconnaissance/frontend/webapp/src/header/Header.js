import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext } from "../context/AuthProvider";

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Perceptive automotive</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Accueil</a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/Reserver">Réserver</a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Mon compte
            </a>
            <ul class="dropdown-menu">
              {user ? (
                <>
                  <li><a className="dropdown-item" href="/Administration">Panneau d'administration</a></li>
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

      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Rechercher" aria-label="Search"></input>
        <button class="btn btn-outline-success" type="submit">Rechercher</button>
      </form>

    </div>
  </nav>
  );
}

export default Header;
