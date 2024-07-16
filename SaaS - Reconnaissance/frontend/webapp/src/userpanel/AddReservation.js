import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../header/Header";

function AddReservation() {
    const navigate = useNavigate();

    const handleReservation = () => {
        window.location.href = 'http://localhost:8888'; // Redirection vers YouTube
    };

    return (
        <div>
            <Header></Header>
            <div className="row justify-content-center">
                <div className="col-9">
                    <h3 className='mt-3 mb-3'>Réserver un véhicule</h3>
                    <div className='row'>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="plate_number" name="plate_number" placeholder="Immatricule" />
                                <label htmlFor="plate_number">Adresse de départ</label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="dropoff_location" name="dropoff_location" placeholder="Adresse d'arrivée" />
                                <label htmlFor="dropoff_location">Adresse d'arrivée</label>
                            </div>
                        </div>  
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="car" name="car" placeholder="Voiture"/>
                        <label htmlFor="car">Voiture</label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary me-3">Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={handleReservation}>Réserver</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddReservation;
