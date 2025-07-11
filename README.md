# 🌟 Solar System Explorer - Three.js

An interactive 3D solar system visualization built with Three.js, featuring realistic planet orbits, interactive info cards, and dual modes (realistic/fun).

## 🚀 Features

- **Realistic 3D Solar System**: Accurate planet sizes, orbits, and textures
- **Interactive Planets**: Click to view detailed information and facts
- **Dual Modes**: Switch between realistic night mode and colorful fun mode
- **Camera Controls**: Smooth zoom, pan, and planet following
- **Animated Elements**: Sun flares, planet glows, shooting stars, asteroid belts
- **Background Music**: Atmospheric space music with toggle controls
- **Responsive Design**: Works on desktop and mobile devices
- **Educational Content**: Detailed planet facts, stats, and descriptions

## 📁 Project Structure

The codebase is organized into modular components for better maintainability:

```
js/
├── config.js          # Planet data, constants, and configuration
├── scene.js           # Scene management, skybox, lighting, asteroids
├── camera.js          # Camera setup, controls, and animations
├── planets.js         # Planet creation, orbits, and interactions
├── ui.js              # UI management, sidebar, controls, music
└── main.js            # Main application coordinator
```

### Module Responsibilities

- **`config.js`**: Centralized data storage for planets, sun, and configuration constants
- **`scene.js`**: Handles Three.js scene setup, skybox, starfield, lighting, and asteroid belts
- **`camera.js`**: Manages camera setup, OrbitControls, planet following, and smooth animations
- **`planets.js`**: Creates planets, handles orbits, raycasting, shooting stars, and planet interactions
- **`ui.js`**: Manages sidebar, info cards, mode toggles, music controls, and user interface
- **`main.js`**: Coordinates all modules, handles events, and manages the animation loop

## 🎮 Controls

- **Mouse**: Click planets to view info, drag to rotate view, scroll to zoom
- **Keyboard**:
  - `M` - Toggle between realistic and fun modes
  - `Space` - Toggle background music
  - `Escape` - Stop following planets and close sidebar
- **Touch**: Swipe to rotate, pinch to zoom (mobile)

## 🌙 Modes

### Realistic Mode (Night Mode)
- Cool blue lighting and natural colors
- Camera follows planets when clicked
- Realistic planet appearances
- Educational focus

### Fun Mode
- Colorful rainbow lighting and effects
- Animated UI elements
- Colorful shooting stars
- Playful planet animations

## 🛠️ Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd CodersHubSolarSystemThreejs
   ```

2. **Start a local server** (required for ES6 modules):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**:
   ```
   http://localhost:8000
   ```

## 📦 Dependencies

- **Three.js**: 3D graphics library
- **OrbitControls**: Camera controls
- **ES6 Modules**: Modern JavaScript module system

## 🎨 Customization

### Adding New Planets
1. Add planet data to `config.js` in the `PLANETS` array
2. Add corresponding texture image to `img/` folder
3. The planet will automatically be created and animated

### Modifying Visual Effects
- **Lighting**: Edit `scene.js` → `setupLighting()` method
- **Planet Effects**: Modify `planets.js` → `createPlanet()` method
- **UI Styling**: Update `style.css` for visual changes

### Changing Planet Data
- Edit planet facts, descriptions, and stats in `config.js`
- Update texture paths if needed
- Modify orbit speeds and distances

## 🔧 Development

### Code Organization Benefits
- **Separation of Concerns**: Each module has a specific responsibility
- **Maintainability**: Easy to find and modify specific features
- **Reusability**: Modules can be reused or replaced independently
- **Testing**: Individual modules can be tested in isolation
- **Scalability**: Easy to add new features without cluttering main code

### Adding New Features
1. **Identify the appropriate module** for your feature
2. **Add the functionality** to the relevant module
3. **Update main.js** if coordination between modules is needed
4. **Test thoroughly** across different modes and interactions

## 🎯 Future Enhancements

- [ ] Add moons for planets
- [ ] Implement realistic orbital mechanics
- [ ] Add space missions and spacecraft
- [ ] Include more educational content
- [ ] Add VR support
- [ ] Implement multiplayer features

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Enjoy exploring the solar system! 🌌**
