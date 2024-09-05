import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import '@fortawesome/fontawesome-free/css/all.css';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState(""); // Pour afficher la réponse
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const data = await login(username, password);
      setResponseText(`Réponse du serveur : ${JSON.stringify(data)}`);
  
      // Check if data and data.roles are defined
      if (data && Array.isArray(data.roles)) {
        const roles = data.roles; // Directly access roles since it's already an array of strings
        console.log('Roles:', roles);
  
        // Check user roles and navigate accordingly
        if (roles.includes('Admin') || roles.includes('Moderator')) {
          navigate("/Administration");
        } else if (roles.includes('Basic User')) {
          navigate("/Dashboard");
        } else {
          setResponseText("Rôle utilisateur inconnu");
        }
      } else {
        console.error("Les rôles de l'utilisateur ne sont pas définis ou ne sont pas un tableau :", data);
        setResponseText("Erreur : Les rôles de l'utilisateur ne sont pas définis ou sont mal formatés.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
      setResponseText("Erreur lors de la connexion");
    }
  };
  

  return (
    <div className="container">
      <br></br>
      <div className="row justify-content-center">
        <center>
          <h2>Connectez vous</h2>
        </center> 
      </div>
      <br></br>
      <form>

        <div className="row justify-content-center">
            <div className="col-6">
              {responseText && (
                <div className="alert alert-danger" role="alert">
                  {responseText}
                </div>
              )}
            </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="form-floating  mb-4">
              <input type="text" id="form2Example1" className="form-control" value={username}
              onChange={(e) => setUsername(e.target.value)} />
              <label className="form-label" htmlFor="form2Example1">Nom d'utilisateur</label>
            </div>        
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="form-floating mb-4">
              <input type="password" id="form2Example2" className="form-control" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
              <label className="form-label" htmlFor="form2Example2">Mot de passe</label>
            </div>
          </div>
        </div>
      
        <div className="row mb-4 justify-content-center">
          <div className="col-3 d-flex">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
              <label className="form-check-label" htmlFor="form2Example31"> Se souvenir de moi </label>
            </div>
          </div>
      
          <div className="col-3 d-flex justify-content-end">
            <a href="#!">Mot de passe oublié ?</a>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-5">
            <center>
              <button type="submit" className="btn btn-primary mb-4" onClick={handleLogin}>Connexion</button>
            </center>
          </div>
        </div>
        <div className="text-center">
          <p>Pas encore membre ? <a href="Inscription">S'inscrire</a></p>
          <p>ou se connecter avec : </p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>
      
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>
      
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>
      
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
