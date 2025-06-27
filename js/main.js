import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { SceneManager } from './scene.js';
import { CameraManager } from './camera.js';
import { PlanetManager } from './planets.js';
import { UIManager } from './ui.js';

class SolarSystem {
  constructor() {
    console.log('SolarSystem constructor called');
    this.container = document.getElementById('container');
    
    if (!this.container) {
      console.error('Container element not found!');
      return;
    }
    
    this.renderer = null;
    this.sceneManager = new SceneManager();
    this.cameraManager = new CameraManager(this.container);
    this.planetManager = new PlanetManager();
    this.uiManager = new UIManager();
    
    this.scene = this.sceneManager.getScene();
    this.camera = null;
    this.controls = null;
    
    this.shootingStars = [];
    this.currentMode = 'realistic';
    this.animationId = null;
    
    this.init();
  }

  // --- INITIALIZATION ---
  async init() {
    try {
      console.log('Starting initialization...');
      this.uiManager.showLoadingScreen();
      
      // Setup renderer
      this.setupRenderer();
      console.log('Renderer setup complete');
      
      // Setup camera and controls
      this.camera = this.cameraManager.setupCamera();
      this.controls = this.cameraManager.setupControls();
      console.log('Camera and controls setup complete');
      
      // Setup scene
      this.setupScene();
      console.log('Scene setup complete');
      
      // Setup UI
      this.uiManager.setupControls();
      console.log('UI setup complete');
      
      // Setup event listeners
      this.setupEventListeners();
      console.log('Event listeners setup complete');
      
      // Start animation loop
      this.animate();
      console.log('Animation loop started');
      
      this.uiManager.hideLoadingScreen();
      console.log('Initialization complete!');
      
    } catch (error) {
      console.error('Initialization error:', error);
      this.uiManager.showError('Failed to initialize solar system');
    }
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
  }

  setupScene() {
    // Create skybox and starfield
    this.sceneManager.setSkyBox();
    this.sceneManager.addStarfield();
    
    // Create sun
    const sun = this.planetManager.createSun();
    this.scene.add(sun);
    
    // Create planets and orbits
    const { planets, orbits } = this.planetManager.createAllPlanets();
    orbits.forEach(orbit => this.scene.add(orbit));
    planets.forEach(planet => this.scene.add(planet));
    
    // Create asteroid belt
    this.sceneManager.createAsteroidBelt();
    this.sceneManager.createBackgroundAsteroids();
    
    // Setup initial lighting
    this.sceneManager.setupLighting(sun, this.currentMode);
  }

  setupEventListeners() {
    // Window resize
    window.addEventListener('resize', () => {
      this.cameraManager.onWindowResize();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });

    // Mouse events for planet interaction
    this.container.addEventListener('mousemove', (event) => {
      this.planetManager.updateMousePosition(event, this.container);
      this.planetManager.setupRaycasting(this.camera);
      
      const intersectedPlanet = this.planetManager.getIntersectedPlanet();
      this.uiManager.updateCursor(intersectedPlanet !== null);
    });

    this.container.addEventListener('click', (event) => {
      this.planetManager.updateMousePosition(event, this.container);
      this.planetManager.setupRaycasting(this.camera);
      
      // Check for Sun click
      const sun = this.planetManager.getSun();
      if (sun) {
        const intersects = this.planetManager.raycaster.intersectObject(sun, true);
        if (intersects.length > 0) {
          // Move camera to top view
          const maxOrbit = Math.max(...window.PLANETS.map(p => p.orbit));
          this.cameraManager.showTopView(sun.position, maxOrbit);
          this.uiManager.hideSidebar();
          return;
        }
      }
      
      const intersectedPlanet = this.planetManager.getIntersectedPlanet();
      if (intersectedPlanet) {
        this.handlePlanetClick(intersectedPlanet);
      } else {
        // Clicked on empty space: stop following
        this.cameraManager.stopFollowing();
        this.uiManager.hideSidebar();
      }
    });

    // Mode change event
    window.addEventListener('modeChanged', (event) => {
      this.handleModeChange(event.detail.mode);
    });

    // Keyboard controls
    document.addEventListener('keydown', (event) => {
      this.handleKeyPress(event);
    });
  }

  // --- EVENT HANDLERS ---
  handlePlanetClick(planet) {
    // planet is now a group, so we need to get the actual planet mesh (first child)
    const planetMesh = planet.children[0];
    const planetData = planetMesh.userData;
    
    // In both modes, follow the planet group (orbit camera)
    this.cameraManager.followPlanet(planet, this.currentMode);
    
    // Show sidebar with planet info
    this.uiManager.showSidebar(planetData);
    this.uiManager.startFactAnimation();
  }

  handleModeChange(newMode) {
    this.currentMode = newMode;
    
    // Update scene lighting
    const sun = this.planetManager.getSun();
    this.sceneManager.setupLighting(sun, newMode);
    
    // Update skybox
    this.sceneManager.updateSkyboxForMode(newMode);
    
    // Stop following planets in fun mode
    if (newMode === 'fun') {
      this.cameraManager.stopFollowing();
    }
  }

  handleKeyPress(event) {
    switch (event.key) {
      case 'Escape':
        this.cameraManager.stopFollowing();
        this.uiManager.hideSidebar();
        break;
      case ' ':
        event.preventDefault();
        this.uiManager.toggleMusic();
        break;
      case 'm':
      case 'M':
        const newMode = this.uiManager.toggleMode();
        this.handleModeChange(newMode);
        break;
    }
  }

  // --- ANIMATION LOOP ---
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    const time = Date.now();
    
    // Update planet orbits
    this.planetManager.updatePlanetOrbits(time, this.currentMode);
    
    // Update sun
    const sun = this.planetManager.getSun();
    this.planetManager.updateSun(time, this.currentMode);
    
    // Update shooting stars
    if (Math.random() < 0.01) {
      const shootingStar = this.planetManager.createShootingStar();
      this.shootingStars.push(shootingStar);
      this.scene.add(shootingStar);
    }
    this.planetManager.updateShootingStars(this.shootingStars, this.currentMode);
    
    // Update camera
    this.cameraManager.update();
    
    // Render
    this.renderer.render(this.scene, this.camera);
  }

  // --- CLEANUP ---
  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.uiManager.stopFactAnimation();
    
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

// Initialize the solar system when the page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing Solar System');
  const solarSystem = new SolarSystem();
  
  // Make it globally accessible for debugging
  window.solarSystem = solarSystem;
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    solarSystem.dispose();
  });
});
