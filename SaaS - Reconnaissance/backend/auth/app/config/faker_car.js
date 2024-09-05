const { faker } = require('@faker-js/faker');

// Fonction pour générer des coordonnées aléatoires en France
const generateFrenchCoordinates = () => {
  const latMin = 41.303;
  const latMax = 51.124;
  const lonMin = -5.141;
  const lonMax = 9.561;

  // Utilisation de faker.number.float pour générer un nombre flottant
  const latitude = faker.number.float({ min: latMin, max: latMax, precision: 0.0001 });
  const longitude = faker.number.float({ min: lonMin, max: lonMax, precision: 0.0001 });

  return {
    latitude: latitude.toFixed(6),
    longitude: longitude.toFixed(6)
  };
};

const generateCar = async () => {
  const coordinates = generateFrenchCoordinates();

  const car = {
    plate_number: faker.vehicle.vrm(),
    model: faker.vehicle.model(),
    brand: faker.vehicle.manufacturer(),
    year: faker.date.past(30).getFullYear(),
    color: faker.vehicle.color(),
    seating_capacity: faker.number.int({ min: 2, max: 7 }),
    location_lat: coordinates.latitude,
    location_lon: coordinates.longitude,
    price_kilometer: faker.finance.amount(0.5, 5.0, 2),
    status: faker.helpers.arrayElement(['available', 'in_service', 'maintenance']),
    image: faker.image.url()
  };

  console.log(car);
};

// Génère et affiche les données pour une voiture
generateCar();
