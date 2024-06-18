import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupLights } from './lights';
import {  crateBoard } from './objects';
import { setupControls, handleMouseDown, handleMouseMove, handleMouseUp, onKeyDown} from './controls';
import { addOutlinesBasedOnIntersections, setupPostProcessing } from './postprocessing';
import { setupRenderer } from './setUpRender';
// import { addMenuAction } from './setMenuAction';


export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x99ffff);

export const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = setupRenderer()

const container = document.createElement('div');
container.id = 'canv'
document.body.appendChild(container);
container.appendChild( renderer.domElement );

// document.body.appendChild( renderer.domElement );
window.addEventListener('resize', onWindowResize, false);

setupLights(scene);
crateBoard(scene)

camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
setupControls(controls, scene, camera, renderer);

const composer = setupPostProcessing(renderer, scene, camera);

document.addEventListener('keydown', (event) => onKeyDown(event, controls, composer));


// try outline
// document.addEventListener('mousemove', onMouseMove, false);

//     const raycaster = new THREE.Raycaster();
// function onMouseMove(event) {
//    let mousePointer = getMouseVector2(event, window);

//     const intersections = checkRayIntersections(mousePointer, camera, raycaster, scene);

//     //Add outline on intersections
//     addOutlinesBasedOnIntersections(intersections);
// }


// export function getMouseVector2(event, window){
//     let mousePointer = new THREE.Vector2()

//     mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
// 	mousePointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     return mousePointer;
// }

// export function checkRayIntersections(mousePointer, camera, raycaster, scene) {
//     raycaster.setFromCamera(mousePointer, camera);

//     let intersections = raycaster.intersectObjects(scene.children, true);

//     return intersections;
// }

// addMenuAction()

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    composer.render();
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();