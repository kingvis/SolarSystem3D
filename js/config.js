// --- PLANET DATA ---
export const PLANETS = [
  {
    name: "Mercury",
    texture: "../img/mercury_hd.jpg",
    radius: 2,
    orbit: 50,
    speed: 1,
    facts: [
      "Mercury is the closest planet to the Sun!",
      "A year on Mercury is just 88 Earth days.",
      "Mercury has no moons or rings.",
      "Surface temperatures range from -180°C to 430°C."
    ],
    description: "Mercury is the smallest and innermost planet in the Solar System. Its orbital period around the Sun of 87.97 days is the shortest of all the planets. Mercury rotates in a way that is unique in the Solar System. It rotates three times for every two revolutions around the Sun.",
    stats: {
      "Diameter": "4,879 km",
      "Mass": "3.285 × 10²³ kg",
      "Distance from Sun": "57.9 million km",
      "Day Length": "59 Earth days",
      "Year Length": "88 Earth days",
      "Surface Gravity": "3.7 m/s²"
    }
  },
  {
    name: "Venus",
    texture: "../img/venus_hd.jpg",
    radius: 3,
    orbit: 70,
    speed: 0.75,
    facts: [
      "Venus spins backwards!",
      "Venus is the hottest planet in our solar system.",
      "A day on Venus is longer than its year.",
      "Venus is often called Earth's sister planet."
    ],
    description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's one of the four inner, terrestrial planets, and it's often called Earth's twin because it's similar in size and density. However, Venus has a thick atmosphere that traps heat in a runaway greenhouse effect.",
    stats: {
      "Diameter": "12,104 km",
      "Mass": "4.867 × 10²⁴ kg",
      "Distance from Sun": "108.2 million km",
      "Day Length": "243 Earth days",
      "Year Length": "225 Earth days",
      "Surface Gravity": "8.87 m/s²"
    }
  },
  {
    name: "Earth",
    texture: "../img/earth_hd.jpg",
    radius: 4,
    orbit: 90,
    speed: 0.5,
    facts: [
      "Earth is the only planet known to support life!",
      "70% of Earth's surface is covered by water.",
      "Earth has one moon.",
      "Earth's atmosphere is 78% nitrogen and 21% oxygen."
    ],
    description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% is covered with water. Earth's atmosphere consists mainly of nitrogen and oxygen.",
    stats: {
      "Diameter": "12,756 km",
      "Mass": "5.972 × 10²⁴ kg",
      "Distance from Sun": "149.6 million km",
      "Day Length": "24 hours",
      "Year Length": "365.25 days",
      "Surface Gravity": "9.81 m/s²"
    }
  },
  {
    name: "Mars",
    texture: "../img/mars_hd.jpg",
    radius: 3.5,
    orbit: 110,
    speed: 0.4,
    facts: [
      "Mars is home to the tallest volcano: Olympus Mons!",
      "Mars has two moons: Phobos and Deimos.",
      "Mars is known as the Red Planet.",
      "Mars has the largest dust storms in the solar system."
    ],
    description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. Mars is often called the 'Red Planet' due to its reddish appearance, which is distinctive among the astronomical bodies visible to the naked eye.",
    stats: {
      "Diameter": "6,792 km",
      "Mass": "6.39 × 10²³ kg",
      "Distance from Sun": "227.9 million km",
      "Day Length": "24.6 hours",
      "Year Length": "687 Earth days",
      "Surface Gravity": "3.71 m/s²"
    }
  },
  {
    name: "Jupiter",
    texture: "../img/jupiter_hd.jpg",
    radius: 10,
    orbit: 180,
    speed: 0.35,
    facts: [
      "Jupiter is the largest planet in our solar system!",
      "Jupiter has a giant storm called the Great Red Spot.",
      "Jupiter has at least 79 moons.",
      "Jupiter is a gas giant with no solid surface."
    ],
    description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun.",
    stats: {
      "Diameter": "139,820 km",
      "Mass": "1.898 × 10²⁷ kg",
      "Distance from Sun": "778.5 million km",
      "Day Length": "9.9 hours",
      "Year Length": "11.9 Earth years",
      "Surface Gravity": "24.79 m/s²"
    }
  },
  {
    name: "Saturn",
    texture: "../img/saturn_hd.jpg",
    radius: 8,
    orbit: 250,
    speed: 0.3,
    facts: [
      "Saturn's rings are made of ice and rock!",
      "Saturn has 83 moons.",
      "A year on Saturn is 29.5 Earth years.",
      "Saturn is the least dense planet in the solar system."
    ],
    description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is known for its distinctive ring system, which consists of nine continuous main rings and three discontinuous arcs.",
    stats: {
      "Diameter": "116,460 km",
      "Mass": "5.683 × 10²⁶ kg",
      "Distance from Sun": "1.4 billion km",
      "Day Length": "10.7 hours",
      "Year Length": "29.5 Earth years",
      "Surface Gravity": "10.44 m/s²"
    },
    ring: { texture: "../img/saturn_ring.jpg", inner: 10, outer: 14 },
  },
  {
    name: "Uranus",
    texture: "../img/uranus_hd.jpg",
    radius: 6,
    orbit: 320,
    speed: 0.25,
    facts: [
      "Uranus rotates on its side!",
      "Uranus has 27 known moons.",
      "Uranus is the coldest planet in the solar system.",
      "Uranus was the first planet discovered with a telescope."
    ],
    description: "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares, grandfather of Zeus and father of Cronus. It has the third-largest diameter in our solar system.",
    stats: {
      "Diameter": "50,724 km",
      "Mass": "8.681 × 10²⁵ kg",
      "Distance from Sun": "2.9 billion km",
      "Day Length": "17.2 hours",
      "Year Length": "84 Earth years",
      "Surface Gravity": "8.69 m/s²"
    }
  },
  {
    name: "Neptune",
    texture: "../img/neptune_hd.jpg",
    radius: 5,
    orbit: 380,
    speed: 0.2,
    facts: [
      "Neptune has the fastest winds in the solar system!",
      "Neptune has 14 known moons.",
      "A year on Neptune is 165 Earth years.",
      "Neptune was discovered through mathematical calculations."
    ],
    description: "Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. Neptune is 17 times the mass of Earth.",
    stats: {
      "Diameter": "49,244 km",
      "Mass": "1.024 × 10²⁶ kg",
      "Distance from Sun": "4.5 billion km",
      "Day Length": "16.1 hours",
      "Year Length": "165 Earth years",
      "Surface Gravity": "11.15 m/s²"
    }
  },
];

export const SUN = {
  name: "Sun",
  texture: "../img/sun_hd.jpg",
  radius: 20,
  fact: "The Sun contains 99.8% of the solar system's mass!",
  description: "The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, with internal convective motion that generates a magnetic field. It is by far the most important source of energy for life on Earth.",
  stats: {
    "Diameter": "1.392 million km",
    "Mass": "1.989 × 10³⁰ kg",
    "Surface Temperature": "5,500°C",
    "Core Temperature": "15 million°C",
    "Age": "4.6 billion years",
    "Type": "Yellow Dwarf"
  }
};

// --- CONSTANTS ---
export const CAMERA_CONFIG = {
  fov: 75,
  minDistance: 20,
  maxDistance: 1000,
  dampingFactor: 0.08,
  defaultPosition: [0, 50, 200]
};

export const SKYBOX_PATHS = [
  '../img/skybox/space_ft.png', '../img/skybox/space_bk.png',
  '../img/skybox/space_up.png', '../img/skybox/space_dn.png',
  '../img/skybox/space_rt.png', '../img/skybox/space_lf.png'
];

export const MUSIC_CONFIG = {
  url: './music.mp3',
  volume: 0.3,
  loop: true
}; 