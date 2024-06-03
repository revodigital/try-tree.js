import * as THREE from 'three';
import { GUI } from 'dat.gui';

var pi = Math.PI;

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
    const planeGeometry = new THREE.BoxGeometry(20, 2, 7);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
    planeGeometry.castShadow = true;
    planeGeometry.receiveShadow = true;
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    // Cylinders
    const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
    const numCylinders = 10;
    const spacing = planeGeometry.parameters.width / (numCylinders + 1);

    for (let i = 1; i <= numCylinders; i++) {
        const cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder1.position.x = -planeGeometry.parameters.width / 2 + i * spacing;
        cylinder1.position.y = 2;
        cylinder1.position.z = 1;
        cylinder1.rotateX(degrees_to_radians(90));
        scene.add(cylinder1);

        const cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder2.position.x = -planeGeometry.parameters.width / 2 + i * spacing;
        cylinder2.position.y = 0;
        cylinder2.position.z = 1;
        cylinder2.rotateX(degrees_to_radians(90));
        scene.add(cylinder2);

        const cylinder3 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder3.position.x = -planeGeometry.parameters.width / 2 + i * spacing;
        cylinder3.position.y = -2;
        cylinder3.position.z = 1;
        cylinder3.rotateX(degrees_to_radians(90));
        scene.add(cylinder3);
    }

    // GUI for shape selection
    const gui = new GUI();
    gui.add(state, 'selectedShape', Object.keys(shapes));
}


function degrees_to_radians(degrees)
{
  // Store the value of pi.
  var pi = Math.PI;
  // Multiply degrees by pi divided by 180 to convert to radians.
  return degrees * (pi/180);
}