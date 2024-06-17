import * as THREE from 'three';

export const metallicMaterial1 = new THREE.MeshStandardMaterial({
    color: 0xDDBBAA, // You can adjust this color to whatever you like
    metalness: 1,  // High metalness for a metallic look
    roughness: 0.8   // Lower roughness for sharper reflections
});

export const metallicMaterial2 = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF, // You can adjust this color to whatever you like
    metalness: 1,  // High metalness for a metallic look
    roughness: 0.6  // Lower roughness for sharper reflections
});

export const metallicMaterial3 = new THREE.MeshStandardMaterial({
    color: 0xDDCCAA, // You can adjust this color to whatever you like
    // metalness: 1,  // High metalness for a metallic look
    roughness: 0.6  // Lower roughness for sharper reflections
});


export const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
export const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });