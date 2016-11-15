var UI = (function ()
{
    function toggleInstructions()
    {
        if(Game.GetShowInstruct())
            minimizeInstructions();
        else
            maximizeInstructions();
    }

    function minimizeInstructions()
    {
        document.getElementById("instructions").style.visibility = "hidden";
        document.getElementById("help").style.visibility = "visible";
        Game.SetShowInstruct(false);
    }

    function maximizeInstructions()
    {
        document.getElementById("instructions").style.visibility = "visible";
        document.getElementById("help").style.visibility = "hidden";
        Game.SetShowInstruct(true);
    }

    function pauseGame() {
        if(Game.GetStartRendering())
            Game.SetStartRendering(false);
        else
            Game.SetStartRendering(true);
    }

    function hideStartText() {
        document.getElementById("startGame").style.visibility = "hidden";
    }

    return {
        ToggleInstructions: toggleInstructions,
        PauseGame: pauseGame,
        MinimizeInstructions: minimizeInstructions,
        HideStartText: hideStartText
    };
})();
