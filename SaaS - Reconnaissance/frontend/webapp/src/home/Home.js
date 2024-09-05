import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import Header from "../header/Header";
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {

  const navigate = useNavigate();
  
  const handleRedirect = () => {
    navigate('/Reserver'); 
  };

  return (
    <div class="">
      <Header></Header>
      <div className="row justify-content-center">
        <div className="col-10 ">
          <h2 className="mt-3">Perceptive Automotive - Accueil</h2>
          <div className="row justify-content-center mt-3 bg-light p-4">
            <div className="col-4">
              <h5>Réserver votre taxi en quelques clics !</h5>
              <p>Profitez d'un service rapide et fiable pour vos déplacements. Que ce soit pour un trajet en ville, vers la gare ou l'aéroport, réservez votre taxi en ligne en toute simplicité et sécurité.</p>
              <button type="button" class="btn btn-success" onClick={handleRedirect} >Réserver un taxi</button>
            </div>
            <div className="col-8">

              <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img style={{opacity: 0.5, objectFit: "cover"}} width={"100%"} height={"100%"} className="rounded shadow-lg img-fluid" src="https://static.vecteezy.com/ti/vecteur-libre/p1/10167807-location-de-voiture-reservation-reservation-et-partage-en-utilisant-le-service-application-mobile-avec-itineraire-ou-points-emplacement-dans-illustration-plate-de-dessin-anime-dessine-a-la-main-vectoriel.jpg" class="d-block w-100" alt="Planifiez votre trajet"/>
                    <div class="carousel-caption d-none d-md-block">
                      <h5 class="text-dark">Réservez facilement votre trajet</h5>
                      <p class="text-dark">Choisissez votre destination et réservez votre taxi en quelques clics via notre application. Simple, rapide et efficace.</p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img style={{opacity: 0.5, objectFit: "cover"}} width={"100%"} height={"100%"} className="rounded shadow-lg img-fluid" src="https://img.freepik.com/photos-gratuite/voiture-taxi-smartphone-alerte-notification-cloche-contextuelle-rappel-message-chat-bulles-pour-concept-service-transport-ligne-banniere-web-icone-dessin-anime-fond-symbole-illustration-3d_56104-2001.jpg" class="d-block w-100" alt="Attendez votre taxi"/>
                    <div class="carousel-caption d-none d-md-block">
                      <h5 class="text-dark">Suivez l'arrivée de votre taxi</h5>
                      <p class="text-dark">Restez informé en temps réel de l'approche de votre taxi grâce à notre système de suivi précis et fiable.</p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img style={{opacity: 0.5, objectFit: "cover"}} width={"100%"} height={"100%"} className="rounded shadow-lg img-fluid" src="https://www.blablastore.fr/_i/131565/19918/3647/22/sans-chauffeur-et-maintenant-aussi-sans-volant-les-taxis-autonomes-chinois-qui-commencent-a-etre-testes-en-2023.jpeg" class="d-block w-100" alt="Taxi autonome"/>
                    <div class="carousel-caption d-none d-md-block">
                      <h5 class="text-dark">Découvrez nos taxis autonomes</h5>
                      <p class="text-dark" >Vivez l'avenir du transport avec nos taxis autonomes. Une solution innovante pour un trajet confortable et sécurisé.</p>
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev dark" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span class="carousel-control-next-icon dark" style={{textColor: "black" }} aria-hidden="true"></span>
                  <span class="visually-hidden text-dark" style={{backgroundColor: "black" }}>Next</span>
                </button>
              </div>



            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
