var listeners = (function() {
    function addEventListeners(){
        window.document.addEventListener("keydown", keyIsPressed);
        window.document.addEventListener("keyup", keyIsReleased);
        window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize(event){
        game.updateCanvas();
    }

    function keyIsPressed(event) {
        switch(event.keyCode){
            case 13: //Enter to start
                startGame(); break;
            case 37: //Left
                moveLeft=true; moveRight=false; break;
            case 39: //Right
                moveRight=true; moveLeft=false; break;
            case 73: // I - toggle instructions
                UI.toggleInstructions(); break;
            case 80: // P - pause game
                UI.pauseGame(); break;
        }
    }

    function keyIsReleased(event) {
        switch(event.keyCode){
            case 37: //Left
                moveLeft=false; moveRight=false; break;
            case 39: //Right
                moveRight=false; moveLeft=false; break;
        }
    }

    return {
        addEventListeners: addEventListeners
    };
})();
