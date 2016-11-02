var UI = (function ()
{
    function toggleInstructions()
    {
        if(Game.ShowInstruct)
            minimizeInstructions();
        else
            maximizeInstructions();
    }

    function minimizeInstructions()
    {
        document.getElementById("instructions").style.visibility = "hidden";
        document.getElementById("help").style.visibility = "visible";
        Game.ShowInstruct = false;
    }

    function maximizeInstructions()
    {
        document.getElementById("instructions").style.visibility = "visible";
        document.getElementById("help").style.visibility = "hidden";
        Game.ShowInstruct = true;
    }

    function pauseGame() {
        if(Game.StartRendering)
            Game.StartRendering = false;
        else
            Game.StartRendering = true;
    }

    return {
        ToggleInstructions: toggleInstructions,
        PauseGame: pauseGame,
        MinimizeInstructions: minimizeInstructions
    };
})();
