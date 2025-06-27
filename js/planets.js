import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { PLANETS, SUN } from './config.js';

export class PlanetManager {
  constructor() {
    this.planets = [];
    this.sun = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.planetMeshes = new Map();
  }

  // --- SUN CREATION ---
  createSun() {
    const sunGeometry = new THREE.SphereGeometry(12, 64, 64);
    const sunTexture = new THREE.TextureLoader().load('./img/sun_hd.jpg');
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.position.set(0, 0, 0);
    sunMesh.name = 'Sun';
    this.sun = sunMesh;
    return sunMesh;
  }

  // --- PLANET CREATION ---
  createPlanet(planetData) {
    const planetGeometry = new THREE.SphereGeometry(planetData.radius, 32, 32);
    const planetTexture = new THREE.TextureLoader().load(planetData.texture);
    const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTexture });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    
    // Add planet glow effect
    const glowGeometry = new THREE.SphereGeometry(planetData.radius + 0.5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4444ff,
      transparent: true,
      opacity: 0.2
    });
    const planetGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    planet.add(planetGlow);
    
    // Store planet data
    planet.userData = { ...planetData };
    
    // Create orbit path (but do NOT add to planet group)
    const orbitGeometry = new THREE.RingGeometry(planetData.orbit - 0.1, planetData.orbit + 0.1, 128);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    orbit.position.set(0, 0, 0); // Always centered at the sun
    
    // Create planet group
    const planetGroup = new THREE.Group();
    planetGroup.add(planet);
    
    // Add rings for Saturn
    if (planetData.ring) {
      const ringGeometry = new THREE.RingGeometry(planetData.ring.inner, planetData.ring.outer, 32);
      const ringTexture = new THREE.TextureLoader().load(planetData.ring.texture);
      const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      planetGroup.add(ring);
    }
    
    this.planetMeshes.set(planetData.name, planetGroup);
    // Return both planetGroup and orbit
    return { planetGroup, orbit };
  }

  createAllPlanets() {
    this.planets = [];
    this.orbits = [];
    PLANETS.forEach(planetData => {
      const { planetGroup, orbit } = this.createPlanet(planetData);
      this.planets.push(planetGroup);
      this.orbits.push(orbit);
    });
    return { planets: this.planets, orbits: this.orbits };
  }

  // --- ORBIT ANIMATIONS ---
  updatePlanetOrbits(time, mode) {
    this.planets.forEach((planetGroup, index) => {
      const planet = planetGroup.children[0]; // The actual planet mesh
      const planetData = planet.userData;
      
      // Calculate orbit position
      const angle = time * planetData.speed * 0.001;
      const x = Math.cos(angle) * planetData.orbit;
      const z = Math.sin(angle) * planetData.orbit;
      
      planetGroup.position.set(x, 0, z);
      
      // Planet rotation
      planet.rotation.y += 0.01;
      
      // Mode-specific effects
      if (mode === 'fun') {
        planet.rotation.x = Math.sin(time * 0.001) * 0.1;
        planet.rotation.z = Math.cos(time * 0.001) * 0.1;
      }
    });
  }

  // --- SUN ANIMATION ---
  updateSun(time, mode) {
    if (this.sun) {
      this.sun.rotation.y += 0.005;
      
      if (mode === 'fun') {
        // Fun sun effects
        this.sun.scale.setScalar(1 + Math.sin(time * 0.002) * 0.1);
        this.sun.material.color.setHex(0xff00ff);
      } else {
        this.sun.scale.setScalar(1);
        this.sun.material.color.setHex(0xffffff);
      }
    }
  }

  // --- RAYCASTING & INTERACTION ---
  setupRaycasting(camera) {
    this.raycaster.setFromCamera(this.mouse, camera);
  }

  getIntersectedPlanet() {
    // Get all planet meshes for raycasting
    const planetMeshes = Array.from(this.planetMeshes.values()).map(group => group.children[0]);
    const intersects = this.raycaster.intersectObjects(planetMeshes);
    
    if (intersects.length > 0) {
      // Find the planet group that contains this mesh
      const intersectedMesh = intersects[0].object;
      for (const [planetName, planetGroup] of this.planetMeshes) {
        if (planetGroup.children[0] === intersectedMesh) {
          return planetGroup; // Return the group, not just the mesh
        }
      }
    }
    return null;
  }

  updateMousePosition(event, container) {
    this.mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;
  }

  // --- SHOOTING STARS ---
  createShootingStar() {
    const starGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    
    // Random starting position
    star.position.set(
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000
    );
    
    // Random velocity
    star.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    
    star.userData.life = 100;
    return star;
  }

  updateShootingStars(shootingStars, mode) {
    shootingStars.forEach((star, index) => {
      star.position.add(star.userData.velocity);
      star.userData.life--;
      
      if (mode === 'fun') {
        star.material.color.setHex(Math.random() * 0xffffff);
      }
      
      if (star.userData.life <= 0) {
        shootingStars.splice(index, 1);
      }
    });
  }

  // --- GETTERS ---
  getPlanets() {
    return this.planets;
  }

  getSun() {
    return this.sun;
  }

  getPlanetMeshes() {
    return this.planetMeshes;
  }

  getPlanetByName(name) {
    return this.planetMeshes.get(name);
  }
} 