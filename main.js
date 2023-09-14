import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);


scene.background = new THREE.Color(0x252525); 

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Initialize OrbitControls
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

const loader = new GLTFLoader();

loader.load( './file.gltf', function ( gltf ) {
	scene.add( gltf.scene );
	controls.target.set( 0, 0.5, 0 ); // Set the point to look at (optional)
	controls.update();
gltf.scene.position.set(0,-10,0)
	gltf.scene.traverse(function (child) {
    if (child.isMesh && child.name === "palo") {
        child.rotation.x += Math.PI / 15; // rotates the mesh by 45 degrees on the x-axis
    }
});
}, undefined, function ( error ) {
	console.error( error );
} );



camera.position.set(15, 20, 30); // x, y, z

// Point the camera slightly downward
controls.target.set(0, 5, 0);  // x, y, z

function animate() {
	requestAnimationFrame( animate );

	controls.update(); // Required if controls.enableDamping or controls.autoRotate are set to true

	renderer.render( scene, camera );
}

animate();
