import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);

// TODO use thi as the position of the cable
const cablePos = new THREE.Vector3(10,20,-3)

scene.background = new THREE.Color(0x252525); 

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Initialize OrbitControls
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

const loader = new GLTFLoader();

// TODO a scale to change the amount of multiplayer to the
const dimensionScale = 0.04

loader.load( './cavo.gltf', function ( gltf ) {
	scene.add( gltf.scene );
	controls.target.set( 0, 0, 0 ); 
	controls.update();
	gltf.scene.position.set(0,0,0)
	gltf.scene.traverse(function (child) {

		if (child.name === "center") {
			console.log(`child name:`, child.name);
			child.position.x = cablePos.x * dimensionScale
			child.position.y = cablePos.y * dimensionScale
			child.position.z = cablePos.z * dimensionScale
		}
	});
}, undefined, function ( error ) {
	console.error( error );
} );

camera.position.set(15, 6, 0); 

function animate() {
	requestAnimationFrame( animate );
	controls.update(); 
	renderer.render( scene, camera );
}

animate();
