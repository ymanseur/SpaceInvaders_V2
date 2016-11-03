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
    var inSession = false;

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
        inSession = true;
        document.getElementById("startGame").style.visibility = "hidden";
        startRendering = true;
        UI.MinimizeInstructions();
        MainSpaceShip.Init();
        scene.add(MainSpaceShip.Figure());
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

    function getInSession()
    {
        return inSession;
    }

    function getStartRendering()
    {
        return startRendering;
    }

    function setStartRendering(_value)
    {
        startRendering = _value;
    }

    function getShowInstruct()
    {
        return showInstruct;
    }

    function setShowInstruct(_value)
    {
        showInstruct = _value;
    }

    return {
        Init: init,
        StartGame: startGame,
        UpdateCanvas: updateCanvas,
        GetStartRendering: getStartRendering,
        SetStartRendering: setStartRendering,
        GetShowInstruct: getShowInstruct,
        SetShowInstruct: setShowInstruct,
        GetInSession: getInSession
    };
})();

window.onload = Game.Init();
