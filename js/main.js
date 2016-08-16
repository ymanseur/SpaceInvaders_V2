/*var scene, camera, clock, prev=0, showInstruct=true; startRendering=false;

var moveLeft=false, moveRight=false;

window.onload = function(){
    initializeScene();
    setScene();
    animateScene();
};

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
*/

var game = (function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var aspectRatio = width / height;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 10000);
    var clock = new THREE.Clock();
    var renderer = new THREE.WebGLRenderer({antialias:true});
    var prev = 0;
    var elapsed = 0;
    var showInstruct = true;
    var startRendering = false;
    var moveLeft = false;
    var moveRight = false;

    renderer.setClearColor(0xD3D3D3);
    renderer.setSize(width, height);

    document.getElementById("webgl-canvas").appendChild(renderer.domElement);

    function animateScene() {
        setTimeout( function() {
            requestAnimationFrame(animateScene);
        }, 1000 / 60);
        console.log(startRendering);
        if(startRendering)
            renderScene();
        renderer.render(scene, camera);
        if(startRendering){
            document.getElementById("fps").innerHTML = (1 / (elapsed - prev)).toFixed(2);
            prev = elapsed;
        }

    }

    function renderScene() {
        elapsed = clock.getElapsedTime();
    }

    function updateCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        aspectRatio = width/height;
        renderer.setSize(width,height);
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
    }

    function startGame() {
        document.getElementById("startGame").style.visibility = "hidden";
        startRendering = true;
        UI.minimizeInstructions();
    }

    function init() {
        scene.add(camera);
        camera.position.set(0,150,150);
        camera.lookAt(scene.position);
        backDrop.loadBackdrop();
        listeners.addEventListeners();
        animateScene();
    }

    return {
        scene: scene,
        camera: camera,
        init: init,
        startGame: startGame,
        updateCanvas: updateCanvas,
        startRendering: startRendering,
        showInstruct: showInstruct
    };
})();

window.onload = game.init();
