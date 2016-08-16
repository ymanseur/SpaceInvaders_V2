var UI = (function () {
    function toggleInstructions(){
        if(showInstruct)
            minimizeInstructions();
        else
            maximizeInstructions();
    }

    function minimizeInstructions(){
        document.getElementById("instructions").style.visibility = "hidden";
        document.getElementById("help").style.visibility = "visible";
        game.showInstruct = false;
    }

    function maximizeInstructions(){
        document.getElementById("instructions").style.visibility = "visible";
        document.getElementById("help").style.visibility = "hidden";
        game.showInstruct = true;
    }

    function pauseGame() {
        if(game.startRendering)
            game.startRendering = false;
        else
            game.startRendering = true;
    }

    return {
        toggleInstructions: toggleInstructions,
        pauseGame: pauseGame,
        minimizeInstructions: minimizeInstructions
    };
})();
