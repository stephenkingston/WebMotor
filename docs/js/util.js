import {scene, camera, renderer} from "./3d.js";
import * as THREE from "./3js-lib/three.module.js";

window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

let rotSlider = document.getElementById("rotationSlider");

rotSlider.addEventListener('input', () => {
    let shaft = scene.getObjectByName("shaft");
    shaft.rotation.z = rotSlider.value * (Math.PI / 180.0);
});

