import * as THREE from 'three';
import { scene } from './main';
import { cilinders, eletrPart } from './objects';


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let offset = new THREE.Vector3();
let intersection = new THREE.Vector3();
let selectedObject = null;

let isDragging = false;
let newCube = null;
const cubeItem = document.getElementById('cube-item');

export const cubes = []


function getMousePosition(event, domElement) {
    const rect = domElement.getBoundingClientRect();
    return {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    };
}


cubeItem.addEventListener('mousedown', (event) => {
    isDragging = true;

    // let clone = eletrPart.clone(); 
    newCube =  eletrPart.clone();  // new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.2), new THREE.MeshPhysicalMaterial({ color: 0x0000ff }));
    newCube.position.set(0,1000,1) 
    scene.add(newCube);
    cubes.push(newCube);

    console.log(`created cube ${cubes.length} ${cubes}`,);
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
    if (intersects.length > 0 && cubes.includes(intersects[0].object)) {


        selectedObject = intersects[0].object;

        controls.enabled = false;

        const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        offset.copy(planeIntersect).sub(selectedObject.position);
    }
}

export function handleMouseMove(event, scene, camera) {
    
    if (isDragging && newCube) {

// free experiment

        // Convert mouse position to normalized device coordinates (-1 to +1)
        // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // // Update the raycaster with the camera and mouse position
        // raycaster.setFromCamera(mouse, camera);

        // // Calculate the new position for the cube
        // const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        // const newPosition = planeIntersect.sub(offset);

        // newCube.position.x = newPosition.x;
        // newCube.position.y = newPosition.y;

        // console.log(`cube moving`);

        // Convert mouse position to normalized device coordinates (-1 to +1)

// grid experiment

        // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // // Update the raycaster with the camera and mouse position
        // raycaster.setFromCamera(mouse, camera);

        // // Calculate the new position for the cube
        // const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        // const newPosition = planeIntersect.sub(offset);

        // // Constrain the position to the grid
        // const gridSize = 2;
        // const gridWidth = 10;
        // const gridHeight = 3;

        // // Calculate the nearest grid point
        // const gridX = Math.round(newPosition.x / gridSize) * gridSize;
        // const gridY = Math.round(newPosition.y / gridSize) * gridSize;

        // // Ensure the position stays within the grid boundaries
        // newCube.position.x = Math.min(Math.max(gridX, -10), (gridWidth - 1) * gridSize);
        // newCube.position.y = Math.min(Math.max(gridY, -10), (gridHeight - 1) * gridSize);

        // objects position experiment

        // Define the list of allowed positions
        const allowedPositions = cilinders.map(e => e.position)

        // Convert mouse position to normalized device coordinates (-1 to +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate the new position for the cube
        const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        const newPosition = planeIntersect.sub(offset);

        // Find the nearest allowed position
        let nearestPosition = allowedPositions[0];
        let minDistance = newPosition.distanceTo(nearestPosition);

        for (let i = 1; i < allowedPositions.length; i++) {
            const distance = newPosition.distanceTo(allowedPositions[i]);
            if (distance < minDistance) {
                nearestPosition = allowedPositions[i];
                minDistance = distance;
            }
        }

        newCube.position.copy(nearestPosition);
    } else {

        if (!selectedObject) return;

        // event.preventDefault();

        // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // raycaster.setFromCamera(mouse, camera);
        // const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        // const newPosition = planeIntersect.sub(offset);

        // selectedObject.position.x = newPosition.x;
        // selectedObject.position.y = newPosition.y;

        const allowedPositions = cilinders.map(e => e.position)

        // Convert mouse position to normalized device coordinates (-1 to +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate the new position for the cube
        const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        const newPosition = planeIntersect.sub(offset);

        // Find the nearest allowed position
        let nearestPosition = allowedPositions[0];
        let minDistance = newPosition.distanceTo(nearestPosition);

        for (let i = 1; i < allowedPositions.length; i++) {
            const distance = newPosition.distanceTo(allowedPositions[i]);
            if (distance < minDistance) {
                nearestPosition = allowedPositions[i];
                minDistance = distance;
            }
        }

        selectedObject.position.copy(nearestPosition);
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
