import * as THREE from 'three';

export function setupLights(scene) {
    // Create a directional light (sunlight)
    const sunlight = new THREE.DirectionalLight(0xffffff, 3.0);
    sunlight.position.set(100, 100, 100);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.width = 512;
    sunlight.shadow.mapSize.height = 512;
    sunlight.shadow.camera.near = 0.5;
    sunlight.shadow.camera.far = 500;
    sunlight.shadow.camera.left = -100;
    sunlight.shadow.camera.right = 100;
    sunlight.shadow.camera.top = 100;
    sunlight.shadow.camera.bottom = -100;
    scene.add(sunlight);

    const helper = new THREE.DirectionalLightHelper(sunlight, 3);
    scene.add(helper);

    // Create a point light
    const pointLight = new THREE.PointLight(0xddeeee, 1000.0);
    pointLight.position.set(-10, 10, 20);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 512;
    pointLight.shadow.mapSize.height = 512;
    pointLight.shadow.camera.near = 0.5;
    pointLight.shadow.camera.far = 500;
    scene.add(pointLight);

    const helper2 = new THREE.PointLightHelper(pointLight, 5);
    scene.add(helper2);
}
