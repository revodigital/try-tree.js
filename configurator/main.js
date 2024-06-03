import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupLights } from './lights';
import { setupObjects } from './objects';
import { setupControls, handleMouseDown, handleMouseMove, handleMouseUp } from './controls';
import { setupPostProcessing } from './postprocessing';

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x99ffff);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
// document.body.appendChild(renderer.domElement);
document.getElementById('canvas-container').appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

setupLights(scene);
setupObjects(scene);

camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true; // Disable rotation for a fixed top-down view
controls.enableDamping = true; // Enable damping (smooth camera movement)
controls.dampingFactor = 0.25; // Damping inertia
controls.screenSpacePanning = false; // Pan orthogonal to world-space direction camera.up

// Restrict panning and zooming
controls.minDistance = 5; // Minimum zoom distance
controls.maxDistance = 25; // Maximum zoom distance
// controls.maxPolarAngle = Math.PI / 2; // Limit the vertical angle to avoid flipping

// Restrict panning
controls.maxPan = new THREE.Vector3(20, 0, 20); // Maximum panning boundaries
controls.minPan = new THREE.Vector3(-20, 0, -20); // Minimum panning boundaries

// Limit the amount of orbit
const azimuthAngle = THREE.MathUtils.degToRad(30); // 30 degrees
const polarAngle = THREE.MathUtils.degToRad(20); // 20 degrees
controls.minAzimuthAngle = -azimuthAngle;
controls.maxAzimuthAngle = azimuthAngle;
controls.minPolarAngle = Math.PI / 2 - polarAngle; // Limit to 90 degrees minus 20 degrees
controls.maxPolarAngle = Math.PI / 2 + polarAngle; // Limit to 90 degrees plus 20 degrees

setupControls(controls, scene, camera, renderer);

const composer = setupPostProcessing(renderer, scene, camera);

window.addEventListener('mousedown', (event) => handleMouseDown(event, controls, scene, camera, composer));
window.addEventListener('mousemove', (event) => handleMouseMove(event, scene, camera));
window.addEventListener('mouseup', (event) => handleMouseUp(event, controls, composer));

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    composer.render();
}

animate();




function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     render();
// }


// function render() {
//     renderer.render( scene, camera );
// }
