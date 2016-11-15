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
    var highScore = 0; // plan is this will be pulled externally

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
        var moveLeft = Listeners.GetMoveLeft();
        var moveRight = Listeners.GetMoveRight();
        var edge = aspectRatio * 950 / 1920 * 100;
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

        // shoot laser if spacebar is held down
        if(Listeners.GetIsShooting() && inSession && framesPassed > Globals.LaserDelay)
        {
            framesPassed = 0;
            MainSpaceShip.ShootLaser();
        }

        if (lasers.length > 0)
        {
            for (var i = 0; i < lasers.length; i++){
                lasers[i].translateZ(-4);
                // remove lasers that left the f.o.v.
                if (lasers[i].position.z < -100)
                {
                    scene.remove(lasers[i]);
                    MainSpaceShip.RemoveLaser(i);
                }
            }
        }
    }

    function updateCanvas()
    {
        console.log("Updating Window Size...");
        width = window.innerWidth;
        height = window.innerHeight;
        aspectRatio = width/height;
        renderer.setSize(width,height);
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
        console.log("New Dimensions: ");
        console.log("H: " + height + " W: " + width);
    }

    function updateUIVariables()
    {
        document.getElementById("health").innerHTML = MainSpaceShip.GetHealth();
        document.getElementById("playerScore").innerHTML = MainSpaceShip.GetScore();
        document.getElementById("highScore").innerHTML = highScore;
    }

    function startGame()
    {
        console.log("Starting New Game...");

        inSession = true;
        startRendering = true;

        UI.MinimizeInstructions();
        UI.HideStartText();

        MainSpaceShip.Init();
        scene.add(MainSpaceShip.Figure());

        // This light source illuminates everything
        scene.add(World.LightSource());

        updateCanvas();
        updateUIVariables();

        console.log("New Game Created Successfully!");
    }

    function setScene()
    {
        scene.add(camera);
        camera.position.set(0, 150, 150);
        camera.lookAt(scene.position);
    }

    function emptyScene()
    {
        var i = scene.children.length - 1;
        for (; i >= 0; i--)
        {
            var child = scene.children[i];
            scene.remove(child);
        }
    }

    function resetVariables()
    {
        showInstruct = true;
        startRendering = false;
        inSession = false;
    }

    function reload()
    {
        emptyScene();
        resetVariables();
        setScene();
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

    return {
        AnimateScene: animateScene,
        GetInSession: getInSession,
        GetScene: getScene,
        GetShowInstruct: getShowInstruct,
        GetStartRendering: getStartRendering,
        Reload: reload,
        StartGame: startGame,
        SetScene: setScene,
        SetStartRendering: setStartRendering,
        SetShowInstruct: setShowInstruct,
        UpdateCanvas: updateCanvas
    };
})();
