export class UIManager {
  constructor() {
    this.currentFactIndex = 0;
    this.factInterval = null;
    this.isMusicPlaying = false;
    this.audio = null;
  }

  // --- SIDEBAR MANAGEMENT ---
  showSidebar(planetData) {
    const sidebar = document.getElementById('planetSidebar');
    const planetName = document.getElementById('planetName');
    const planetDescription = document.getElementById('planetDescription');
    const planetStats = document.getElementById('planetStats');
    const planetFacts = document.getElementById('planetFacts');

    // Update content
    planetName.textContent = planetData.name;
    planetDescription.textContent = planetData.description;

    // Update stats
    planetStats.innerHTML = '';
    Object.entries(planetData.stats).forEach(([key, value]) => {
      const statItem = document.createElement('div');
      statItem.className = 'stat-item';
      statItem.innerHTML = `<span class="stat-label">${key}:</span> <span class="stat-value">${value}</span>`;
      planetStats.appendChild(statItem);
    });

    // Update facts - show all at once
    planetFacts.innerHTML = '';
    planetData.facts.forEach(fact => {
      const factItem = document.createElement('div');
      factItem.className = 'fact-item';
      factItem.textContent = fact;
      factItem.style.opacity = '1'; // Make all facts visible
      factItem.style.transform = 'translateY(0)'; // Reset transform
      planetFacts.appendChild(factItem);
    });

    // Show sidebar with animation
    sidebar.classList.add('show');
  }

  hideSidebar() {
    const sidebar = document.getElementById('planetSidebar');
    sidebar.classList.remove('show');
  }

  // --- FACT ANIMATION (DISABLED) ---
  startFactAnimation() {
    // Animation disabled - all facts shown at once
    this.stopFactAnimation();
  }

  stopFactAnimation() {
    if (this.factInterval) {
      clearInterval(this.factInterval);
      this.factInterval = null;
    }
  }

  animateFactChange() {
    // Animation disabled - all facts shown at once
  }

  // --- MODE TOGGLE ---
  toggleMode() {
    const body = document.body;
    const isFunMode = body.classList.contains('fun-mode');
    
    if (isFunMode) {
      body.classList.remove('fun-mode');
      body.classList.add('night-mode');
    } else {
      body.classList.remove('night-mode');
      body.classList.add('fun-mode');
    }
    
    return body.classList.contains('fun-mode') ? 'fun' : 'realistic';
  }

  // --- MUSIC CONTROLS ---
  async initMusic() {
    try {
      this.audio = new Audio('./music.mp3');
      this.audio.volume = 0.3;
      this.audio.loop = true;
      
      // Preload audio
      await this.audio.load();
      console.log('Music loaded successfully');
    } catch (error) {
      console.error('Error loading music:', error);
    }
  }

  async toggleMusic() {
    if (!this.audio) {
      await this.initMusic();
    }

    const musicBtn = document.getElementById('musicToggle');
    
    try {
      if (this.isMusicPlaying) {
        this.audio.pause();
        this.isMusicPlaying = false;
        musicBtn.innerHTML = '🔇';
        musicBtn.classList.remove('playing');
      } else {
        await this.audio.play();
        this.isMusicPlaying = true;
        musicBtn.innerHTML = '🔊';
        musicBtn.classList.add('playing');
      }
    } catch (error) {
      console.error('Error toggling music:', error);
      musicBtn.innerHTML = '❌';
    }
  }

  // --- CONTROLS SETUP ---
  setupControls() {
    // Mode toggle
    const modeBtn = document.getElementById('modeToggle');
    if (modeBtn) {
      modeBtn.addEventListener('click', () => {
        const newMode = this.toggleMode();
        // Dispatch custom event for mode change
        window.dispatchEvent(new CustomEvent('modeChanged', { detail: { mode: newMode } }));
      });
    }

    // Music toggle
    const musicBtn = document.getElementById('musicToggle');
    if (musicBtn) {
      musicBtn.addEventListener('click', () => this.toggleMusic());
    }

    // Close sidebar
    const closeBtn = document.getElementById('closeSidebar');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hideSidebar());
    }

    // Initialize music
    this.initMusic();
  }

  // --- CURSOR STYLES ---
  updateCursor(isOverPlanet) {
    const container = document.getElementById('container');
    if (isOverPlanet) {
      container.style.cursor = 'pointer';
    } else {
      container.style.cursor = 'grab';
    }
  }

  // --- LOADING SCREEN ---
  showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.style.display = 'flex';
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  }

  // --- ERROR HANDLING ---
  showError(message) {
    console.error(message);
    // You could add a toast notification here
  }

  // --- GETTERS ---
  isMusicPlaying() {
    return this.isMusicPlaying;
  }

  getCurrentMode() {
    return document.body.classList.contains('fun-mode') ? 'fun' : 'realistic';
  }
} 