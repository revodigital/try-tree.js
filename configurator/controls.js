import * as THREE from 'three';
import { scene } from './main';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let offset = new THREE.Vector3();
let intersection = new THREE.Vector3();
let selectedObject = null;

let isDragging = false;
let newCube = null;
const cubeItem = document.getElementById('cube-item');


function getMousePosition(event, domElement) {
    const rect = domElement.getBoundingClientRect();
    return {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    };
}


cubeItem.addEventListener('mousedown', (event) => {

    isDragging = true;
    newCube = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 2), new THREE.MeshPhysicalMaterial({ color: 0x0000ff }));
    newCube.position.set(0,1000,1) 
    scene.add(newCube);
    console.log(`created cube`);
    
});

export function setupControls(controls, scene, camera, renderer) {
    const red = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const points = [new THREE.Vector3(), new THREE.Vector3()];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const rayLine = new THREE.Line(geometry, red);
    scene.add(rayLine);

    window.addEventListener('mousedown', (event) => handleMouseDown(event, controls, scene, camera));
    window.addEventListener('mousemove', (event) => handleMouseMove(event, scene, camera));
    window.addEventListener('mouseup', (event) => handleMouseUp(event, controls));
}

export function handleMouseDown(event, controls, scene, camera) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        controls.enabled = false;

        const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        offset.copy(planeIntersect).sub(selectedObject.position);
    }
}

export function handleMouseMove(event, scene, camera) {
    
    if (isDragging && newCube) {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate the new position for the cube
        const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        const newPosition = planeIntersect.sub(offset);

        newCube.position.x = newPosition.x;
        newCube.position.y = newPosition.y;

        // console.log(`cube moving`);
    } else {

        if (!selectedObject) return;

        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        const newPosition = planeIntersect.sub(offset);

        selectedObject.position.x = newPosition.x;
        selectedObject.position.y = newPosition.y;
    }
}

export function handleMouseUp(event, controls) {
    if (selectedObject) {
        selectedObject = null;
        controls.enabled = true;
    }
    if (isDragging) {
        isDragging = false;
        newCube = null;
    }
}
