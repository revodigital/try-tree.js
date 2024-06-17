import * as THREE from 'three';
import { scene, camera } from './main';
import { cilinders, eletrPart ,eletrPart1, eletrPart2} from './objects';


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let offset = new THREE.Vector3();
let intersection = new THREE.Vector3();
let selectedObject = null;

let isDragging = false;
let newCube = null;
const cubeItem = document.getElementById('cube-item');
const cubeItem2 = document.getElementById('cube-item2');
const cubeItem3 = document.getElementById('cube-item3');

export const cubes = []
export const placedCubesData = []
export const occupiedPositions = []
export const availablePositions = []

cubeItem.addEventListener('mousedown', (event) => {
    isDragging = true;
    newCube =  eletrPart.clone(); 
    newCube.position.set(0,1000,1) 
    scene.add(newCube);
    // console.log(`newCube`, newCube.children[0]);
    cubes.push(newCube.id);
    CurrentDataId = placedCubesData.push({ cube: newCube, id: newCube.id, positionIndex: -1 })
    console.log(CurrentDataId);
    CurrentDataId--;
    console.log('executed');
});

cubeItem2.addEventListener('mousedown', (event) => {
    isDragging = true;
    newCube =  eletrPart1.clone(); 
    newCube.position.set(0,1000,1) 
    scene.add(newCube);
    cubes.push(newCube.id);
    CurrentDataId = placedCubesData.push({ cube: newCube, id: newCube.id, positionIndex: -1 })
});

cubeItem3.addEventListener('mousedown', (event) => {
    isDragging = true;
    newCube =  eletrPart2.clone(); 
    newCube.position.set(0,1000,1) 
    scene.add(newCube);
    cubes.push(newCube.id);
    CurrentDataId = placedCubesData.push({ cube: newCube, id: newCube.id, positionIndex: -1 })
});

function getMousePosition(event, domElement) {
    const rect = domElement.getBoundingClientRect();
    return {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    };
}


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
const lines = []; // Array to store the line objects

function addDebugLine(start, end) {
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const points = [start.clone(), end.clone()];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);

    scene.add(line);
    lines.unshift(line); // Add the new line to the beginning of the array

    // Check if there are more than three lines, and remove the oldest if necessary
    if (lines.length > 5) {
        const oldestLine = lines.pop(); // Remove the last element from the array
        scene.remove(oldestLine); // Remove the oldest line from the scene
        oldestLine.geometry.dispose(); // Dispose of the geometry
        oldestLine.material.dispose(); // Dispose of the material
    }
}


export function handleMouseDown(event, controls, scene) {
    event.preventDefault();

    // availablePositions.filter((val,index)=> !occupiedPositions.includes(index))

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const firstIntersect = intersects[0];
        addDebugLine(camera.position, firstIntersect.point);

    }

    if (intersects.length > 0 && cubes.includes(intersects[0].object?.parent?.id)) {

        selectedObject = intersects[0].object.parent;
        
        console.log('intersected', selectedObject)
        controls.enabled = false;
        
        // Questo offset può essere usato per muovere l'oggetto in maniera consistente rispetto al punto di click originale durante operazioni di trascinamento o altri tipi di manipolazione interattiva.
        
        const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        offset.copy(planeIntersect).sub(selectedObject.position);
    }
}

let CurrentDataId 

export function handleMouseMove(event, scene) {
    if (isDragging && (newCube || selectedObject)) {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const objId = (newCube || selectedObject).id
        const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
        const newPosition = planeIntersect.sub(offset);

        // console.log(currentIndexPos );

        const nearestPosition = findNearestAvailablePosition(newPosition, availablePositions);

        if (nearestPosition) {
            // console.log(`nearestPosition.position`, nearestPosition.position);
            (newCube || selectedObject).position.copy(nearestPosition.position);

            // se non è nuovo deve togliere la vecchia posizione e mettere la nuova

            // aggiorna solo l'id dell'oggetto
            // all' up aggiorna la lista dei no
            // console.log(placedCubesData[0]);
           placedCubesData[CurrentDataId].positionIndex = nearestPosition.index
        } else {
            console.log("No available positions to move to.");
        }
    }
}


export function handleMouseUp(event, controls) {
    if (selectedObject) {
        controls.enabled = true;
    }
    if (isDragging) {
        if (newCube) {
            selectedObject = newCube
        }
        occupiedPositions.length = 0
        occupiedPositions.push(...placedCubesData.map(e => e.positionIndex))
        console.log(occupiedPositions);
        isDragging = false;
        newCube = null;
    }
}


function findNearestAvailablePosition(currentPosition, availablePositions ) {
    // Filter out occupied positions

    // Start with the first available position as the nearest
    if (availablePositions.length === 0) {
        console.log("No available positions.");
        return null; // or return an appropriate fallback
    } 
    // const availablePositions = allowedPositions
    let indexPos = 0
    let nearestPosition = availablePositions[0];
    let minDistance = currentPosition.distanceTo(nearestPosition);

    // Iterate through the remaining available positions to find the closest one
    for (let i = 1; i < availablePositions.length; i++) {
        const distance = currentPosition.distanceTo(availablePositions[i]);

        
        if (distance < minDistance && !occupiedPositions.includes(i)) {
            // console.log(i);
            nearestPosition = availablePositions[i];
            minDistance = distance;
            indexPos = i
        }
    }

    return {position: nearestPosition, index: indexPos};
}


export function onKeyDown(event, controls) {
    console.log(`event.key ${selectedObject}`, event.key);
    if (selectedObject && event.key === 'd') {
        selectedObject.position.x += 1;
    }
    if (selectedObject && event.key === 'a') {
        selectedObject.position.x -= 1;
    }
    if (selectedObject && event.key === 'w') {
        selectedObject.position.y -= 1;
    }
    if (selectedObject && event.key === 's') {
        selectedObject.position.y += 1;
    }
}



// export function onKeyDown(event, controls,) {
//     console.log(`Key pressed: ${event.key} with selectedObject: ${selectedObject}`);
//     const allowedPositions = cilinders.map(e => e.position)
//     if (!selectedObject) return;

//     let currentPosition = selectedObject.position.clone(); // Clone current position to modify
//     let newPosition;

//     // Check which key was pressed and calculate the potential new position
//     switch (event.key) {
//         case 'd': // Move right
//             newPosition = findNearestAvailablePosition(
//                 new THREE.Vector3(currentPosition.x + 10, currentPosition.y, currentPosition.z),
//                 allowedPositions,
//                 occupiedPositions.filter(pos => pos.z === currentPosition.z) // Filter for the same z-axis
//             );
//             break;
//         case 'a': // Move left
//             newPosition = findNearestAvailablePosition(
//                 new THREE.Vector3(currentPosition.x - 10, currentPosition.y, currentPosition.z),
//                 allowedPositions,
//                 occupiedPositions.filter(pos => pos.z === currentPosition.z) // Filter for the same z-axis
//             );
//             break;
//         case 'w': // Move forward
//             newPosition = findNearestAvailablePosition(
//                 new THREE.Vector3(currentPosition.x, currentPosition.y, currentPosition.z - 10),
//                 allowedPositions,
//                 occupiedPositions.filter(pos => pos.x === currentPosition.x) // Filter for the same x-axis
//             );
//             break;
//         case 's': // Move backward
//             newPosition = findNearestAvailablePosition(
//                 new THREE.Vector3(currentPosition.x, currentPosition.y, currentPosition.z + 10),
//                 allowedPositions,
//                 occupiedPositions.filter(pos => pos.x === currentPosition.x) // Filter for the same x-axis
//             );
//             break;
//         default:
//             return; // Exit if other keys are pressed
//     }

//     // If a new position is found, move the selected object to that position
//     if (newPosition) {
//         selectedObject.position.copy(newPosition);
//     } else {
//         console.log("No available positions to move to in the desired direction.");
//     }
// }
