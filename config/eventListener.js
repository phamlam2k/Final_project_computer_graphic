window.addEventListener("keydown", function (e) {
  if (gameStat != "started") return;
  let p = players.find((player) => player.key == e.key);
  if (p) {
    p.player.run();
  }
});

window.addEventListener("keyup", function (e) {
  let p = players.find((player) => player.key == e.key);
  if (p) {
    p.player.stop();
  }
});

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const startBtn = document.querySelector('.start-btn')
startBtn.addEventListener('click', () => {
  if (startBtn.innerText == "START") {
      init()
      document.querySelector('.modal').style.display = "none"
  }
})
