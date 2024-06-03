import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let offset = new THREE.Vector3();
let intersection = new THREE.Vector3();
let selectedObject = null;

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
    if (!selectedObject) return;

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
    const newPosition = planeIntersect.sub(offset);

    selectedObject.position.x = newPosition.x;
    selectedObject.position.z = newPosition.z;
}

export function handleMouseUp(event, controls) {
    if (selectedObject) {
        selectedObject = null;
        controls.enabled = true;
    }
}
