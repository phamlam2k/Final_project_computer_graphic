const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.castShadow = true
scene.add(directionalLight)
directionalLight.position.set(0, 1, 1)

camera.position.z = 5
renderer.setClearColor(0xB7C3F3, 1)

const loader = new THREE.GLTFLoader()
let doll

const end_position = -start_position

const text = document.querySelector('.text')

// Create the doll.
loader.load('./model/scene.gltf', function (gltf) {
    scene.add(gltf.scene)
    doll = gltf.scene
    gltf.scene.position.set(.2, -1, .2)
    gltf.scene.scale.set(0.4, 0.4, 0.4)
    startBtn.innerText = "start"
})

function lookBackward() {
    gsap.to(doll.rotation, {
        duration: .45,
        y: -3.15
    })
    setTimeout(() => dallFacingBack = true, 150)
}

function lookForward() {
    gsap.to(doll.rotation, {
        duration: .45,
        y: 0
    })
    setTimeout(() => dallFacingBack = false, 450)
}

// Create the road.
createCube({
    w: start_position * 2 + .21,
    h: 1.5,
    d: 1
}, 0, 0, 0xe5a716).position.z = -1
createCube({
    w: .2,
    h: 1.5,
    d: 1
}, start_position, -.4)
createCube({
    w: .2,
    h: 1.5,
    d: 1
}, end_position, .4)



// Create the player.
const player1 = new Player("Player 1", .25, .3, 0xD1FFC6)
const player2 = new Player("Player 2", .25, -.3, 0xFFCFD2)

const players = [{
        player: player1,
        key: "ArrowUp",
        name: "Player 1"
    },
    {
        player: player2,
        key: "w",
        name: "Player 2"
    }
]

// Function to sovle asynchronous.
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//Get the musics.
bgMusic.loop = true
async function init() {
    for(var i = 4; i > 1; i--){
        await delay(500)
        text.innerText = `Starting in ${i}`
    }
    text.innerText = "Gooo!!!"
    bgMusic.play()
    start()
}

function start() {
    gameStat = "started"
    const progressBar = createCube({
        w: 8,
        h: .1,
        d: 1
    }, 0, 0, 0xebaa12)
    progressBar.position.y = 3.35
    gsap.to(progressBar.scale, {
        duration: TIME_LIMIT,
        x: 0,
        ease: "none"
    })
    setTimeout(() => {
        if (gameStat != "ended") {
            text.innerText = "Time Out!!!"
            loseMusic.play()
            gameStat = "ended"
        }
    }, TIME_LIMIT * 1000)
    startDall()
}

async function startDall() {
    lookBackward()
    await delay((Math.random() * 1500) + 1500)
    lookForward()
    await delay((Math.random() * 750) + 750)
    startDall()
}

function animate() {
    renderer.render(scene, camera)
    players.map(player => player.player.update())
    if (gameStat == "ended") return
    requestAnimationFrame(animate)
}
animate()
