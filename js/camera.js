import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { CAMERA_CONFIG } from './config.js';

export class CameraManager {
  constructor(container) {
    this.container = container;
    this.camera = null;
    this.controls = null;
    this.followingPlanet = null;
    this.targetPosition = new THREE.Vector3();
    this.isAnimating = false;
    this.cameraOrbitAngle = 0;
    this.cameraOrbitSpeed = 0.01; // radians per frame
    this.cameraOrbitRadius = 30; // default, will be set per planet
  }

  // --- CAMERA SETUP ---
  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      CAMERA_CONFIG.fov,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      2000
    );
    this.camera.position.set(...CAMERA_CONFIG.defaultPosition);
    return this.camera;
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.container);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = CAMERA_CONFIG.dampingFactor;
    this.controls.minDistance = CAMERA_CONFIG.minDistance;
    this.controls.maxDistance = CAMERA_CONFIG.maxDistance;
    this.controls.enablePan = true;
    this.controls.enableZoom = true;
    this.controls.enableRotate = true;
    return this.controls;
  }

  // --- RAYCASTING ---
  setupRaycasting() {
    // This method is called from main.js but the actual raycasting is handled in PlanetManager
    // We keep this method for compatibility
  }

  // --- CAMERA ANIMATIONS ---
  followPlanet(planetMesh, mode) {
    if (mode === 'realistic' || mode === 'fun') {
      this.followingPlanet = planetMesh;
      this.isAnimating = false; // We'll use orbiting instead
      // Get planet info for better positioning
      const planetMeshChild = planetMesh.children[0];
      const planetData = planetMeshChild.userData;
      // Set orbit radius for a close look
      const planetRadius = planetData.radius || 5;
      this.cameraOrbitRadius = planetRadius * 3 + 2;
      // Set initial angle based on current camera position
      const planetPosition = planetMesh.position.clone();
      const camPos = this.camera ? this.camera.position.clone() : new THREE.Vector3(planetPosition.x + this.cameraOrbitRadius, planetPosition.y, planetPosition.z);
      this.cameraOrbitAngle = Math.atan2(camPos.z - planetPosition.z, camPos.x - planetPosition.x);
    }
  }

  stopFollowing() {
    this.followingPlanet = null;
    this.isAnimating = false;
  }

  // --- ZOOM CONTROLS ---
  smoothZoom(delta) {
    const currentDistance = this.camera.position.length();
    const newDistance = Math.max(
      CAMERA_CONFIG.minDistance,
      Math.min(CAMERA_CONFIG.maxDistance, currentDistance + delta)
    );
    
    const direction = this.camera.position.normalize();
    this.camera.position.copy(direction.multiplyScalar(newDistance));
  }

  // --- RESIZE HANDLING ---
  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  // --- UPDATE LOOP ---
  update() {
    if (this.controls) {
      this.controls.update();
    }
    // Orbit camera around selected planet
    if (this.followingPlanet) {
      const planetMesh = this.followingPlanet;
      const planetMeshChild = planetMesh.children[0];
      const planetData = planetMeshChild.userData;
      const planetPosition = planetMesh.position.clone();
      // Animate orbit angle
      this.cameraOrbitAngle += this.cameraOrbitSpeed;
      // Calculate camera position in orbital plane
      const x = planetPosition.x + Math.cos(this.cameraOrbitAngle) * this.cameraOrbitRadius;
      const z = planetPosition.z + Math.sin(this.cameraOrbitAngle) * this.cameraOrbitRadius;
      const y = planetPosition.y; // stay in orbital plane
      this.camera.position.lerp(new THREE.Vector3(x, y, z), 0.1);
      this.controls.target.lerp(planetPosition, 0.1);
    }
  }

  // --- GETTERS ---
  getCamera() {
    return this.camera;
  }

  getControls() {
    return this.controls;
  }

  isFollowingPlanet() {
    return this.followingPlanet !== null;
  }

  showTopView(sunPosition, maxOrbit) {
    this.stopFollowing();
    // Place camera above the Sun, looking down
    const distance = maxOrbit * 1.3; // Add margin
    this.camera.position.set(sunPosition.x, distance, sunPosition.z);
    this.controls.target.set(sunPosition.x, 0, sunPosition.z);
    this.camera.lookAt(sunPosition.x, 0, sunPosition.z);
  }
} 