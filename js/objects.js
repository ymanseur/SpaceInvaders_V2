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
            var randY = 7 * baseSize * Math.random() - 3.5 * baseSize;
            var randZ = 7 * baseSize * Math.random() - 3.5 * baseSize;
            particle.position.set(randX, randY, randZ);
            explosion.add(particle);
        }

        explosion.position.set(x, 0, z);

        setTimeout( function () { Game.GetScene().add(explosion); }, 0);
        setTimeout( function () { Game.GetScene().remove(explosion); }, 125);
    }

    return {
        CreateExplosion: createExplosion
    };
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

        var shipMaterial = new THREE.MeshPhongMaterial({color:Globals.ShipColor});

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
        Game.GetScene().remove(lasers[index]);
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

var Enemies = (function ()
    {
        var parts; //array of boxes that make up an enemy spaceship
        var baseSize;
        var numEnemies;
        var enemies; // array of 3D objects of enemies
        var liveEnemies; // array of indices of alive enemies
        var enemySpeed;
        var frontRow; // 2D array of enemies where index [x][0] is in the front for column x
        var laser;

        function init()
        {
            initVariables();

            generateEnemies();

            positionEnemies();

            createLaser();

            resetLaser();
        }

        function initVariables()
        {
            parts = [];
            baseSize = Globals.BaseSize;
            numEnemies = 55;
            enemies = [];
            liveEnemies = [];
            enemySpeed = Globals.EnemySpeed;
            laser = new THREE.Object3D();

            frontRow = new Array(11);
            for (var i = 0; i < frontRow.length; i++)
                frontRow[i] = new Array(5);
        }

        function generateEnemies()
        {
            for (var i = 0; i < numEnemies; i++)
            {
                var enemy = new THREE.Object3D();
                parts = [];
                createParts();
                positionParts();
                for (var j = 0; j < parts.length; j++)
                {
                    enemy.add(parts[j]);
                }
                enemies.push(enemy);
                liveEnemies.push(i);
            }
        }

        function positionEnemies()
        {
            var i = 0, row, col, x = 0, y = 0;
            // x and y are used for initializing 2D array for choosing which enemy shoots
            for (row = 2; row >= -2; row--)
            {
                for (col = -5; col <= 5; col++)
                {
                    enemies[i].position.set(18 * baseSize * col, 0, 15 * baseSize * row - 60 * baseSize);
                    frontRow[x][y] = i;
                    i++;
                    x++
                }
                x = 0;
                y++;
            }
        }

        function createParts()
        {
            var boxGeometry = [
                new THREE.BoxGeometry(baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(6 * baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(2 * baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(2 * baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(2 * baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(10 * baseSize, baseSize, 2 * baseSize),
                new THREE.BoxGeometry(baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(2 * baseSize, baseSize, baseSize),
                new THREE.BoxGeometry(2 * baseSize, baseSize, baseSize)
            ];
            var shipMaterial = new THREE.MeshPhongMaterial({color:Globals.ShipColor});

            for (var i = 0; i < boxGeometry.length; i++)
            {
                var boxMesh = new THREE.Mesh(boxGeometry[i], shipMaterial);
                parts.push(boxMesh);
            }
        }

        function positionParts()
        {
            parts[0].position.set(-1.5 * baseSize, 0, -3.5 * baseSize);
            parts[1].position.set(1.5*baseSize,0,-3.5*baseSize);
            parts[2].position.set(0,0,-2.5*baseSize);
            parts[3].position.set(-3*baseSize,0,-1.5*baseSize);
            parts[4].position.set(0,0,1.5*-baseSize);
            parts[5].position.set(3*baseSize,0,1.5*-baseSize);
            parts[6].position.set(0,0,0);
            parts[7].position.set(-4.5*baseSize,0,1.5*baseSize);
            parts[8].position.set(-2.5*baseSize,0,1.5*baseSize);
            parts[9].position.set(2.5*baseSize,0,1.5*baseSize);
            parts[10].position.set(4.5*baseSize,0,1.5*baseSize);
            parts[11].position.set(-2*baseSize,0,2.5*baseSize);
            parts[12].position.set(2*baseSize,0,2.5*baseSize);
        }

        function createLaser()
        {
            var box = new THREE.BoxGeometry(0.9 * baseSize, 0.9 * baseSize, 3 * baseSize);
            var material = new THREE.MeshBasicMaterial({color:Globals.LaserColor});
            laser.add(new THREE.Mesh(box, material));

            for (var i = -0.5 * Globals.LaserIntensity; i < 0.5 * Globals.LaserIntensity; i++)
            {
                var light = new THREE.PointLight(Globals.LaserColor, 1, 15 * Math.sqrt(2) * baseSize);
                light.position.set(0, 15 * baseSize, 5 * baseSize * i / Globals.LaserIntensity);
                laser.add(light);
            }
            Game.GetScene().add(laser);
        }

        function moveLeft()
        {
            for(var j = 0; j < liveEnemies.length; j++)
            {
                var i = liveEnemies[j]; //actual index of enemy
                enemies[i].translateX(-enemySpeed);
            }
        }

        function moveRight()
        {
            for(var j = 0; j < liveEnemies.length; j++)
            {
                var i = liveEnemies[j]; //actual index of enemy
                enemies[i].translateX(enemySpeed);
            }
        }

        function moveForward()
        {
            for(var j = 0; j < liveEnemies.length; j++)
            {
                var i = liveEnemies[j]; //actual index of enemy
                enemies[i].translateZ(enemySpeed/3);
            }
        }

        function moveBack()
        {
            for(var j = 0; j < liveEnemies.length; j++)
            {
                var i = liveEnemies[j]; //actual index of enemy
                enemies[i].translateZ(-enemySpeed/3);
            }
        }

        function mobilize(level, enemyCounter)
        {
            var enemyCycleLength = Globals.EnemyCycleLength;
            switch (level)
            {
                case Difficulty.Easy:
                    if(enemyCounter < enemyCycleLength / 4)
                        moveLeft();
                    else if (enemyCounter < enemyCycleLength * 3 / 4)
                        moveRight();
                    else
                        moveLeft();
                    break;
                case Difficulty.Medium:
                    if(enemyCounter < enemyCycleLength / 5)
                        moveLeft();
                    else if (enemyCounter < enemyCycleLength * 3 / 10)
                        moveForward();
                    else if (enemyCounter < enemyCycleLength * 7 / 10)
                        moveRight();
                    else if (enemyCounter < enemyCycleLength * 4 / 5)
                        moveBack();
                    else
                        moveLeft();
                    break;
                default: // if not medium or easy, make it hard
                    if(enemyCounter < enemyCycleLength / 5)
                        moveLeft();
                    else if (enemyCounter < enemyCycleLength * 3 / 10)
                        moveForward();
                    else if (enemyCounter < enemyCycleLength * 7 / 10)
                        moveRight();
                    else if (enemyCounter < enemyCycleLength * 4 / 5)
                        moveForward();
                    else
                        moveLeft();
                    break;
            }
        }

        function destroyEnemy(index)
        {
            Game.GetScene().remove(enemies[index]);
            Animations.CreateExplosion(enemies[index]);
            liveEnemies.splice(liveEnemies.indexOf(index), 1);
            // remove enemy from frontRow array
            var x = index;
            var i = 1;
            while (x > 10){
                x = index - i * 11;
                i++;
            }
            frontRow[x].splice(frontRow[x].indexOf(index), 1);
        }

        function resetLaser()
        {
            var shooter = enemies[chooseShootingEnemy()];
            laser.position.set(shooter.position.x, shooter.position.y, shooter.position.z + 3 * baseSize);
        }

        function chooseShootingEnemy()
        {
            var randColumn = getRandomIntInclusive(0,10);
            while (frontRow[randColumn].length == 0)
            {
                randColumn = getRandomIntInclusive(0,10);
            }
            return frontRow[randColumn][0];
        }

        function getEnemies()
        {
            return enemies;
        }

        function getLaser()
        {
            return laser;
        }

        return {
            DestroyEnemy: destroyEnemy,
            GetEnemies: getEnemies,
            GetLaser: getLaser,
            Mobilize: mobilize,
            Init: init,
            ResetLaser: resetLaser
        }
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

