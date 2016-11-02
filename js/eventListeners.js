var Listeners = (function()
{
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
        switch(event.keyCode)
        {
            case 13: //Enter to start
                Game.StartGame();
                break;
            case 37: //Left
                MainSpaceShip.MoveLeft=true;
                MainSpaceShip.MoveRight=false;
                break;
            case 39: //Right
                MainSpaceShip.MoveRight=true;
                MainSpaceShip.MoveLeft=false;
                break;
            case 73: // I - toggle instructions
                UI.ToggleInstructions();
                break;
            case 80: // P - pause game
                UI.PauseGame();
                break;
        }
    }

    function keyIsReleased(event)
    {
        switch(event.keyCode){
            case 37: //Left
                moveLeft=false; moveRight=false; break;
            case 39: //Right
                moveRight=false; moveLeft=false; break;
        }
    }

    return {
        AddEventListeners: addEventListeners
    };
})();
