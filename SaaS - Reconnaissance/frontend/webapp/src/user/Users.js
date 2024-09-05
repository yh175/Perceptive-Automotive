import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Header from "../header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
  const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken;
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: []
  });

  // Ajouter une référence pour le modal
  const modalRef = useRef(null);

  const fetchUsersData = async () => {
    try {
      const token = getToken();
      console.log("Token sent:", token);

      const response = await fetch("http://localhost:8080/api/users", {
        headers: {
          'x-access-token': token
        },
        method: "GET"
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        alert(`Error: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      const usersWithRoles = data.map(user => ({
        ...user,
        roles: user.roles || []
      }));

      setUserData(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => {
        if (checked) {
          return { ...prevState, roles: [...prevState.roles, value] };
        } else {
          return { ...prevState, roles: prevState.roles.filter(role => role !== value) };
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const token = getToken();
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("User added successfully!");
        fetchUsersData();

        // Fermer le modal
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.hide();
      } else {
        const errorData = await response.json();
        console.error("Error adding user:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          'x-access-token': token
        },
      });
      if (response.ok) {
        fetchUsersData();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };



  return (
    <div className="">
      <Header />
      <div className="row justify-content-center">
        <div className="col-10">
          <h2 className="mt-3">Panneau d'administration - Gestion des utilisateurs</h2>
          <div className="row justify-content-center mt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nom d'utilisateur</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map(user => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.roles.length > 0 ? (
                        user.roles.map((role, index) => (
                          <span key={index} className="badge bg-primary me-1">
                            {role.name}
                          </span>
                        ))
                      ) : (
                        <span>Aucun rôle</span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => navigate(`/Administration/Utilisateur/Modifier/${user.id}`)}
                      >
                        Modifier
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
                      >Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row justify-content-end">
              <div className="col-auto">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Ajouter un utilisateur
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Ajouter un utilisateur</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" id="username" name="username" placeholder="Nom d'utilisateur" value={formData.username} onChange={handleChange} />
                          <label htmlFor="username">Nom d'utilisateur</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                          <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" id="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
                          <label htmlFor="password">Mot de passe</label>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Rôles</label>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="roleUser" name="roles" value="Basic User" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="roleUser">Basic User</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="roleModerator" name="roles" value="Moderator" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="roleModerator">Moderator</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="roleAdmin" name="roles" value="Admin" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="roleAdmin">Admin</label>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enregistrer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
