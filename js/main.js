var Game = (function ()
{
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
    var laserColor = 0xFFFF00;
    var baseSize = 1;

    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);

    document.getElementById("webgl-canvas").appendChild(renderer.domElement);

    function animateScene()
    {
        setTimeout( function()
        {
            requestAnimationFrame(animateScene);
        }, 1000 / 30);
        if(startRendering)
            renderScene();
        renderer.render(scene, camera);
        if(startRendering)
        {
            document.getElementById("fps").innerHTML = (1 / (elapsed - prev)).toFixed(2);
            prev = elapsed;
        }

    }

    function renderScene()
    {
        elapsed = clock.getElapsedTime();
    }

    function updateCanvas()
    {
        width = window.innerWidth;
        height = window.innerHeight;
        aspectRatio = width/height;
        renderer.setSize(width,height);
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
    }

    function startGame()
    {
        document.getElementById("startGame").style.visibility = "hidden";
        startRendering = true;
        UI.MinimizeInstructions();
    }

    function init()
    {
        scene.add(camera);
        camera.position.set(0,150,150);
        camera.lookAt(scene.position);
        //backDrop.loadBackdrop();
        Listeners.AddEventListeners();
        animateScene();
    }

    return {
        Scene: scene,
        Camera: camera,
        Init: init,
        StartGame: startGame,
        UpdateCanvas: updateCanvas,
        StartRendering: startRendering,
        ShowInstruct: showInstruct,
        LaserColor: laserColor,
        BaseSize: baseSize
    };
})();

window.onload = Game.Init();
