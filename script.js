// import './style.css'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// // import * as dat from 'dat.gui'

// loader
const loader = new THREE.TextureLoader
const cross = loader.load('./texture/5.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
// *****************************************************************************************************************

var geometry = new THREE.SphereGeometry( 0.4, 32, 32 );
var texture = new THREE.TextureLoader().load('./texture/earth1.jpg');


// var texture = new THREE.TextureLoader().load('texture/globeshodow.png');
//Lambart[for mat] Phong[for little shining]
var material = new THREE.MeshPhongMaterial({
    map : texture,
    bumpMap : THREE.ImageUtils.loadTexture('./texture/bump.jpg'),
    bumpScale : 1,
    specularMap	: THREE.ImageUtils.loadTexture('./texture/spec.jpg'),
	specular	: new THREE.Color('grey'),
});
var sphere = new THREE.Mesh( geometry, material );



// *********************************************************************************************


const particlessGeometry = new THREE.BufferGeometry;
const particlesCnt = 80000;

const posArray = new Float32Array(particlesCnt*3);

for(let i=0; i< particlesCnt*3 ; i++){
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5 )
}

particlessGeometry.setAttribute('position',new THREE.BufferAttribute(posArray,3));

// Materials

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    map: cross,
    
    blending : THREE.AdditiveBlending
})

// Mesh

// const sphere = new THREE.Points(geometry,material)
const particlesMesh = new THREE.Points(particlessGeometry,particlesMaterial)

scene.add(particlesMesh,sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// const pointlight2 = new THREE.PointLight(0xffffff,1)
// pointlight2.position.set(-2,-3,1)
// scene.add(pointlight2)
const light = new THREE.HemisphereLight( 0xffffff,0xffffff, 0.6 );
scene.add( light );
light.position.set(0,-1,0)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#21282a'),1)


// Mouse

document.addEventListener('mousemove',animateParticles)
document.addEventListener('mousemove',onDocumentMouseMove)


    let mouseY = 0
    let mouseX = 0
    let X = 0
    let Y = 0

    let targetX = 0
    let targetY = 0

    const windowX = window.innerWidth / 2;
    const windowY = window.innerHeight / 2;

   function onDocumentMouseMove(event){
        X = (event.clientX - windowX)
        Y = (event.clientY - windowY)
    }

    function animateParticles(event){
        mouseY = event.clientY
        mouseX = event.clientX
    }

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = X * .002
    targetY = Y * .002

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime
particlesMesh.rotation.y = -.1 * elapsedTime

if(mouseX > 0 ){
    particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00007)
    particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00007)
  
}    

    sphere.rotation.y = 1 * elapsedTime

    sphere.rotation.y += .005 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)
 
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()