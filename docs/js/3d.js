import * as THREE from "./3js-lib/three.module.js";
import {OrbitControls} from "./3js-lib/OrbitControls.js";
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

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
                        node.receiveShadow = true;
                    }
                })
                model.scene.name = "motorBody";
                model.scene.translate
                scene.add(model.scene);
});

/* GitHub link: https://raw.githubusercontent.com/stephenkingston/WebMotor/master/docs/models/shaft.gltf */
/* Local link to 3D file - ../docs/models/shaft.gltf */

loader.load("https://raw.githubusercontent.com/stephenkingston/WebMotor/master/docs/models/shaft.gltf", (model) => {
    model.scene.traverse((node) =>{
        if (node instanceof THREE.Mesh)
        {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    })
    model.scene.name = "shaft";
    scene.add(model.scene);
});

/* Lighting */
const light = new THREE.AmbientLight(0xFFFFFF, 0.9);
const dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 1);
const dirLight2 = new THREE.DirectionalLight(0xFFFFFF, 1);
dirLight1.position.set(5, 6, 5);
dirLight2.position.set(5, -6, -5);
dirLight1.castShadow = true;

/* Axes Helper */
let axesHelper = new THREE.AxesHelper( 1 );
scene.add(axesHelper);

let helper = new THREE.BoxHelper(scene.getObjectByName("shaft"));
scene.add(helper);

/* Add all the things */
scene.add(light);
scene.add(dirLight1);
scene.add(dirLight2);
camera.position.set(0.156, 0.209, -0.263);

export {scene, camera, renderer}

GameLoop();
