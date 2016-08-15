var backDrop = (function() {
    function loadBackdrop() {
        var imageNames = ["assets/backDrop_Right.bmp",
            "assets/backDrop_Left.bmp",
            "assets/backDrop_Top.bmp",
            "assets/backDrop_Bottom.bmp",
            "assets/backDrop_Front.bmp",
            "assets/backDrop_Back.bmp"];

<<<<<<< 83e2ce87a795595e6731a39fb11b88b82fcb4154
        var textureLoader = new THREE.TextureLoader();
        var textureSides = [textureLoader.load(imageNames[0]),
            textureLoader.load(imageNames[1]),
            textureLoader.load(imageNames[2]),
            textureLoader.load(imageNames[3]),
            textureLoader.load(imageNames[4]),
            textureLoader.load(imageNames[5])];
        var skyGeometry = new THREE.BoxGeometry(500, 500, 500);
=======
        var skyGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
>>>>>>> initial commit
        var materialArray = [];

        for (var i = 0; i < 6; i++)
            materialArray.push(new THREE.MeshBasicMaterial({
<<<<<<< 83e2ce87a795595e6731a39fb11b88b82fcb4154
                map: textureSides[i],
=======
                map: THREE.ImageUtils.loadTexture(imageNames[i]),
>>>>>>> initial commit
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