import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
var width = document.getElementById('canvas-frame').clientWidth;
var height = document.getElementById('canvas-frame').clientHeight;
renderer.setSize(width, height);

document.getElementById('canvas-frame').appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.x = 600;
camera.position.y = 0;
camera.position.z = 500;

var light;

function initLight() {
    //第一个参数 Hex:光的颜色 第二个参数 Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些
    //第三个参数 Distance：光线的强度，从最大值衰减到0，需要的距离。 默认为0，表示光不衰减，如果非0，则表示从光源的位置到Distance的距离，光都在线性衰减。到离光源距离Distance时，光源强度为0.
    light = new THREE.DirectionalLight(0xffffff, 0.5);
    // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
    light.position.set(0, 0, 1); //光源的向量，即光源的位置
    scene.add(light); //追加光源到场景
}

var animate = function () {
    initLight()
    // requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();