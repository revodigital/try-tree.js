import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x252525);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Create a directional light (sunlight)
const sunlight = new THREE.DirectionalLight(0xffffff, 1.0);  // white light, full intensity

// Position the light
sunlight.position.set(100, 100, 100); // position the light above and to the side of the scene

// Enable shadows if needed
sunlight.castShadow = true;

// Configure shadow properties
sunlight.shadow.mapSize.width = 512;  // default is 512, higher for better quality shadows
sunlight.shadow.mapSize.height = 512;
sunlight.shadow.camera.near = 0.5;    // default
sunlight.shadow.camera.far = 500;     // how far the shadows are cast

// Add the light to the scene
scene.add(sunlight);

// Adjust the camera or the light shadow camera if needed
sunlight.shadow.camera.left = -100;
sunlight.shadow.camera.right = 100;
sunlight.shadow.camera.top = 100;
sunlight.shadow.camera.bottom = -100;

// (Optional) Helper to visualize the light's effect on the scene
const helper = new THREE.DirectionalLightHelper(sunlight, 3);
scene.add(helper);


// Create a point light
const pointLight = new THREE.PointLight(0xff0000, 500.0);  // white light, full intensity

// Position the light
pointLight.position.set(10, 10, -10); 

// Enable shadows if needed
pointLight.castShadow = true;

// Configure shadow properties
pointLight.shadow.mapSize.width = 512;  // default is 512, higher for better quality shadows
pointLight.shadow.mapSize.height = 512;
pointLight.shadow.camera.near = 0.5;    // default
pointLight.shadow.camera.far = 500;     // how far the shadows are cast

// Add the light to the scene
scene.add(pointLight);
// (Optional) Helper to visualize the light's effect on the scene
const helper2 = new THREE.PointLightHelper(pointLight, 5);
scene.add(helper2);



camera.position.set(0, 50, 50);
camera.lookAt(0, 0, 0);
const controls = new OrbitControls(camera, renderer.domElement);

// Shape definitions and state
const shapes = {
    Cube: () => new THREE.BoxGeometry(2, 2, 2),
    Sphere: () => new THREE.SphereGeometry(1, 32, 32),
    Pyramid: () => new THREE.ConeGeometry(1.5, 2, 4)
};
const material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00,  });
const state = {
    selectedShape: 'Cube'
};

// Plane
const planeGeometry = new THREE.BoxGeometry(20, 5,2);
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
const cylinders = [];

for (let i = 1; i <= numCylinders; i++) {
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.x = -planeGeometry.parameters.width / 2 + i * spacing;
    cylinder.position.y = 1;
    cylinders.push(cylinder);
    scene.add(cylinder);
}

// GUI for shape selection
const gui = new GUI();
gui.add(state, 'selectedShape', Object.keys(shapes));

// Dragging logic
let draggable = null;

// Set up raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let selectedObject = null;
const selectedObjects = [];

// Set up EffectComposer and passes
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
composer.addPass(outlinePass);

const effectFXAA = new ShaderPass(FXAAShader);
effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
composer.addPass(effectFXAA);


window.addEventListener('mousedown', (event) => {

  event.preventDefault();

  // Convert mouse position to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the ray
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    selectedObject = intersects[0].object;
    selectedObject.material.color.set(0xff0000); // Highlight the object
      
    outlinePass.selectedObjects = [selectedObject];

    controls.enabled = false;
    // Calculate the offset
    const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
    offset.copy(planeIntersect).sub(selectedObject.position);
  }

    // const mouse3D = new THREE.Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    // const raycaster = new THREE.Raycaster();
    // raycaster.setFromCamera(mouse3D, camera);
    // const intersects = raycaster.intersectObjects(cylinders);
    
    // if (intersects.length > 0) {
    //     const geometry = shapes[state.selectedShape]();
    //     draggable = new THREE.Mesh(geometry, material);
    //     scene.add(draggable);
    //     draggable.position.copy(intersects[0].point);
    // }
});

window.addEventListener('mousemove', (event) => {
    // if (draggable) {
    //     const mouse3D = new THREE.Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    //     const raycaster = new THREE.Raycaster();
    //     raycaster.setFromCamera(mouse3D, camera);
    //     const intersects = raycaster.intersectObjects(cylinders);
    //     if (intersects.length > 0) {
    //         draggable.position.copy(intersects[0].point);
    //     }
    // }
      event.preventDefault();

  if (selectedObject) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate the new position for the selected object
    const planeIntersect = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);
    selectedObject.position.copy(planeIntersect.sub(offset));
  }
});

window.addEventListener('mouseup', () => {
    // draggable = null;

  if (selectedObject) {
    selectedObject.material.color.set(0x00ff00); // Reset color
    selectedObject = null;
    outlinePass.selectedObjects = []
    controls.enabled = true;
  }
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
