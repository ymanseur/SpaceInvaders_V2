var backDrop = (function() {
    function loadBackdrop() {
        var imageNames = ["assets/backDrop_Right.bmp",
            "assets/backDrop_Left.bmp",
            "assets/backDrop_Top.bmp",
            "assets/backDrop_Bottom.bmp",
            "assets/backDrop_Front.bmp",
            "assets/backDrop_Back.bmp"];

        var skyGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
        var materialArray = [];

        for (var i = 0; i < 6; i++)
            materialArray.push(new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(imageNames[i]),
                side: THREE.BackSide
            }));
        var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
        var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
        skyBox.rotation.x = -Math.PI / 5;
        game.scene.add(skyBox);
    }
    return{
        loadBackdrop: loadBackdrop
    };
})();