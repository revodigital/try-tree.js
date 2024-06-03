
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupLights } from './lights';
import { setupObjects } from './objects';
import { setupControls, handleMouseDown, handleMouseMove, handleMouseUp } from './controls';
import { setupPostProcessing } from './postprocessing';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x99ffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

setupLights(scene);
setupObjects(scene);

const controls = new OrbitControls(camera, renderer.domElement);
setupControls(controls, scene, camera, renderer);

camera.position.set(0, 50, 50);
camera.lookAt(0, 0, 0);

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
