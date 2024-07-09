import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../header/Header";

function UserModify() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [availableRoles] = useState(['Basic User', 'Moderator', 'Admin']); // Liste des rôles disponibles
  const navigate = useNavigate();

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken;
  };
  const token = getToken();

  useEffect(() => {
    const fetchUserData = async () => {
      try { 
        const response = await fetch(`http://localhost:8080/api/user/${id}`, {
          headers: {
            'x-access-token': token
          }
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, token]);     

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    setUserData(prevState => {
      if (checked && !prevState.roles.find(role => role.name === value)) {
        return { ...prevState, roles: [...prevState.roles, { name: value }] };
      } else {
        return { ...prevState, roles: prevState.roles.filter(role => role.name !== value) };
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          roles: userData.roles.map(role => role.name) // Envoyer seulement les noms des rôles
        })
      });
      const data = await response.json();
      console.log("User updated:", data);
      navigate("/Administration/Utilisateurs");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  if (!userData) return <div>Loading...</div>;

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', options);
  };

  return (
    <div>
      <Header></Header>
      <div className="row justify-content-center mt-3">
        <div className="col-9">
          <h3>Modifier l'utilisateur</h3>
          <div className="form-floating mb-3 mt-3">
            <input type="text" className="form-control" id="username" name="username" placeholder="Nom d'utilisateur" value={userData.username} onChange={handleChange} />
            <label htmlFor="username">Nom d'utilisateur</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="mb-3">
            <label className="form-label">Rôles</label>
            {availableRoles.map(role => (
              <div className="form-check" key={role}>
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`role-${role}`} 
                  value={role} 
                  checked={userData.roles.some(userRole => userRole.name === role)} 
                  onChange={handleRoleChange} 
                />
                <label className="form-check-label" htmlFor={`role-${role}`}>
                  {role}
                </label>
              </div>
            ))}
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="createdAt" name="createdAt" disabled placeholder="Enregistré le" value={formatDate(userData.createdAt)} onChange={handleChange} />
            <label htmlFor="createdAt">Enregistré le</label>
          </div>
          <div className="row">  
            <div className="col d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-3" onClick={() => navigate("/Administration/Utilisateurs")}>Annuler</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enregistrer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModify;
