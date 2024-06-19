import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';
import NotFound from './notfound/NotFound';
import Signup from './signup/Signup';
import Car from './car/Car';
import CarModify from './car/CarModify';


function App() {
  return (
    <div>

        <Router>
          <Routes>
            <Route path="Connexion" element={<Login />} />
            <Route path="Accueil" element={<Home />} />
            <Route path="" element={<Home />} />
            <Route path="Inscription" element={<Signup />} />
            <Route path="Administration/Voitures" element={<Car />} />
            <Route path="Administration/Voitures/Modifier" element={<CarModify />} />

            {/* Page 404*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>

    </div>
  );
}

export default App;
