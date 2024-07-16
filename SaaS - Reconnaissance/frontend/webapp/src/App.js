import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import Login from './login/Login';
import Home from './home/Home'; 
import NotFound from './notfound/NotFound';
import Signup from './signup/Signup';
import Car from './car/Car';
import CarModify from './car/CarModify';
import AdminPanel from './adminpanel/AdminPanel';
import Users from './user/Users';
import UserModify from './user/UserModify';
import UserPanel from './userpanel/UserPanel';
import AddReservation from './userpanel/AddReservation';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="Connexion" element={<Login />} />
            <Route path="Accueil" element={<Home />} />
            <Route path="" element={<Home />} />
            <Route path="Inscription" element={<Signup />} />
            <Route path="Administration/Voitures" element={
              <PrivateRoute>
                <Car />
              </PrivateRoute>
            } />
            <Route path="Administration/Voitures/Modifier/:id" element={
              <PrivateRoute>
                <CarModify />
              </PrivateRoute>
            } />
            <Route path="Administration" element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            } />
            <Route path="Administration/Utilisateurs" element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            } />
            <Route path="Administration/Utilisateur/Modifier/:id" element={
              <PrivateRoute>
                <UserModify />
              </PrivateRoute>
            } />
            <Route path="Dashboard" element={
              <PrivateRoute>
                <UserPanel />
              </PrivateRoute>
            } />
            <Route path="Reserver" element={
              <PrivateRoute>
                <AddReservation />
              </PrivateRoute>
            } />
            {/* Page 404*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
