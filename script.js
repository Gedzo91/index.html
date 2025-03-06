import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, controls;
let isGenerating = false;
let toast = null;
let isMobileMode = false;
let isImmersionMode = false;
let currentImageUrl = null; // Track the current image URL for download

async function init() {
    // Create toast element
    createToast();
    
    // Generate title screen background
    await generateTitleBackground();

    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('titleMobileBtn').addEventListener('click', toggleMobileMode);
}

function createToast() {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
}

function showToast(message, duration = 3000) {
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

async function generateTitleBackground() {
    try {
        const loadingEl = document.getElementById('loadingScreen');
        if (loadingEl) loadingEl.classList.add('active');
        
        const result = await websim.imageGen({
            prompt: "epic landscape with dramatic lighting, breathtaking vista, 8k, no people, cinematic, hyperrealistic",
            aspect_ratio: "16:9"
        });
        document.getElementById('titleScreen').style.backgroundImage = `url(${result.url})`;
    } catch (error) {
        console.error("Error generating title background:", error);
        document.getElementById('titleScreen').style.backgroundColor = '#222';
    } finally {
        const loadingEl = document.getElementById('loadingScreen');
        if (loadingEl) loadingEl.classList.remove('active');
    }
}

function toggleMobileMode() {
    isMobileMode = !isMobileMode;
    document.body.classList.toggle('mobile-mode', isMobileMode);
    
    const titleButton = document.getElementById('titleMobileBtn');
    const inAppButton = document.getElementById('inAppMobileBtn');
    
    if (titleButton) {
        titleButton.classList.toggle('mobile-active', isMobileMode);
        titleButton.innerHTML = isMobileMode ? '<i class="fas fa-mobile-alt"></i>' : '<i class="fas fa-desktop"></i>';
    }
    
    if (inAppButton) {
        inAppButton.classList.toggle('mobile-active', isMobileMode);
        inAppButton.innerHTML = isMobileMode ? '<i class="fas fa-mobile-alt"></i>' : '<i class="fas fa-desktop"></i>';
    }
    
    // If in exploration view, adjust controls for mobile
    if (controls) {
        controls.rotateSpeed = isMobileMode ? 0.7 : 0.5;
        controls.dampingFactor = isMobileMode ? 0.2 : 0.1;
    }
    
    if (isMobileMode) {
        showToast('Mobile mode activated', 2000);
    } else {
        showToast('Desktop mode activated', 2000);
    }
}

function startGame() {
    document.getElementById('titleScreen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('titleScreen').style.display = 'none';
        document.getElementById('controls').style.display = 'flex';
        document.getElementById('viewport').style.display = 'block';
        
        // Create control buttons container
        const controlButtonsContainer = document.createElement('div');
        controlButtonsContainer.id = 'controlButtonsContainer';
        controlButtonsContainer.className = 'control-buttons-container';
        document.body.appendChild(controlButtonsContainer);
        
        // Create download button
        const downloadBtn = document.createElement('button');
        downloadBtn.id = 'downloadBtn';
        downloadBtn.className = 'control-button download-btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
        downloadBtn.title = 'Download Current Image';
        downloadBtn.addEventListener('click', downloadCurrentImage);
        controlButtonsContainer.appendChild(downloadBtn);
        
        // Create immersion mode button
        const immersionBtn = document.createElement('button');
        immersionBtn.id = 'immersionBtn';
        immersionBtn.className = 'control-button immersion-mode-btn';
        immersionBtn.innerHTML = '<i class="fas fa-expand"></i>';
        immersionBtn.title = 'Immersion Mode';
        immersionBtn.addEventListener('click', toggleImmersionMode);
        controlButtonsContainer.appendChild(immersionBtn);
        
        // Create in-app mobile button
        const mobileBtn = document.createElement('button');
        mobileBtn.id = 'inAppMobileBtn';
        mobileBtn.className = 'control-button mobile-mode-btn';
        mobileBtn.innerHTML = isMobileMode ? '<i class="fas fa-mobile-alt"></i>' : '<i class="fas fa-desktop"></i>';
        mobileBtn.title = 'Toggle Mobile Mode';
        if (isMobileMode) mobileBtn.classList.add('mobile-active');
        mobileBtn.addEventListener('click', toggleMobileMode);
        controlButtonsContainer.appendChild(mobileBtn);
        
        // Create exit immersion button (initially hidden)
        const exitBtn = document.createElement('button');
        exitBtn.id = 'exitImmersionBtn';
        exitBtn.className = 'exit-immersion-btn';
        exitBtn.innerHTML = '<i class="fas fa-times"></i>';
        exitBtn.addEventListener('click', exitImmersionMode);
        document.body.appendChild(exitBtn);
        
        // Apply mobile mode if it was enabled on title screen
        if (isMobileMode) {
            document.body.classList.add('mobile-mode');
        }
    }, 800);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('viewport').appendChild(renderer.domElement);

    // Initial camera position
    camera.position.z = 0.1;

    // Setup controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.rotateSpeed = 0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.3;

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    animate();
    generateSkybox();

    document.getElementById('generateBtn').addEventListener('click', generateSkybox);
    document.getElementById('randomBtn').addEventListener('click', generateRandomSkybox);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

async function generateSkybox() {
    if (isGenerating) return;
    isGenerating = true;

    const prompt = document.getElementById('prompt').value;
    if (!prompt.trim()) {
        showToast("Please enter a description first");
        isGenerating = false;
        return;
    }

    // Create loading state
    document.getElementById('generateBtn').disabled = true;
    document.getElementById('generateBtn').textContent = 'Generating...';
    document.getElementById('loadingScreen').classList.add('active');

    try {
        const textureLoader = new THREE.TextureLoader();
        const loadTexture = (url) => {
            return new Promise((resolve, reject) => {
                textureLoader.load(url, resolve, undefined, reject);
            });
        };

        // Generate panoramic image
        const result = await websim.imageGen({
            prompt: `Panoramic 360 degree scene of ${prompt}, high resolution, seamless texture, wide angle lens, consistent lighting, high quality, imaginative, immersive, detailed`,
            aspect_ratio: "21:9"
        });
        currentImageUrl = result.url; // Store the current image URL
        const texture = await loadTexture(result.url);
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create spherical skybox with generated texture
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });

        // Remove existing skybox if any
        const existingSkybox = scene.getObjectByName('skybox');
        if (existingSkybox) {
            scene.remove(existingSkybox);
            existingSkybox.material.map.dispose();
            existingSkybox.material.dispose();
            existingSkybox.geometry.dispose();
        }

        const skybox = new THREE.Mesh(geometry, material);
        skybox.name = 'skybox';
        scene.add(skybox);
        controls.target.set(0, 0, 0);
        controls.update();
        
        showToast(`Welcome to: ${prompt}`);

    } catch (error) {
        console.error('Error generating skybox:', error);
        showToast('Failed to generate skybox. Please try again.', 5000);
    } finally {
        document.getElementById('generateBtn').disabled = false;
        document.getElementById('generateBtn').textContent = 'Generate';
        document.getElementById('loadingScreen').classList.remove('active');
        isGenerating = false;
    }
}

async function generateRandomSkybox() {
    const locations = [
        "alien planet landscape with purple trees and floating islands",
        "crystal cave with glowing mushrooms",
        "underwater coral reef with colorful fish",
        "futuristic city at night",
        "enchanted forest with giant flowers",
        "steampunk airship city in the clouds",
        "martian desert landscape",
        "arctic tundra with glaciers",
        "tropical jungle with waterfalls",
        "ancient ruins overgrown by jungle"
    ];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    document.getElementById('prompt').value = randomLocation;
    await generateSkybox();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function toggleImmersionMode() {
    isImmersionMode = true;
    document.body.classList.add('hidden-ui');
    document.getElementById('immersionBtn').classList.add('immersion-mode-active');
    showToast('Immersion mode activated. Click X to exit.', 3000);
}

function exitImmersionMode() {
    isImmersionMode = false;
    document.body.classList.remove('hidden-ui');
    document.getElementById('immersionBtn').classList.remove('immersion-mode-active');
    showToast('Exited immersion mode', 2000);
}

function downloadCurrentImage() {
    if (!currentImageUrl) {
        showToast('No image available to download');
        return;
    }
    
    // Create a temporary link element
    const a = document.createElement('a');
    a.href = currentImageUrl;
    a.download = 'skybox-image.jpg'; // Set the download filename
    document.body.appendChild(a);
    a.click(); // Trigger the download
    document.body.removeChild(a);
    
    showToast('Downloading image...');
}

init();