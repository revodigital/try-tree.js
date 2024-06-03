import * as THREE from 'three';
import { GUI } from 'dat.gui';

export function setupObjects(scene) {
    const shapes = {
        Cube: () => new THREE.BoxGeometry(2, 2, 2),
        Sphere: () => new THREE.SphereGeometry(1, 32, 32),
        Pyramid: () => new THREE.ConeGeometry(1.5, 2, 4)
    };

    const material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 });
    const state = {
        selectedShape: 'Cube'
    };

    // Plane
    const planeGeometry = new THREE.BoxGeometry(20, 5, 2);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
    planeGeometry.castShadow = true;
    planeGeometry.receiveShadow = true;
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    // Cylinders
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
    const numCylinders = 10;
    const spacing = planeGeometry.parameters.width / (numCylinders + 1);
    for (let i = 1; i <= numCylinders; i++) {
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.position.x = -planeGeometry.parameters.width / 2 + i * spacing;
        cylinder.position.y = 1;
        scene.add(cylinder);
    }

    // GUI for shape selection
    const gui = new GUI();
    gui.add(state, 'selectedShape', Object.keys(shapes));
}
