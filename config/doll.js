const loader = new THREE.GLTFLoader();
let doll;

loader.load("./model/scene.gltf", function (gltf) {
  scene.add(gltf.scene);
  doll = gltf.scene;
  gltf.scene.position.set(0.2, -1, 0.2);
  gltf.scene.scale.set(0.4, 0.4, 0.4);
  startBtn.innerText = "start";
});

function lookBackward() {
  gsap.to(doll.rotation, { duration: 0.45, y: -3.15 });
  setTimeout(() => (dallFacingBack = true), 150);
}
function lookForward() {
  gsap.to(doll.rotation, { duration: 0.45, y: 0 });
  setTimeout(() => (dallFacingBack = false), 450);
}
