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
        var inSession = Game.GetInSession();
        switch(event.keyCode)
        {
            case 13: //Enter to start
                if(!inSession)
                    Game.StartGame();
                break;
            case 32: //Space
                if(inSession && Game.GetFramesPassed() > Globals.LaserDelay)
                {
                    Game.ResetFramesPassed();
                    MainSpaceShip.ShootLaser();
                }
                break;
            case 37: //Left
                if(inSession){
                    MainSpaceShip.SetMoveLeft(true);
                    MainSpaceShip.SetMoveRight(false);
                }
                break;
            case 39: //Right
                if(inSession)
                {
                    MainSpaceShip.SetMoveRight(true);
                    MainSpaceShip.SetMoveLeft(false);
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
            case 37: //Left
                MainSpaceShip.SetMoveLeft(false);
                break;
            case 39: //Right
                MainSpaceShip.SetMoveRight(false);
                break;
        }
    }

    return {
        AddEventListeners: addEventListeners
    };
})();
