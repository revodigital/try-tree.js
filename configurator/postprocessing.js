import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import * as THREE from 'three';
let outlinePass 
export function setupPostProcessing(renderer, scene, camera) {
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
   
	outlinePass = getOutlineEffect(window, scene, camera);
	configureOutlineEffectSettings_Default(outlinePass);
    composer.addPass(outlinePass);
    
    // const effectFXAA = new ShaderPass(FXAAShader);
    // effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    // composer.addPass(effectFXAA);

    return composer;
}


export function getOutlineEffect(window, scene, camera){
    let outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );

    return outlinePass;
}

export function configureOutlineEffectSettings_Default(outlinePass){

    outlinePass.edgeStrength = 5;
    outlinePass.edgeGlow = 10;
    outlinePass.edgeThickness = 4;
    outlinePass.pulsePeriod = 9;
    outlinePass.visibleEdgeColor.set('#ffffff');
    outlinePass.hiddenEdgeColor.set('#190a05');

}

export function addOutlinesBasedOnIntersections(intersections){

    outlinePass.selectedObjects = [];

    if (intersections.length > 0) {
        
        console.log('added outline');
        let firstObject = intersections[0].object
    
            outlinePass.selectedObjects = [firstObject];
        
    }
}