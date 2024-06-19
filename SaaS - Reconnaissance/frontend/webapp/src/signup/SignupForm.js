import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';


function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState(""); // Pour afficher la réponse

  const isFormValid = () => {
    // Vérifiez si tous les champs sont remplis et si le mot de passe est valide
    return username.trim() !== "" && email.trim() !== "" && passwordIsValid();
  };

  const passwordIsValid = () => {
    // Vérifiez si le mot de passe a au moins 8 caractères, un chiffre et une majuscule
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
     
    // Créez un objet contenant les données à envoyer au serveur
    const data = {
      username: username,
      email: email,
      password: password,
    };

    // Effectuez une requête POST vers votre API d'authentification
    fetch("http://127.0.0.1:8080/api/auth/signup", {
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
          <h2>Inscription</h2>
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
              <label class="form-label" for="form2Example1">Nom d'utilisateur</label>
            </div>        
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6">
            <div class="form-floating  mb-4">
              <input type="email" id="form2Example1" class="form-control" value={email}
              onChange={(e) => setEmail(e.target.value)} />
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
      
        <div class="row justify-content-center">
          <div class="col-5">
            <center>
              <button type="submit" class="btn btn-primary mb-4" onClick={handleSignup} disabled={!isFormValid()}>S'enregistrer</button>
            </center>
          </div>
        </div>
      </form>
    </div>

  );
}

export default SignupForm;
