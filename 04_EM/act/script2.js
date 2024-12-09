// script.js

// Import Three.js and OrbitControls as ES6 modules using absolute URLs
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

// Initialize the Three.js scene
const scene = new THREE.Scene();

// Set up the camera (PerspectiveCamera fov, aspect, near, far)
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 50, 100); // Position the camera

// Initialize the renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize OrbitControls for interactive scene rotation, zooming, and panning
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth damping
controls.dampingFactor = 0.05;

// Add ambient light for general illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Add directional light to create shadows and highlights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 50, 50); // Position the light source
scene.add(directionalLight);

// Define charge properties
const chargeRadius = 2; // Radius of charge representations

// Array to store charge objects
let charges = [];

// Define charge colors: red for positive, blue for negative
const chargeColors = {
    positive: 0xff0000, // Red
    negative: 0x0000ff  // Blue
};

// Function to create a Point Charge
function createPointCharge(position, chargeValue) {
    const geometry = new THREE.SphereGeometry(chargeRadius, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: chargeValue > 0 ? chargeColors.positive : chargeColors.negative 
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(position);
    scene.add(sphere);
    
    return { type: 'point', position, chargeValue, mesh: sphere };
}

// Function to create a Long Rod Charge
function createLongRod(position, chargeValue) {
    const length = 50; // Length of the rod
    const geometry = new THREE.CylinderGeometry(1, 1, length, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: chargeValue > 0 ? chargeColors.positive : chargeColors.negative 
    });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.copy(position);
    scene.add(cylinder);
    
    return { type: 'rod', position, chargeValue, mesh: cylinder };
}

// Function to create a Ring Charge
function createRing(position, chargeValue) {
    const radius = 20; // Radius of the ring
    const geometry = new THREE.RingGeometry(radius - 0.5, radius + 0.5, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: chargeValue > 0 ? chargeColors.positive : chargeColors.negative, 
        side: THREE.DoubleSide 
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI / 2; // Rotate to lie flat on XZ-plane
    ring.position.copy(position);
    scene.add(ring);
    
    return { type: 'ring', position, chargeValue, mesh: ring };
}

// Function to create a Sheet of Charge
function createSheet(position, chargeValue) {
    const size = 40; // Size of the sheet
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshPhongMaterial({ 
        color: chargeValue > 0 ? chargeColors.positive : chargeColors.negative, 
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.6 
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2; // Rotate to lie flat on XZ-plane
    plane.position.copy(position);
    scene.add(plane);
    
    return { type: 'sheet', position, chargeValue, mesh: plane };
}

// Function to create a Charged Sphere
function createChargedSphere(position, chargeValue) {
    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: chargeValue > 0 ? chargeColors.positive : chargeColors.negative, 
        wireframe: true 
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(position);
    scene.add(sphere);
    
    return { type: 'sphere', position, chargeValue, mesh: sphere };
}

// Function to calculate the Electric Field vector at a given point (x, y, z)
function calculateElectricField(x, y, z) {
    let ex = 0, ey = 0, ez = 0;
    const k = 8.9875517873681764e9; // Coulomb's constant in N·m²/C²
    
    charges.forEach(charge => {
        let dx = x - charge.position.x;
        let dy = y - charge.position.y;
        let dz = z - charge.position.z;
        let distanceSquared = dx * dx + dy * dy + dz * dz;
        let distance = Math.sqrt(distanceSquared);
        if (distance === 0) return; // Avoid division by zero
        
        // Electric field magnitude
        let fieldMagnitude = k * charge.chargeValue / distanceSquared;
        
        // Components of the electric field
        ex += fieldMagnitude * (dx / distance);
        ey += fieldMagnitude * (dy / distance);
        ez += fieldMagnitude * (dz / distance);
    });
    
    return new THREE.Vector3(ex, ey, ez);
}

// Function to draw Electric Field Lines with Arrow Helpers
function drawElectricFieldLines() {
    const arrowLength = 2; // Length of each arrow
    const arrowColor = 0x000000; // Black color for arrows
    
    charges.forEach(charge => {
        if (charge.chargeValue <= 0) return; // Only emit field lines from positive charges
        
        const numberOfLines = 32; // Number of field lines per charge
        for (let i = 0; i < numberOfLines; i++) {
            const theta = (i / numberOfLines) * 2 * Math.PI;
            let x = charge.position.x + Math.cos(theta) * (chargeRadius + 0.5); // Start just outside the charge
            let y = charge.position.y; // Assuming charges lie on the XY-plane; adjust for 3D as needed
            let z = charge.position.z + Math.sin(theta) * (chargeRadius + 0.5);
            
            // Trace the field line
            for (let step = 0; step < 100; step++) { // Limit steps to prevent infinite loops
                const field = calculateElectricField(x, y, z);
                const eMagnitude = field.length();
                if (eMagnitude === 0) break; // No field
                
                const direction = field.clone().normalize(); // Direction of the field
                
                // Move a small step in the direction of the field
                x += direction.x * 1;
                y += direction.y * 1;
                z += direction.z * 1;
                
                // Check if the point is near a negative charge to terminate the line
                let terminated = false;
                charges.forEach(targetCharge => {
                    if (targetCharge.chargeValue < 0) {
                        const distance = Math.sqrt(
                            Math.pow(x - targetCharge.position.x, 2) +
                            Math.pow(y - targetCharge.position.y, 2) +
                            Math.pow(z - targetCharge.position.z, 2)
                        );
                        if (distance < 10) { // Assuming charged sphere has radius 10
                            terminated = true;
                        }
                    }
                });
                if (terminated) break;
                
                // Add an arrow at the current position pointing in the direction of the field
                const arrowHelper = new THREE.ArrowHelper(direction, new THREE.Vector3(x, y, z), arrowLength, arrowColor);
                scene.add(arrowHelper);
            }
        }
    });
}

// Function to clear the scene (remove all objects except lights and camera)
function clearScene() {
    // Traverse the scene and remove meshes, lines, and arrows
    scene.traverse((object) => {
        if (object.isMesh || object.isLine || object.type === 'ArrowHelper') {
            scene.remove(object);
        }
    });
    charges = [];
}

// Function to update the charge distribution based on user selection
function updateChargeDistribution() {
    clearScene(); // Remove existing charges and field lines
    
    // Define the central position for charge distributions
    const position = new THREE.Vector3(0, 0, 0);
    
    // Get the selected charge distribution type from the UI
    const chargeType = document.getElementById('chargeType').value;
    
    // Create the selected charge distribution
    switch (chargeType) {
        case 'point':
            charges.push(createPointCharge(position, 1)); // Positive point charge
            break;
        case 'rod':
            charges.push(createLongRod(position, 1)); // Positive long rod
            break;
        case 'ring':
            charges.push(createRing(position, 1)); // Positive ring
            break;
        case 'sheet':
            charges.push(createSheet(position, 1)); // Positive sheet
            break;
        case 'sphere':
            charges.push(createChargedSphere(position, 1)); // Positive charged sphere
            break;
        default:
            console.error('Unknown charge distribution selected.');
    }
    
    // After setting up charges, draw the electric field lines
    drawElectricFieldLines();
}

// Access UI elements
const chargeTypeSelect = document.getElementById('chargeType');
const updateButton = document.getElementById('updateButton');

// Handle UI selection and update
updateButton.addEventListener('click', () => {
    updateChargeDistribution();
});

// Initialize the simulation with a default charge distribution (e.g., Point Charge)
updateChargeDistribution();

// Animation loop to render the scene and update controls
function animate() {
    requestAnimationFrame(animate);
    
    controls.update(); // Update OrbitControls for smooth interaction
    
    renderer.render(scene, camera); // Render the scene
}

animate(); // Start the animation loop

// Handle window resizing
window.addEventListener('resize', () => {
    // Update camera aspect ratio and projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
});
