import * as THREE from 'three';
import {
    WEBGL
} from '/src/js/webgl'


var renderer;
let width, height;
function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    }); //生成渲染对象（属性：抗锯齿效果为设置有效）
    renderer.setSize(width, height); //指定渲染器的宽高（和画布框大小一致）
    document.getElementById('canvas-frame').appendChild(renderer.domElement); //将创建的canvas元素(此处的canvas元素为three.js创建)添加到html文档中
    renderer.setClearColor(0x000000, 0.9); //设置渲染器的清除色和背景透明度
}

//此处为设置透视投影的相机，默认情况下，相机的上方向为Y轴，右方向为X轴，沿着Z轴垂直朝里(视眼角:fov;纵横比:aspect；相机离视最近的距离:near;相机离视体积最远距离:far)
var camera;

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    //设置相机的位置坐标
    // camera.position.x = 600;
    camera.position.y = 0;
    camera.position.z = 500;
    //设置相机的上为轴方向
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    //设置视野的中心坐标
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
    //第一个参数 Hex:光的颜色 第二个参数 Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些
    //第三个参数 Distance：光线的强度，从最大值衰减到0，需要的距离。 默认为0，表示光不衰减，如果非0，则表示从光源的位置到Distance的距离，光都在线性衰减。到离光源距离Distance时，光源强度为0.
    light = new THREE.DirectionalLight(0xFF0000, 1, 0);
    // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
    light.position.set(0, 0, 1); //光源的向量，即光源的位置
    scene.add(light); //追加光源到场景
}

//var cube;
function initObject() {
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    console.log(mesh)
    scene.add(mesh);

    // var geometry2 = new THREE.CubeGeometry(200, 100, 50, 4, 4);
    // var material2 = new THREE.MeshLambertMaterial({
    //     color: 0xFFFFFF
    // });
    // var mesh2 = new THREE.Mesh(geometry2, material2);
    // mesh2.position.set(-300, 0, 0);
    // scene.add(mesh2);

    // var geometry3 = new THREE.CubeGeometry(200, 100, 50, 4, 4);
    // var material3 = new THREE.MeshLambertMaterial({
    //     color: 0xFFFFFF
    // });
    // var mesh3 = new THREE.Mesh(geometry3, material3);
    // mesh3.position.set(0, -150, 0);
    // scene.add(mesh3);

    // var mesh4 = new THREE.Mesh(geometry3, material3);
    // mesh4.position.set(0, 150, 0);
    // scene.add(mesh4);

    // var mesh5 = new THREE.Mesh(geometry3, material3);
    // mesh5.position.set(300, 0, 0);
    // scene.add(mesh5);

    // var mesh6 = new THREE.Mesh(geometry3, material3);
    // mesh6.position.set(0, 0, -100);
    // scene.add(mesh6);

}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    // initLight();
    initObject();
    renderer.clear();
    renderer.render(scene, camera);
}

function animate() {
    threeStart()
    // requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
// animate();

if (WEBGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
} else {
    var warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}