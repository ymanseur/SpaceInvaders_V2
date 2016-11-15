var Listeners = (function()
{
    var isShooting = false;
    var moveLeft = false;
    var moveRight = false;

    function addEventListeners()
    {
        window.document.addEventListener("keydown", keyIsPressed);
        window.document.addEventListener("keyup", keyIsReleased);
        window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize(event)
    {
        Game.UpdateCanvas();
    }

    function keyIsPressed(event)
    {
        var inSession = Game.GetInSession();
        switch(event.keyCode)
        {
            case 13: //Enter to start
                if(!inSession)
                    Game.StartGame();
                break;
            case 32: //Space
                isShooting = true;
                break;
            case 37: //Left
                if(inSession)
                {
                    moveRight = false;
                    moveLeft = true;
                }
                break;
            case 39: //Right
                if(inSession)
                {
                    moveLeft = false;
                    moveRight = true;
                }
                break;
            case 73: // I - toggle instructions
                UI.ToggleInstructions();
                break;
            case 80: // P - pause game
                if(inSession)
                    UI.PauseGame();
                break;
            case 82: // R - restart game
                if(inSession)
                    UI.RestartGame();
                break;
        }
    }

    function keyIsReleased(event)
    {
        switch(event.keyCode){
            case 32: //Space
                isShooting = false;
                break;
            case 37: //Left
                moveLeft = false;
                break;
            case 39: //Right
                moveRight = false;
                break;
        }
    }

    function getIsShooting()
    {
        return isShooting;
    }

    function getMoveLeft()
    {
        return moveLeft;
    }

    function getMoveRight()
    {
        return moveRight;
    }

    return {
        AddEventListeners: addEventListeners,
        GetIsShooting: getIsShooting,
        GetMoveLeft: getMoveLeft,
        GetMoveRight: getMoveRight
    };
})();
