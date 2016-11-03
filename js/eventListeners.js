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
                if(!Game.GetInSession())
                    Game.StartGame();
                break;
            case 37: //Left
                MainSpaceShip.SetMoveLeft(true);
                MainSpaceShip.SetMoveRight(false);
                break;
            case 39: //Right
                MainSpaceShip.SetMoveRight(true);
                MainSpaceShip.SetMoveLeft(false);
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
                MainSpaceShip.SetMoveLeft(false);
                MainSpaceShip.SetMoveRight(false);
                break;
            case 39: //Right
                MainSpaceShip.SetMoveLeft(false);
                MainSpaceShip.SetMoveRight(false);
                break;
        }
    }

    return {
        AddEventListeners: addEventListeners
    };
})();
