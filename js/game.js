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
    var framesPassed = 0;

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
    }

    function renderScene()
    {
        // grab variables needed
        var moveLeft = MainSpaceShip.GetMoveLeft();
        var moveRight = MainSpaceShip.GetMoveRight();
        var edge = aspectRatio >= 1 ? 0.05 * width : 0.03 * width;
        var player = MainSpaceShip.Figure();
        var lasers = MainSpaceShip.GetLasers();
        var playerX = player.position.x;

        // update fps
        elapsed = clock.getElapsedTime();
        document.getElementById("fps").innerHTML = (1 / (elapsed - prev)).toFixed(2);
        prev = elapsed;
        framesPassed++;

        // move player
        if (moveLeft && playerX > -edge)
            player.translateX(-3);
        if (moveRight && playerX < edge)
            player.translateX(3);

        if (lasers.length > 0)
        {
            for (var i = 0; i < lasers.length; i++){
                lasers[i].translateZ(-4);
                // remove lasers that left the f.o.v.
                if (lasers[i].position.z < -100)
                {
                    scene.remove(lasers[i])
                    MainSpaceShip.RemoveLaser(i);
                }
            }
        }


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
        startRendering = true;

        UI.MinimizeInstructions();
        UI.HideStartText();

        MainSpaceShip.Init();
        scene.add(MainSpaceShip.Figure());

        scene.add(World.LightSource());
    }

    function setScene()
    {
        scene.add(camera);
        camera.position.set(0, 150, 150);
        camera.lookAt(scene.position);
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

    function getScene()
    {
        return scene;
    }

    function getFramesPassed()
    {
        return framesPassed;
    }

    function resetFramesPassed()
    {
        framesPassed = 0;
    }

    return {
        AnimateScene: animateScene,
        GetFramesPassed: getFramesPassed,
        GetInSession: getInSession,
        GetScene: getScene,
        GetShowInstruct: getShowInstruct,
        GetStartRendering: getStartRendering,
        ResetFramesPassed: resetFramesPassed,
        StartGame: startGame,
        SetScene: setScene,
        SetStartRendering: setStartRendering,
        SetShowInstruct: setShowInstruct,
        UpdateCanvas: updateCanvas
    };
})();
