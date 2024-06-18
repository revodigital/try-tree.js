import * as THREE from 'three';
import { scene } from './main';

function createComplexCableConnection(object1, object2, scene, verticalOffset = 5, tubeRadius = 0.1) {
    // Define points for the path
    let points = [];
    points.push(object1.position.clone());

    // First move up
    let intermediatePoint1 = new THREE.Vector3(object1.position.x, object1.position.y + verticalOffset, object1.position.z);
    points.push(intermediatePoint1);

    // Move horizontally towards object2
    let intermediatePoint2 = new THREE.Vector3(object2.position.x, intermediatePoint1.y, object2.position.z);
    points.push(intermediatePoint2);

    // Finally move up to object2's height
    let finalPoint = new THREE.Vector3(object2.position.x, object2.position.y, object2.position.z);
    points.push(finalPoint);

    // Create the path
    let curvePath = new THREE.CurvePath();
    for (let i = 0; i < points.length - 1; i++) {
        let lineCurve = new THREE.LineCurve3(points[i], points[i+1]);
        curvePath.add(lineCurve);
    }

    // Use TubeGeometry to create the tube along the path
    const tubeGeometry = new THREE.TubeGeometry(curvePath, 64, tubeRadius, 8, false);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const tubeMesh = new THREE.Mesh(tubeGeometry, material);

    // Add the tube to the scene
    scene.add(tubeMesh);

    return tubeMesh; // Return the mesh for further manipulation if necessary
}

function lerp(start, end, t) {
    return start + ((end -start) * t);
}

function lerpAxis(start, end,axieName, t) {
    return start.position[axieName] + ((end.position[axieName] -start.position[axieName]) * t);
}

export function createSmoothCableConnection(object1, object2, tubeRadius = 0.1, verticalOffset = 5) {
    // Define points for the path
    let points = [];
    points.push(object1.position.clone());



    // First move up
    let intermediatePoint1 = new THREE.Vector3( lerpAxis(object1, object2, 'x', 0.08),  lerpAxis(object1, object2, 'y', 0.45), object1.position.z);
    points.push(intermediatePoint1);

    // Move horizontally towards object2
    let intermediatePoint2 = new THREE.Vector3(lerpAxis(object1, object2, 'x', 0.92),  lerpAxis(object1, object2, 'y', 0.55), object2.position.z);
    points.push(intermediatePoint2);

    // Finally move up to object2's height
    let finalPoint = new THREE.Vector3(object2.position.x, object2.position.y, object2.position.z);
    points.push(finalPoint);

    // Create the CatmullRomCurve3
    let curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 10); // 'centripetal' or 'chordal' for tighter or looser curves

    // Use TubeGeometry to create the tube along the path
    const tubeGeometry = new THREE.TubeGeometry(curve, 64, tubeRadius, 8, false);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const tubeMesh = new THREE.Mesh(tubeGeometry, material);

    // Add the tube to the scene
    scene.add(tubeMesh);

    return tubeMesh; // Return the mesh for further manipulation if necessary
}



export function setBasicTube(scene) {
    const object1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0x00ff00}));
    const object2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0x0000ff}));
    object1.position.set(0, 0, 1);
    object2.position.set(10, 10, 1);
    scene.add(object1);
    scene.add(object2);

    const tube = createSmoothCableConnection(object1, object2, );
    // const tube2 = createComplexCableConnection(object1, object2, scene,);
    // scene.add(tube)
}