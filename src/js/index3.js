import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import imgDemo from '../assets/imgs/m2.png'
var renderer, width, height;

function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 2000;
    camera.position.z = 3000;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
        x: 0,
        y: 0,
        z: 0
    });
}

var scene;

function initScene() {
    scene = new THREE.Scene();
}

var light;

function initLight() {
    // A start
    // 第二个参数是光源强度，你可以改变它试一下
    light = new THREE.DirectionalLight(0xffffff, 1);
    // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
    light.position.set(0, 1, 0);
    scene.add(light);
    // A end
}

function Map (url, x,y,z) {
    new THREE.TextureLoader().load(url, function(texture){
        const material = new THREE.MeshLambertMaterial( { map: texture } );
        // const material = new THREE.MeshBasicMaterial( { map: texture } );
        const quad = new THREE.BoxGeometry(550, 10, 300);
        const mesh = new THREE.Mesh(quad, material);
        mesh.position.set(x, y, z);
        scene.add(mesh);

        render();
    });
}

function initObject () {
    const img = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1645400555,522596956&fm=26&gp=0.jpg'

    for(let i = 0; i < 10; i++){
        Map(imgDemo, 0, -500+i*100, 0)
    }
    
}


// 轨道控制器
var controls

function initControls() {
    controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render);
    controls.update();
}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    initControls();
    console.log(scene);
    renderer.clear();
    render()
}

function render () {
    renderer.render(scene, camera);
}

window.onload = threeStart()