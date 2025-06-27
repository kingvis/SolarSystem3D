import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { SKYBOX_PATHS } from './config.js';

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.skybox = null;
  }

  // --- SKYBOX & STARFIELD ---
  createMaterialArray() {
    const materialArray = SKYBOX_PATHS.map((image) => {
      let texture = new THREE.TextureLoader().load(image);
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });
    return materialArray;
  }

  setSkyBox() {
    const materialArray = this.createMaterialArray();
    let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    this.skybox = new THREE.Mesh(skyboxGeo, materialArray);
    this.scene.add(this.skybox);
  }

  addStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2000;
      positions[i + 1] = (Math.random() - 0.5) * 2000;
      positions[i + 2] = (Math.random() - 0.5) * 2000;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(stars);
  }

  // --- LIGHTING ---
  setupLighting(sunMesh, mode = 'realistic') {
    // Remove existing lights
    const lightsToRemove = [];
    this.scene.traverse(child => {
      if (child.isLight) {
        lightsToRemove.push(child);
      }
    });
    lightsToRemove.forEach(light => this.scene.remove(light));

    if (mode === 'fun') {
      // Fun mode: colorful, vibrant lighting
      const pinkLight = new THREE.PointLight(0xff00cc, 1.5, 0);
      pinkLight.position.copy(sunMesh.position);
      this.scene.add(pinkLight);

      const purpleLight = new THREE.PointLight(0x9933ff, 0.8, 0);
      purpleLight.position.set(50, 30, 50);
      this.scene.add(purpleLight);

      const orangeLight = new THREE.PointLight(0xff6b35, 0.6, 0);
      orangeLight.position.set(-50, -30, -50);
      this.scene.add(orangeLight);
    } else {
      // Realistic mode: natural, cool lighting
      const sunLight = new THREE.PointLight(0xffffff, 1.2, 0);
      sunLight.position.copy(sunMesh.position);
      this.scene.add(sunLight);

      const ambientLight = new THREE.AmbientLight(0x001122, 0.3);
      this.scene.add(ambientLight);
    }
  }

  // --- SKYBOX MODE CHANGES ---
  updateSkyboxForMode(mode) {
    if (this.skybox) {
      this.skybox.material.forEach(material => {
        if (mode === 'fun') {
          material.opacity = 0.6;
          material.color.set(0xff00cc);
        } else {
          material.opacity = 1;
          material.color.set(0xffffff);
        }
      });
    }
  }

  // --- ASTEROID BELT ---
  createAsteroidBelt() {
    // Create a visual ring for the asteroid belt
    const beltRingGeometry = new THREE.RingGeometry(115, 155, 64);
    const beltRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const beltRing = new THREE.Mesh(beltRingGeometry, beltRingMaterial);
    beltRing.rotation.x = Math.PI / 2;
    this.scene.add(beltRing);

    const asteroidCount = 500;
    const asteroidGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const asteroidMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xcccccc,
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < asteroidCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 120 + Math.random() * 30;
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      asteroid.position.x = Math.cos(angle) * radius;
      asteroid.position.z = Math.sin(angle) * radius;
      asteroid.position.y = (Math.random() - 0.5) * 15;
      this.scene.add(asteroid);
    }
  }

  createBackgroundAsteroids() {
    const asteroidCount = 100;
    const asteroidGeometry = new THREE.SphereGeometry(0.1, 6, 6);
    const asteroidMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x888888,
      transparent: true,
      opacity: 0.6
    });

    for (let i = 0; i < asteroidCount; i++) {
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      asteroid.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000
      );
      this.scene.add(asteroid);
    }
  }

  getScene() {
    return this.scene;
  }

  getSkybox() {
    return this.skybox;
  }
} 