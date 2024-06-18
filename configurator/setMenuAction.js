// import { CurrentDataId, handleMouseMove,  placedCubesData, setDraggingTrue } from "./controls";
// import { scene } from "./main";
// import { eletrPart, eletrPart1, eletrPart2 } from "./objects";



// export function addMenuAction() {
    
//     let cubeItems = [
//         { elementId: 'cube-item', clonePart: eletrPart },
//         { elementId: 'cube-item2', clonePart: eletrPart1 },
//         { elementId: 'cube-item3', clonePart: eletrPart2 }
//     ];
//     cubeItems.forEach(item => {
//         const element = document.getElementById(item.elementId);
//         if (element) {
//             element.addEventListener('mousedown', (event) => handleMouseDown(item.clonePart, event));
//         }
// });}

// function handleMouseDown(part, event) {
//     setDraggingTrue()
//     const newCube = part.clone();
//     newCube.position.set(0, 1000, 1);
//     scene.add(newCube);

//     cubes.push(newCube.id);
//      CurrentDataId = placedCubesData.push({
//         cube: newCube,
//         id: newCube.id,
//         positionIndex: -1
//     }) - 1;

//     console.log('Cube added with ID:');
//     handleMouseMove(event); 
// }

// // addMenuAction();