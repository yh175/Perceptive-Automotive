import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import Header from "../header/Header";


function Home() {
  return (
    <div class="">
      <Header></Header>
      <div className="row justify-content-center">
        <div className="col-10">
          <h2 className="mt-3">Panneau d'administration - Accueil</h2>
          <div className="row justify-content-center mt-3">
            
            <div className="col-3">
              <div class="card bg-body-tertiary" style={{width: "18rem"}}>
                <div class="card-body">
                  <h5 class="card-title">Parc automobile</h5>
                  <p class="card-text">X automobile(s) disponibles sur X</p>
                  <a href="/Administration/Voitures " class="btn btn-secondary">Gérer</a>
                </div>
              </div>
            </div>

            <div className="col-3">
              <div class="card bg-body-tertiary" style={{width: "18rem"}}>
                <div class="card-body">
                  <h5 class="card-title">Utilisateurs</h5>
                  <p class="card-text">X utilisateur(s) connectés sur X</p>
                  <a href="#" class="btn btn-secondary">Gérer</a>
                </div>
              </div>
            </div>

            <div className="col-3">
              <div class="card bg-body-tertiary" style={{width: "18rem"}}>
                <div class="card-body">
                  <h5 class="card-title">Commandes</h5>
                  <p class="card-text">X commandes ce mois-ci</p>
                  <a href="#" class="btn btn-secondary">Gérer</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
