import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { degToRad, radToDeg } from 'three/src/math/MathUtils.js';
import { metallicMaterial1, metallicMaterial2, metallicMaterial3, metallicMaterialRed, metallicMaterialBlue } from './materials';
import { availablePositions } from './controls'
import { setBasicTube } from './tube'

var pi = Math.PI;

export const cilinders = []


function degrees_to_radians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}

export function crateBoard(scene) {
    
const loader = new FBXLoader();

const fbxScale = 0.015

loader.load(
  'fbx/carmeloParts.fbx',
    (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = metallicMaterial1; // Apply the metallic material to each mesh
      }
    });
        object.scale.set(fbxScale * 0.93, fbxScale * 0.77, fbxScale); 
        // let vect = object.position
        object.position.z = 0.6
        scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    console.log('An error happened'); 
  }
);


loader.load(
  'fbx/stripe.fbx',
    (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = metallicMaterial2; // Apply the metallic material to each mesh
      }
    });
        cilinders.length = 0
        object.scale.set(fbxScale, fbxScale, fbxScale);
        // scene.add(object);

        const horizontalCount = 20;  // Number of objects in each horizontal array
        const verticalCount = 7;    // Number of horizontal arrays
        const horizontalSpacing = 0.0;  // Spacing between objects in the horizontal array
        const verticalSpacing = 1.5;    // Spacing between horizontal arrays

        const objectWidth = 30 * fbxScale;  // Width of each object
        const objectHeight = 38.5 * fbxScale;  // Height of each object

        // Calculate total width and height of the grid
        const totalWidth = horizontalCount * objectWidth + (horizontalCount - 1) * horizontalSpacing;
        const totalHeight = verticalCount * objectHeight + (verticalCount - 1) * verticalSpacing;

        // Calculate the initial offset to center the grid
        const initialX = -totalWidth / 2 + objectWidth / 2;
        const initialY = -totalHeight / 2 + objectHeight / 2;

        // Create horizontal arrays of objects
        for (let i = 0; i < verticalCount; i++) {
            for (let j = 0; j < horizontalCount; j++) {
                let clone = object.clone();  // Clone the object for each instance
                // Position each clone in a grid, centered
                clone.position.x = initialX + j * (objectWidth + horizontalSpacing);
                clone.position.y = initialY + i * (objectHeight + verticalSpacing);

                cilinders.push(clone)
                scene.add(clone);  // Add each clone to the scene
            }
        }

        availablePositions.length = 0
        availablePositions.push(...cilinders.map(e => e.position))
      // delay(() => {
      //   availablePositions.length = 0
      //   availablePositions.push(...cilinders.map(e => e.position))
      //   console.log(availablePositions.length);
      // })
    },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
    (error) => {
      
    console.log('An error happened', error); 
  }
);

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
  async function delay( fun) {
    await new Promise(resolve => setTimeout(resolve, getRandomFloat(300,100)));
    fun()
}
    



loader.load(
  'fbx/border.fbx',
    (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = metallicMaterial3; // Apply the metallic material to each mesh
      }
    });
        
        object.scale.set(fbxScale, fbxScale * 0.6, 0.005);
        // scene.add(object);

        const horizontalCount = 5;  // Number of objects in each horizontal array
        const verticalCount = 8;    // Number of horizontal arrays
        const horizontalSpacing = 0.0;  // Spacing between objects in the horizontal array
        const verticalSpacing = 1.5
            ;    // Spacing between horizontal arrays

        const objectWidth = 140 * fbxScale;  // Width of each object
        const objectHeight = 38.5
            * fbxScale;  // Height of each object

        // Calculate total width and height of the grid
        const totalWidth = horizontalCount * objectWidth + (horizontalCount - 1) * horizontalSpacing;
        const totalHeight = verticalCount * objectHeight + (verticalCount - 1) * verticalSpacing;

        // Calculate the initial offset to center the grid
        const initialX = -totalWidth / 2 + objectWidth / 2;
        const initialY = -totalHeight / 2 + objectHeight / 2;

        // Create horizontal arrays of objects
      // for (let i = 0; i < verticalCount; i++) {
      //       for (let j = 0; j < horizontalCount; j++) {
      //           let clone = object.clone();  // Clone the object for each instance
      //           // Position each clone in a grid, centered
      //           clone.position.x = initialX + j * (objectWidth + horizontalSpacing);
      //           clone.position.y = initialY + i * (objectHeight + verticalSpacing);
                
      //           scene.add(clone);  // Add each clone to the scene
      //       }
      //   }

      for (let i = 0; i < 2; i++) {
        const ii = i == 0? 0 : verticalCount - 1
            for (let j = 0; j < horizontalCount; j++) {
                let clone = object.clone();  // Clone the object for each instance
                // Position each clone in a grid, centered
                clone.position.x = initialX + j * (objectWidth + horizontalSpacing);
                clone.position.y = initialY + ii * (objectHeight + verticalSpacing);
                
                scene.add(clone);  // Add each clone to the scene
            }
        }

      

        const HorizzontalNumberBorder = 11
        const VerticalNumberBorder = verticalCount-1

        const offsetXX = ((HorizzontalNumberBorder + horizontalSpacing) / -2)
        const offsetYY = ((objectWidth * VerticalNumberBorder ) / -2 + objectWidth/2)

        // Create horizontal arrays of objects
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < VerticalNumberBorder; j++) {
                let clone = object.clone();  // Clone the object for each instance
                // Position each clone in a grid, centered
                clone.position.y = offsetYY  + j * (objectWidth);

                clone.position.x = offsetXX + i * (HorizzontalNumberBorder + horizontalSpacing);

                clone.rotateZ(degToRad(90))
                
                scene.add(clone);  // Add each clone to the scene
            }
        }
    },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
    (error) => {
      
    console.log('An error happened', error); 
  }
);
    
    
loader.load(
  'fbx/eletr.fbx',
    (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
          child.material = metallicMaterial2;
          child.customType = 'movable'
      }
    });
        const i = 3.6
        // object.customType = 'movable'

        object.scale.set(fbxScale * i, fbxScale * i, fbxScale * i);
        object.rotateX(degToRad(90))
        eletrPart = object

        // console.log(eletrPart);

        eletrPart1 = eletrPart.clone(); 
        eletrPart2 = eletrPart.clone(); 

        eletrPart1.traverse((child) => {
            if (child.isMesh) {
                child.material = metallicMaterialRed; 
            }
        });

        eletrPart2.traverse((child) => {
            if (child.isMesh) {
                child.material = metallicMaterialBlue;
            }
        });

    },
  (xhr) => {},
  (error) => {
    console.log('An error happened', error); 
  }
);
  
  setBasicTube(scene)


}

export let eletrPart;
export let eletrPart1;
export let eletrPart2;