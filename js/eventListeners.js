function addEventListeners(){
    window.document.addEventListener("keydown", keyIsPressed);
    window.document.addEventListener("keyup", keyIsReleased);
    window.addEventListener("resize", onWindowResize);
}

function onWindowResize(event){
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var aspectRatio = canvasWidth/canvasHeight;
    renderer.setSize(canvasWidth,canvasHeight);
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
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
            toggleInstructions(); break;
        case 80: // P - pause game
            pauseGame(); break;
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