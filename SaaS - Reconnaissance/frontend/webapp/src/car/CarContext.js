// src/CarContext.js
import React, { createContext, useState } from 'react';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <CarContext.Provider value={{ selectedCar, setSelectedCar }}>
      {children}
    </CarContext.Provider>
  );
};

export default CarContext;
