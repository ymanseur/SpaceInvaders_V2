var Main = (function ()
{
    function init() {
        Game.SetScene();
        //backDrop.loadBackdrop();
        Listeners.AddEventListeners();
        Game.AnimateScene();
    }

    return{
        Init: init
    };
}) ();

window.onload = Main.Init();