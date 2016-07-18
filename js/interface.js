function toggleInstructions(){
    if(showInstruct)
        minimizeInstructions();
    else
        maximizeInstructions();
}

function minimizeInstructions(){
    document.getElementById("instructions").style.visibility = "hidden";
    document.getElementById("help").style.visibility = "visible";
    showInstruct = false;
}

function maximizeInstructions(){
    document.getElementById("instructions").style.visibility = "visible";
    document.getElementById("help").style.visibility = "hidden";
    showInstruct = true;
}

function pauseGame() {
    if(startRendering)
        startRendering = false;
    else
        startRendering = true;
}