import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import './PasswordStrength.css'; // Importer le fichier CSS

function SignupForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState(""); // Pour afficher la réponse

  const passwordCriteria = {
    length: { isValid: password.length >= 8, message: "Au moins 8 caractères" },
    uppercase: { isValid: /[A-Z]/.test(password), message: "Au moins une majuscule" },
    number: { isValid: /\d/.test(password), message: "Au moins un chiffre" },
  };

  const isFormValid = () => {
    return username.trim() !== "" && email.trim() !== "" && Object.values(passwordCriteria).every(criterion => criterion.isValid);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const data = { username, email, password };

    fetch("http://127.0.0.1:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        navigate("/Connexion")
      })
      .catch((error) => {
        console.error("Erreur lors de la requête POST : ", error);
        setResponseText("Erreur lors de la connexion.");
      });
  };

  return (
    <div className="container">
      <br></br>
      <div className="row justify-content-center">
        <center>
          <h2>Inscription</h2>
        </center>
      </div>
      <br></br>
      <p>{responseText}</p>
      <form>
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="form-floating  mb-4">
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="form-label" htmlFor="username">Nom d'utilisateur</label>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="form-floating  mb-4">
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label" htmlFor="email">Email</label>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="form-floating mb-4">
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label" htmlFor="password">Mot de passe</label>
            </div>
            {password && (
              <div className="password-criteria">
                {Object.values(passwordCriteria).map((criterion, index) => (
                  <div key={index} className={`criteria ${criterion.isValid ? 'valid' : ''}`}>
                    {criterion.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-5">
            <center>
              <button
                type="submit"
                className="btn btn-primary mb-4"
                onClick={handleSignup}
                disabled={!isFormValid()}
              >
                S'enregistrer
              </button>
            </center>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
