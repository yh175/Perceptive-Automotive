// src/services/auth.service.js
const API_URL = "http://localhost:8080/api/auth/";

const login = async (username, password) => {
  const response = await fetch(API_URL + "signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  if (data.accessToken) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  
  return data;
};

const logout = () => {
  return new Promise((resolve) => {
    localStorage.removeItem("user");
    resolve();
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser
};
