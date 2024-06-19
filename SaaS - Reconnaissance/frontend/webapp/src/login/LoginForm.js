import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';


function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState(""); // Pour afficher la réponse

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Créez un objet contenant les données à envoyer au serveur
    const data = {
      username: username,
      password: password,
    };

    // Effectuez une requête POST vers votre API d'authentification
    fetch("http://127.0.0.1:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Mettez à jour l'état pour afficher la réponse
        setResponseText(`Réponse du serveur : ${JSON.stringify(data)}`);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête POST : ", error);
        setResponseText("Erreur lors de la connexion.");
      });
  };

  return (
    <div class="container">
      <br></br>
      <div class="row justify-content-center">
        <center>
          <h2>Connectez vous</h2>
        </center> 
      </div>
      <br></br>
      <p>{responseText}</p> 
      <form>
        <div class="row justify-content-center">
          <div class="col-6">
            <div class="form-floating  mb-4">
              <input type="email" id="form2Example1" class="form-control" value={username}
              onChange={(e) => setUsername(e.target.value)} />
              <label class="form-label" for="form2Example1">Email</label>
            </div>        
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6">
            <div class="form-floating mb-4">
              <input type="password" id="form2Example2" class="form-control" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
              <label class="form-label" for="form2Example2">Mot de passe</label>
            </div>
          </div>
        </div>
      
        <div class="row mb-4 justify-content-center">
          <div class="col-3 d-flex">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form2Example31" />
              <label class="form-check-label" for="form2Example31"> Se souvenir de moi </label>
            </div>
          </div>
      
          <div class="col-3 d-flex justify-content-end">
            <a href="#!">Mot de passe oublié ?</a>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-5">
            <center>
              <button type="submit" class="btn btn-primary mb-4" onClick={handleLogin}>Connexion</button>
            </center>
          </div>
        </div>
        <div class="text-center">
          <p>Pas encore membre ? <a href="#!">S'inscrire</a></p>
          <p>ou se connecter avec : </p>
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>
      
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-google"></i>
          </button>
      
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>
      
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>

  );
}

export default LoginForm;
