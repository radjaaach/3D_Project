window.onload = function() {
    // Get the canvas element
    var canvas = document.getElementById("renderCanvas");       
    // Create the engine
    var engine = new BABYLON.Engine(canvas, true);
    // Create scene
    var scene = new BABYLON.Scene(engine);
    // Create camera in the middle of the room
    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 5, new BABYLON.Vector3(0, 1.5, 0), scene);
    camera.attachControl(canvas, true);
    // Create light
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    // Create materials
    var wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
    wallMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(1,1,1);
    // Create walls
    var wall1 = BABYLON.MeshBuilder.CreateBox("wall1", { width: 10, height: 8, depth: 0.1 }, scene);
    wall1.material = wallMaterial;
    wall1.position = new BABYLON.Vector3(0, 4, -5); // Back wall
    var wall2 = BABYLON.MeshBuilder.CreateBox("wall2", { width: 10, height: 8, depth: 0.1 }, scene);
    wall2.material = wallMaterial;
    wall2.rotation.y = Math.PI / 2;
    wall2.position = new BABYLON.Vector3(-5, 4, 0); // Left wall
    var wall3 = BABYLON.MeshBuilder.CreateBox("wall3", { width: 10, height: 8, depth: 0.1 }, scene);
    wall3.material = wallMaterial;
    wall3.rotation.y = -Math.PI / 2;
    wall3.position = new BABYLON.Vector3(5, 4, 0); // Right wall
    // Create ground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    ground.material = groundMaterial;
    // Create roof
    var roof = BABYLON.MeshBuilder.CreateBox("roof", { width: 10, height: 0.1, depth: 10 }, scene);
    roof.material = wallMaterial;
    roof.position = new BABYLON.Vector3(0, 8, 0); // Roof

    // Function to load and add furniture models
    function loadFurnitureModel(modelPath, position) {
        BABYLON.SceneLoader.ImportMesh("", modelPath, "", scene, function (meshes) {
            meshes.forEach(function(mesh) {
                mesh.position = position;
            });
        });
    }

    // Function to place furniture when clicked on sidebar image
    function placeFurniture(modelPath) {
        canvas.addEventListener('click', function(event) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if (pickResult.hit) {
                loadFurnitureModel(modelPath, pickResult.pickedPoint);
            }
        });
    }

    // Example furniture placement
    placeFurniture("furniture_models/bed.glb");

    // Render loop
    engine.runRenderLoop(function() {
        scene.render();
    });
    // Resize
    window.addEventListener("resize", function() {
        engine.resize();
    });
};
