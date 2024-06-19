import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CarModify() {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/car/get/${id}`);
        const data = await response.json();
        setCarData(data);
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
      // Redirection ou autre action après la mise à jour
      navigate("/Administration/Voitures");
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  if (!carData) return <div>Loading...</div>;

  return (
    <div>
      <h3>Modifier la voiture</h3>
      <div className="row justify-content-end">
        <div className="col-auto">
          <div className="form-floating mb-3">
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
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/Administration/Voitures")}>Annuler</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarModify;
