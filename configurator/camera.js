
export function getFirstCameraInScene(scene){

    let cameraList = [];
    let camera;

	// Get a list of all cameras in the scene
	scene.traverse(function (object) {
	if (object.isCamera) {
		cameraList.push(object);
	}
	});

	//Set the camera to the first value in the list of cameras
	camera = cameraList[0];

	return camera;
}


export function updateCameraAspect(camera) {
	const width = window.innerWidth;
	const height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}