var scene, camera, clock, prev=0, showInstruct=true; startRendering=false;

var moveLeft=false, moveRight=false;

window.onload = function(){
    initializeScene();
    setScene();
    animateScene();
}

function initializeScene(){
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var aspectRatio = canvasWidth / canvasHeight;

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0xD3D3D3);
    renderer.setSize(canvasWidth, canvasHeight);

    document.getElementById("webgl-canvas").appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 10000);
    clock = new THREE.Clock();

    addEventListeners();
}

function setScene() {
    camera.position.set(0,150,150);
    camera.lookAt(scene.position);
    scene.add(camera);

    loadBackdrop();
}

function animateScene() {
    setTimeout( function() {
        requestAnimationFrame(animateScene);
    }, 1000 / 60);

    if(startRendering)
        renderScene();
    renderer.render(scene, camera);
    if(startRendering){
        var fps = document.getElementById("fps");
        fps.innerHTML = (1 / (elapsed - prev)).toFixed(2);
        prev = elapsed;
    }

}

function renderScene() {
    elapsed = clock.getElapsedTime();
}