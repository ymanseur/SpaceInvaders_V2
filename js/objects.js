var Animations = (function ()
{
    var baseSize = Globals.BaseSize;

    function createExplosion( object3D )
    {
        var x = object3D.position.x;
        var z = object3D.position.z;
        setTimeout( function () { createParticles(x, z); }, 0);
        setTimeout( function () { createParticles(x, z); }, 125);
        setTimeout( function () { createParticles(x, z); }, 250);
    }

    function createParticles (x, z)
    {
        var explosion = new THREE.Object3D();
        var size = 0.5 * baseSize;

        //create field of random particles
        for (var i = 0; i < 50; i++)
        {
            var particle = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshPhongMaterial({color:0x39FF14}));
            var randX = 10 * baseSize * Math.random() - 5 * baseSize;
            var randYZ = 7 * baseSize * Math.random() - 3.5 * baseSize;
            particle.position.set(randX, randYZ, randYZ);
            explosion.add(particle);
        }

        explosion.position.set(x, 0, z);

        setTimeout( function () { scene.add(explosion); }, 0);
        setTimeout( function () { scene.remove(explosion); }, 125);
    }

    return {
        CreateExplosion: createExplosion
    };
})();

var World = (function()
{
    function lightSource()
    {
        var light = new THREE.PointLight(Globals.LaserColor, 0.5, 1000);
        light.position.set(0, 150, 60);
        return light;
    }

    return{
        LightSource: lightSource
    }
})();

var MainSpaceShip = (function ()
{
    var parts; //array of boxes that make up the player's spaceship
    var lights; //array of point lights surrounding the player's spaceship
    var baseSize; //global variable for dimensions
    var laserColor;
    var health;
    var score;

    var figure; //object3D of spaceship
    var lasers; //array of lasers shot

    function init ()
    {
        initVariables();

        createParts();

        positionParts();

        lightParts();

        for (var i = 0; i < parts.length; i++)
        {
            figure.add(parts[i]);
        }

        for (var i = 0; i < lights.length; i++)
        {
            figure.add(lights[i]);
        }

        //move back spaceship
        figure.position.z = 55 / baseSize;

    }

    function initVariables() {
        parts = [];
        lights = [];
        baseSize = Globals.BaseSize;
        laserColor = Globals.LaserColor;
        health = 10;
        score = 0;
        figure = new THREE.Object3D();
        lasers = [];
    }

    function createParts ()
    {
        var boxGeometry = [
            new THREE.BoxGeometry(13 * baseSize, baseSize, 4 * baseSize),
            new THREE.BoxGeometry(11 * baseSize, baseSize,     baseSize),
            new THREE.BoxGeometry( 3 * baseSize, baseSize, 2 * baseSize),
            new THREE.BoxGeometry(     baseSize, baseSize,     baseSize)
        ];

        var shipMaterial = new THREE.MeshPhongMaterial({color:0x39FF14});

        for(var  i = 0; i < boxGeometry.length; i++)
        {
            var boxMesh = new THREE.Mesh(boxGeometry[i], shipMaterial);
            parts.push(boxMesh);
        }
    }

    function positionParts ()
    {
        var offset = 4 * baseSize;
        parts[0].position.set(0, 0, 5.5 * baseSize - offset);
        parts[1].position.set(0, 0, 3.0 * baseSize - offset);
        parts[2].position.set(0, 0, 1.5 * baseSize - offset);
        parts[3].position.set(0, 0, -offset);
    }

    function lightParts ()
    {
        var offset = 4 * baseSize;
        lights = [
            new THREE.PointLight(laserColor, 0.4),
            new THREE.PointLight(laserColor, 0.4),
            new THREE.PointLight(laserColor, 0.4),
            new THREE.PointLight(laserColor, 0.4)
        ];

        lights[0].position.set(0, offset, -offset);
        lights[1].position.set(0, -offset, -offset);
        lights[2].position.set(-7 * baseSize, 0, offset);
        lights[3].position.set(7 * baseSize, 0, offset);
    }

    function shootLaser()
    {
        var laser = new THREE.Object3D();
        var box = new THREE.BoxGeometry(0.9 * baseSize, 0.9 * baseSize, 3 * baseSize);
        var material = new THREE.MeshBasicMaterial({color:Globals.LaserColor});
        laser.add(new THREE.Mesh(box, material));

        for (var i = -0.5 * Globals.LaserIntensity; i < 0.5 * Globals.LaserIntensity; i++)
        {
            var light = new THREE.PointLight(Globals.LaserColor, 1, 15 * Math.sqrt(2) * baseSize);
            light.position.set(0, 15 * baseSize, 5 * baseSize * i / Globals.LaserIntensity);
            laser.add(light);
        }

        laser.position.set(figure.position.x, figure.position.y, figure.position.z - 3 * baseSize);

        Game.GetScene().add(laser);
        lasers.push(laser);

    }

    function removeLaser(index)
    {
        lasers.splice(index, 1);
    }

    function getLasers()
    {
        return lasers;
    }

    function takeHit()
    {
        Animations.CreateExplosion(figure);
        health--;
    }

    function enemyDestroyed()
    {
        score += 10;
    }

    function getHealth()
    {
        return health;
    }

    function getScore()
    {
        return score;
    }

    function getFigure()
    {
        return figure;
    }

    return {
        Init: init,
        EnemyDestroyed: enemyDestroyed,
        Figure: getFigure,
        GetHealth: getHealth,
        GetLasers: getLasers,
        GetScore: getScore,
        RemoveLaser: removeLaser,
        ShootLaser: shootLaser,
        TakeHit: takeHit
    };

})();
