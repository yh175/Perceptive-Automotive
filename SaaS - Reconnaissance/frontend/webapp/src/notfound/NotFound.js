// NotFound.js
import React from 'react';
import Header from '../header/Header';

const NotFound = () => {
  return (
    <div>
      <Header></Header>    
      <div class="container mt-3">
        <h2>Page introuvable</h2>
        <p>Désolé, la page que vous cherchez n'existe pas</p>
      </div>
    </div>
  );
}

export default NotFound;
