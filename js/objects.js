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

var MainSpaceShip = (function ()
{
    var parts = []; //array of boxes that make up the player's spaceship
    var lights = []; //array of point lights surrounding the player's spaceship
    var moveLeft = false;
    var moveRight = false;
    var figure = new THREE.Object3D();
    var baseSize = Globals.BaseSize;
    var laserColor = Globals.LaserColor;
    var health = 10;

    function init ()
    {
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

    }

    function createParts ()
    {
        var boxGeometry = [
            new THREE.BoxGeometry(13 * baseSize, 1 * baseSize, 4 * baseSize),
            new THREE.BoxGeometry(11 * baseSize, 1 * baseSize, 1 * baseSize),
            new THREE.BoxGeometry( 3 * baseSize, 1 * baseSize, 2 * baseSize),
            new THREE.BoxGeometry( 1 * baseSize, 1 * baseSize, 1 * baseSize)
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

    function takeHit ()
    {
        Animations.CreateExplosion(figure);

    }

    function getHealth()
    {
        return health;
    }

    function getFigure()
    {
        return figure;
    }

    function setMoveLeft(_value)
    {
        moveLeft = _value;
    }

    function setMoveRight(_value)
    {
        moveRight = _value;
    }

    return {
        Init: init,
        GetHealth: getHealth,
        TakeHit: takeHit,
        Figure: getFigure,
        SetMoveLeft: setMoveLeft,
        SetMoveRight: setMoveRight
    };

})();
