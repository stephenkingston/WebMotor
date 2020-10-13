import * as THREE from "./3js-lib/three.module.js";
import {OrbitControls} from "./3js-lib/OrbitControls.js";
import {FBXLoader} from "./3js-lib/FBXLoader.js";
import {GLTFLoader} from "./3js-lib/GLTFLoader.js";

const update = function ()
{
    orbCon.update();
}

const render = function ()
{
    renderer.render(scene, camera);
}

const GameLoop = function()
{
    requestAnimationFrame(GameLoop)
    update();
    render();
}

/* Standard scene, camera, renderer and orbit controls */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer();

renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

let orbCon = new OrbitControls(camera, renderer.domElement);
orbCon.maxPolarAngle = Math.PI/2.4;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

/* 3D Models */
const loader = new GLTFLoader()

/* GitHub link: https://raw.githubusercontent.com/stephenkingston/WebMotor/master/docs/models/motor.gltf */
/* Local link to 3D file - ../docs/models/motor.gltf */

loader.load("https://raw.githubusercontent.com/stephenkingston/WebMotor/master/docs/models/motor.gltf", (model) => {
                model.scene.traverse((node) =>{
                    if (node instanceof THREE.Mesh)
                    {
                        node.castShadow = true;
                    }
                })
                scene.add(model.scene)
});

/* Lighting */
const light = new THREE.AmbientLight(0xFFFFFF, 0.3);
const dirLight = new THREE.PointLight(0xFFFFFF, 1.4, 10, 0.1);
dirLight.position.set(5, 6, 3);
dirLight.castShadow = true;

/* Add all the things */
scene.add(light);
scene.add(dirLight);
camera.position.set(0.156, 0.209, -0.263);

export {scene, camera, renderer}

GameLoop();

