import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Header() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Perceptive Automotive</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto"> 
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Accueil</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Mon compte
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/Connexion">Connexion</a></li>
                <li><a class="dropdown-item" href="/Inscription">Inscription</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Header;
