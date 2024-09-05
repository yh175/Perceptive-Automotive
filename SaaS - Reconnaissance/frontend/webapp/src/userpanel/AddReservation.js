import React, { useState, useEffect, useRef } from 'react';
import { FaExchangeAlt,FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import Header from '../header/Header';

function AddReservation() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [startCoords, setStartCoords] = useState(null);
    const [endCoords, setEndCoords] = useState(null);
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);
    const mapRef = useRef(null);
    const [showCarousel, setShowCarousel] = useState(false); // État pour la visibilité du carrousel
    const [carData, setCarData] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null); // État pour la voiture sélectionnée
    const [routeDistance, setRouteDistance] = useState(null);

    // Fonction pour récupérer les données des voitures
    const fetchCarData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/car/getAll");
            const data = await response.json();
            setCarData(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching car data:", error);
        }
    };

    useEffect(() => {
        fetchCarData(); // Récupérez les données des voitures lors du chargement du composant
    }, []);

    const fetchSuggestions = async (query, setSuggestions) => {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=pk.eyJ1Ijoic291bGV5YmFkaGFoYSIsImEiOiJjbGl2aXphZHYwOWIzM21uNWFzOGx2bW9lIn0.DjRisz0axfK6QGWIgn_41Q&autocomplete=true&types=address&bbox=-25.0,34.0,50.0,72.0`
        );
        const data = await response.json();
        if (data.features) {
            setSuggestions(data.features);
        }
    };

    useEffect(() => {
        if (useCurrentLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setStartCoords([latitude, longitude]);

                // Géocodage inversé pour obtenir l'adresse
                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoic291bGV5YmFkaGFoYSIsImEiOiJjbGl2aXphZHYwOWIzM21uNWFzOGx2bW9lIn0.DjRisz0axfK6QGWIgn_41Q`
                );
                const data = await response.json();
                if (data.features && data.features.length > 0) {
                    const placeName = data.features[0].place_name;
                    setStart(placeName);
                } else {
                    setStart('Ma position');
                }
            });
        }
    }, [useCurrentLocation]);

    useEffect(() => {
        handleSearch();
    }, [startCoords, endCoords]);

    const handleSearch = () => {
        if (startCoords && endCoords) {
            if (mapRef.current) {
                mapRef.current.remove();
            }
    
            const map = L.map('map').setView(startCoords, 13);
            mapRef.current = map;
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
    
            const routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(startCoords[0], startCoords[1]),
                    L.latLng(endCoords[0], endCoords[1])
                ],
                router: L.Routing.mapbox('pk.eyJ1Ijoic291bGV5YmFkaGFoYSIsImEiOiJjbGl2aXphZHYwOWIzM21uNWFzOGx2bW9lIn0.DjRisz0axfK6QGWIgn_41Q'),
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: 'blue', opacity: 0.6, weight: 5 }]
                },
                createMarker: () => null
            }).addTo(map);
    
            routingControl.on('routesfound', (e) => {
                const routes = e.routes;
                if (routes.length > 0) {
                    const route = routes[0];
                    const routeCoordinates = route.coordinates;
                    const bounds = L.latLngBounds(routeCoordinates.map(coord => [coord.lat, coord.lng]));
                    map.fitBounds(bounds);
                    setShowCarousel(true);
    
                    // Récupération de la distance en kilomètres
                    const distanceInKm = (route.summary.totalDistance / 1000).toFixed(2);
                    setRouteDistance(distanceInKm);
                }
            });
        }
    };
    

    const handleSwap = () => {
        setStartCoords((prev) => {
            setStartCoords(endCoords);
            setEndCoords(prev);
            return prev;
        });

        setStart((prev) => {
            setEnd(prev);
            return end;
        });

        handleSearch();
    };

    const handleLocationToggle = (e) => {
        setUseCurrentLocation(e.target.checked);
    };

    const handleStartChange = (e) => {
        const query = e.target.value;
        setStart(query);
        if (query.length > 2) {
            fetchSuggestions(query, setStartSuggestions);
        } else {
            setStartSuggestions([]);
        }
    };

    const handleEndChange = (e) => {
        const query = e.target.value;
        setEnd(query);
        if (query.length > 2) {
            fetchSuggestions(query, setEndSuggestions);
        } else {
            setEndSuggestions([]);
        }
    };

    const handleSelectStart = (feature) => {
        setStart(feature.place_name);
        setStartCoords([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
        setStartSuggestions([]);
    };

    const handleSelectEnd = (feature) => {
        setEnd(feature.place_name);
        setEndCoords([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
        setEndSuggestions([]);
    };

    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const handleSelectCar = (car) => {
        setSelectedCar(car); // Met à jour la voiture sélectionnée
    };

    const handleReservation = async () => {
        if (!startCoords || !endCoords || !selectedCar || !routeDistance) {
            alert('Veuillez sélectionner tous les champs requis (départ, arrivée, voiture, etc.)');
            return;
        }
    
        // Générer l'heure actuelle comme date de début de réservation
        const now = new Date();
        const startTime = now.toISOString();
        
        // Ajouter une estimation de l'heure de fin (par exemple, 1 heure après le début)
        const endTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    
        // Préparez les données à envoyer à l'API
        const reservationData = {
            user_id: 1, // Remplace ceci par l'ID réel de l'utilisateur connecté
            vehicle_id: selectedCar.id,
            start_time: startTime,
            end_time: endTime,
            pickup_location: start,
            dropoff_location: end,
            total_cost: (routeDistance * selectedCar.price_kilometer).toFixed(2),
            status: 'Pending', // Optionnel, peut être défini par défaut dans l'API
            payment_status: 'Pending' // Optionnel, peut être défini par défaut dans l'API
        };
        const getToken = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            return user?.accessToken;
        };
        const token = getToken();
        try {
            console.log("token : "+token);
            
            // Envoyez la requête POST à l'API
            const response = await fetch('http://localhost:8080/api/reservation/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'x-access-token': token
                },
                body: JSON.stringify(reservationData),
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de la réservation');
            }
    
            const result = await response.json();
            console.log('Réservation réussie', result);
            alert('Réservation confirmée avec succès !');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de la réservation');
        }
    };
    
    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h1>Réserver un trajet</h1>
                <div className="row mb-3 align-items-center">
                    <div className="col-md-5 mb-3">
                        <label htmlFor="start" className="form-label">Départ</label>
                        <input
                            type="text"
                            className="form-control"
                            value={start}
                            onChange={handleStartChange}
                            disabled={useCurrentLocation}
                        />
                        {startSuggestions.length > 0 && (
                            <ul className="list-group position-absolute w-100">
                                {startSuggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => handleSelectStart(suggestion)}
                                    >
                                        {suggestion.place_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="form-check mt-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="useCurrentLocation"
                                checked={useCurrentLocation}
                                onChange={handleLocationToggle}
                            />
                            <label className="form-check-label" htmlFor="useCurrentLocation">
                                Ma position
                            </label>
                        </div>
                    </div>

                    <div className="col-md-2 text-center">
                        <button className="btn btn-light" onClick={handleSwap} style={{ borderRadius: '50%' }}>
                            <FaExchangeAlt size={24} />
                        </button>
                    </div>

                    <div className="col-md-5 mb-3">
                        <label htmlFor="end" className="form-label">Arrivée</label>
                        <input
                            type="text"
                            className="form-control"
                            value={end}
                            onChange={handleEndChange}
                        />
                        {endSuggestions.length > 0 && (
                            <ul className="list-group position-absolute w-100">
                                {endSuggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => handleSelectEnd(suggestion)}
                                    >
                                        {suggestion.place_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleSearch}>OK</button>
                <div id="map" style={{ height: '500px', width: '100%' }} className="mt-4 mb-5"></div>
                {showCarousel && (
                    <div>
                        <h2>Choisissez la voiture</h2>
                        <div className="d-flex justify-content-between align-items-center mb-5 mt-4">
                            <button className="btn" onClick={scrollLeft}>
                                <FaChevronLeft size={24} />
                            </button>
                            <div
                                ref={carouselRef}
                                className="d-flex overflow-auto"
                                style={{ 
                                    scrollBehavior: 'smooth', 
                                    width: '100%',
                                    maxHeight: '100%', // Assurez-vous que le conteneur ne dépasse pas la hauteur disponible
                                    overflow: 'unset !important', /* Cache le défilement vertical */
                                }}
                            >
                                {carData.map((car) => (
                                    <div
                                        key={car.id}
                                        className={`card me-3 ${selectedCar?.id === car.id ? 'border border-primary border-3' : ''}`}
                                        style={{ 
                                            minWidth: '15rem', 
                                            maxWidth: '15rem', 
                                            height: '18rem' // Ajustez la hauteur pour éviter le défilement
                                        }}
                                    >
                                        <img
                                            src={car.image}
                                            className="card-img-top"
                                            alt={car.title}
                                            style={{ 
                                                height: '150px', // Ajustez la hauteur de l'image pour mieux s'adapter
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{car.brand}</h5>
                                            <p className="card-text">{car.model}</p>
                                            {/* {car.image} */}
                                            <div className='row justify-content-between'>
                                                <div className='col'>
                                                    <button className="btn btn-primary btn-sm" onClick={() => handleSelectCar(car)}>Sélectionner</button>
                                                </div>
                                                <div className='col d-flex justify-content-end'>
                                                    <h4 style={{margin: '0px', padding: '0px'}}>{car.price_kilometer}</h4>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-light" onClick={scrollRight}>
                                <FaChevronRight size={24} />
                            </button>
                        </div>
                            
                        <div className='border mb-5 rounded container mt-3 bg-light' style={{width: '50%'}}>
                            <h3 className='mt-3 border-bottom px-2'>Détail de la réservation</h3>
                            <div className='row mt-3 justify-content-around px-2'>                        
                                <div className='col-6 border-end'>
                                    <p>Départ : <b>{start ? start : 'Non renseigné'}</b></p>
                                </div>
                                <div className='col-6'>
                                    <p>Arrivée : <b>{end ? end : 'Non renseigné'}</b></p>
                                </div>       
                            </div>
                            <div className='row mt-1 justify    -content-around px-2'>                        
                                <p>Distance départ-arrivée : <b> {routeDistance ? `${routeDistance} km` : 'Calcul en cours...'}</b></p>          
                            </div>
                            <div className='row mt-1 justify-content-around px-2'>                        
                                <p>Prix par kilomètre : <b>{selectedCar ? `${selectedCar.price_kilometer} €` : 'Aucune voiture sélectionnée'}</b></p>
                            </div>
                            <div className='row mt-1 justify-content-around px-2'>                        
                                <p>Voiture : <b>{selectedCar ? `${selectedCar.brand} ${selectedCar.model} (${selectedCar.year})` : 'Aucune voiture sélectionnée'}</b></p>
                            </div>                    
                            <div className='row mt-1 justify-content-around px-2'>                        
                                <p>Total : <b>{routeDistance * (selectedCar ? selectedCar.price_kilometer : 0)} €</b></p>                        
                            </div>
                            <div className='row mt-1 mb-3 justify-content-end px-2'>  
                                <div className='col-5 d-flex justify-content-end'>
                                    <button type="button" class="btn btn-success" onClick={handleReservation}>Confirmer la réservation</button>      
                                </div>
                            </div>
                        </div>
                    </div>        
                )}

            </div>
        </div>
    );
}

export default AddReservation;
