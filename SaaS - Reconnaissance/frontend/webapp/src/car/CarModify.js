import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../header/Header";

function CarModify() {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(''); // État pour le message d'erreur
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/car/get/${id}`);
        const data = await response.json();
        setCarData(data);
        setImage(data.image); // Initialiser l'état image avec la valeur du carData
        validateImageUrl(data.image); // Valider l'image lors du chargement initial
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value
    });
    if (name === 'image') {
      setImage(value); // Mettre à jour l'état image lorsque le champ image change
      validateImageUrl(value); // Valider l'URL de l'image
    }
  };

  const handleStatusChange = (e) => {
    setCarData({
      ...carData,
      status: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/car/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(carData)
      });
      const data = await response.json();
      console.log("Car updated:", data);
      navigate("/Administration/Voitures");
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const validateImageUrl = (url) => {
    if (!url) {
      setImageError(''); // Réinitialiser l'erreur si le champ est vide
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImageError(''); // L'image est valide
    };
    img.onerror = () => {
      setImageError("L'URL ne pointe pas vers une image valide."); // Erreur si l'image ne se charge pas
    };

    img.src = url; // Déclenche le chargement de l'image
  };

  if (!carData) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="row justify-content-center mt-3">
        <div className="col-9">
          <h3>Modifier la voiture</h3>
          <div className="form-floating mb-3 mt-3">
            <input type="text" className="form-control" id="plate_number" name="plate_number" placeholder="Immatricule" value={carData.plate_number} onChange={handleChange} />
            <label htmlFor="plate_number">Immatricule</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="model" name="model" placeholder="Modèle" value={carData.model} onChange={handleChange} />
            <label htmlFor="model">Modèle</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="brand" name="brand" placeholder="Marque" value={carData.brand} onChange={handleChange} />
            <label htmlFor="brand">Marque</label>
          </div>
          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="year" name="year" placeholder="Année" value={carData.year} onChange={handleChange} />
            <label htmlFor="year">Année</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="color" name="color" placeholder="Couleur" value={carData.color} onChange={handleChange} />
            <label htmlFor="color">Couleur</label>
          </div>
          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="seating_capacity" name="seating_capacity" placeholder="Nombre de places" value={carData.seating_capacity} onChange={handleChange} />
            <label htmlFor="seating_capacity">Nombre de places</label>
          </div>
          <div className="form-floating mb-3">
            <select className="form-select" id="statut" value={carData.status} onChange={handleStatusChange} aria-label="Floating label select example">
              <option value="available">Disponible</option>
              <option value="in_service">En service</option>
              <option value="maintenance">En maintenance</option>
            </select>
            <label htmlFor="statut">Statut</label>
          </div>

          <div className="input-group mb-3">
            <input type="text" className="form-control" id="image" name="image" placeholder="Image" value={image} onChange={handleChange} aria-describedby="button-addon2" />
            <button className="btn btn-primary" type="button" id="button-addon2" disabled={!image || imageError}  data-bs-toggle="modal" data-bs-target="#exampleModal" >Prévisualiser l'image</button>
          </div>
          {imageError && <div className="text-danger mb-3">{imageError}</div>} {/* Affichage de l'erreur */}
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary me-3" onClick={() => navigate("/Administration/Voitures")}>Annuler</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enregistrer</button>
          </div>
        </div>
      </div>
      {/* Modal  */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Image de la voiture</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src={image} className='img-fluid rounded' />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarModify;
