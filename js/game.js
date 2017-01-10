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
    var enemyCounter = 0; // counter
    var level = 1; //start off in easy mode

    // Variables declared after scene is set to avoid duplicate function calls
    var player;
    var playerFront;
    var playerBack;

    // import globals
    var enemyCycleLength = Globals.EnemyCycleLength;
    var enemyLaserSpeed = Globals.EnemyLaserSpeed;
    var playerSpeed = Globals.PlayerSpeed;
    var playerLaserSpeed = Globals.PlayerLaserSpeed;

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
        var lasers = MainSpaceShip.GetLasers();
        var enemyLaser = Enemies.GetLaser();
        var playerX = player.position.x;

        // update fps
        elapsed = clock.getElapsedTime();
        document.getElementById("fps").innerHTML = (1 / (elapsed - prev)).toFixed(2);
        prev = elapsed;
        framesPassed++;

        // move player
        if (moveLeft && playerX > -edge)
            player.translateX(-playerSpeed);
        if (moveRight && playerX < edge)
            player.translateX(playerSpeed);

        // move enemies
        enemyCounter = (enemyCounter + 1) % enemyCycleLength;
        Enemies.Mobilize(level, enemyCounter);

        // shoot laser if spacebar is held down
        if(inSession && Listeners.GetIsShooting() && framesPassed > Globals.LaserDelay)
        {
            framesPassed = 0;
            MainSpaceShip.ShootLaser();
        }

        // process player laser movement and behavior
        if (lasers.length > 0)
        {
            for (var i = 0; i < lasers.length; i++){
                lasers[i].translateZ(-playerLaserSpeed);
                // remove lasers that left the f.o.v.
                if (lasers[i].position.z < -100)
                {
                    MainSpaceShip.RemoveLaser(i);
                }
            }
        }

        // process enemy laser movement and behavior
        enemyLaser.translateZ(enemyLaserSpeed);
        var enemyLaserLocationX = enemyLaser.position.x;
        var enemyLaserLocationZ = enemyLaser.position.z;
        if(enemyLaserLocationZ < playerFront) // laser is in front of player
        {
            //Allow laser to keep travelling
        }
        else if (enemyLaserLocationZ >= playerFront && enemyLaserLocationZ <= playerBack)
        {
            if (enemyLaserLocationX > MainSpaceShip.GetLeft() && enemyLaserLocationX < MainSpaceShip.GetRight())
            {
                MainSpaceShip.TakeHit();
                Enemies.ResetLaser();
                updateUIVariables();
            }
        }
        else // laser is behind player
            Enemies.ResetLaser();
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
        document.getElementById("currentLevel").innerHTML = level;
    }

    function startGame()
    {
        console.log("Starting New Game...");

        inSession = true;
        startRendering = true;

        UI.MinimizeInstructions();
        UI.HideStartText();

        populateScene();

        updateCanvas();
        updateUIVariables();

        console.log("New Game Created Successfully!");
    }

    function populateScene()
    {
        // This light source illuminates everything
        scene.add(World.LightSource());

        // Add player spaceship to scene
        MainSpaceShip.Init();
        scene.add(MainSpaceShip.Figure());

        // Add enemies to scene
        Enemies.Init();
        var enemies = Enemies.GetEnemies();
        for(var i = 0; i < enemies.length; i++)
        {
            scene.add(enemies[i]);
        }

        // Init final global variables to avoid repeat function calls
        player = MainSpaceShip.Figure();
        playerFront = MainSpaceShip.GetFront();
        playerBack = MainSpaceShip.GetBack();
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
        enemyCounter = 0;
        level = 1;
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
