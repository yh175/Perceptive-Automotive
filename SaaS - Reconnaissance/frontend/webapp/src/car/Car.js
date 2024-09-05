import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Header from "../header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importez Bootstrap ici
import { Modal } from 'bootstrap'; // Importez Modal depuis Bootstrap

function Car() {

  const navigate = useNavigate();

  const [carData, setCarData] = useState([]);
  const [formData, setFormData] = useState({
    plate_number: '',
    model: '',
    brand: '',
    year: 0,
    color: '',
    seating_capacity: 0,
    price_kilometer: 0,
    image: ''
  });

  // Fonction pour récupérer les données des voitures
  const fetchCarData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/car/getAll");
      const data = await response.json();
      setCarData(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  // Utiliser useEffect pour récupérer les données au montage du composant
  useEffect(() => {
    fetchCarData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Fonction pour envoyer les données du formulaire pour enregistrer une nouvelle voiture
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/car/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Actualiser la liste des voitures après l'ajout
        fetchCarData();

        // Fermer la modal après l'ajout
        const modalElement = document.getElementById('exampleModal');
        const modalInstance = Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        } else {
          new Modal(modalElement).hide();
        }

        // Réinitialiser le formulaire
        setFormData({
          plate_number: '',
          model: '',
          brand: '',
          year: 0,
          color: '',
          seating_capacity: 0,
          price_kilometer: 0,
          image: ''
        });

      } else {
        console.error("Failed to add car");
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  // Fonction pour supprimer une voiture
  const handleDelete = async (carId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/car/delete/${carId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Actualiser la liste des voitures après suppression
        fetchCarData();
      } else {
        console.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="">
      <Header />
      <div className="row justify-content-center">
        <div className="col-10">
          <h2 className="mt-3">Panneau d'administration - Gestion des voitures</h2>
          <div className="row justify-content-center mt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Immatricule</th>
                  <th scope="col">Modèle</th>
                  <th scope="col">Marque</th>
                  <th scope="col">Année</th>
                  <th scope="col">Couleur</th>
                  <th scope="col">Nombre de siège</th>
                  <th scope="col">Statut</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {carData.map(car => (
                  <tr key={car.id}>
                    <th scope="row">{car.id}</th>
                    <td>
                      <img src={car.image} className='img-fluid' style={{ height: '100px', width: '200px', objectFit: 'cover' }}  />
                    </td>
                    <td>{car.plate_number}</td>
                    <td>{car.model}</td>
                    <td>{car.brand}</td>
                    <td>{car.year}</td>
                    <td>{car.color}</td>
                    <td>{car.seating_capacity}</td>
                    <td>{car.status}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => navigate(`/Administration/Voitures/Modifier/${car.id}`)}
                      >
                        Modifier
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleDelete(car.id)}
                      >Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row justify-content-end">
              <div className="col-auto">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Ajouter une voiture
                </button>
                <div className="modal fade modal-lg" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Ajouter une voiture</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className='row'>
                          <div className='col'>
                            <div className="form-floating mb-3">
                              <input type="text" className="form-control" id="plate_number" name="plate_number" placeholder="Immatricule" value={formData.plate_number} onChange={handleChange} />
                              <label htmlFor="plate_number">Immatricule</label>
                            </div>
                          </div>
                          <div className='col'>                            

                            <div className="form-floating">
                              <select className="form-select" id="brand" aria-label="Floating label select example" value={formData.brand} onChange={handleChange} name="brand">
                                <option value="">Sélectionnez une marque</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Honda">Honda</option>
                                <option value="Ford">Ford</option>
                                <option value="Chevrolet">Chevrolet</option>
                                <option value="Nissan">Nissan</option>
                                <option value="BMW">BMW</option>
                                <option value="Mercedes-Benz">Mercedes-Benz</option>
                                <option value="Audi">Audi</option>
                                <option value="Volkswagen">Volkswagen</option>
                                <option value="Hyundai">Hyundai</option>
                                <option value="Kia">Kia</option>
                                <option value="Peugeot">Peugeot</option>
                                <option value="Renault">Renault</option>
                                <option value="Fiat">Fiat</option>
                                <option value="Mazda">Mazda</option>
                              </select>
                              <label htmlFor="brand">Marque</label>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col'>
                            <div className="form-floating mb-3">
                              <input type="text" className="form-control" id="model" name="model" placeholder="Modèle" value={formData.model} onChange={handleChange} />
                              <label htmlFor="model">Modèle</label>
                            </div>
                          </div>
                          <div className='col'>
                            <div className="form-floating mb-3">
                              <input type="number" className="form-control" id="year" name="year" placeholder="Année" value={formData.year} onChange={handleChange} />
                              <label htmlFor="year">Année</label>
                            </div>
                          </div>
                        </div>

                        <div className='row'>                          
                          <div className='col'>
                            <div className="form-floating mb-3">
                              <input type="number" className="form-control" id="seating_capacity" name="seating_capacity" placeholder="Nombre de places" value={formData.seating_capacity} onChange={handleChange} min={1} max={8}/>
                              <label htmlFor="seating_capacity">Nombre de places</label>
                            </div>
                          </div>
                          <div className='col'>
                            <div className="form-floating mb-3">
                              <input type="text" className="form-control" id="color" name="color" placeholder="Couleur" value={formData.color} onChange={handleChange} />
                              <label htmlFor="color">Couleur</label>
                            </div>
                          </div>                          
                        </div>
                        
                        <div className="form-floating mb-3">
                          <input type="number" className="form-control" id="price_kilometer" name="price_kilometer" placeholder="Prix par kilomètre (€)" value={formData.price_kilometer} onChange={handleChange}/>
                          <label htmlFor="price_kilometer">Prix par kilomètre (€)</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" id="image" name="image" placeholder="Lien de l'image" value={formData.image} onChange={handleChange}/>
                          <label htmlFor="image">Lien de l'image</label>
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

export default Car;
