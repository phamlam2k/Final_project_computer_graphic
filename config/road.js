function createCube(size, posX, rotY = 0, color = 0xfbc851){
    const geometry = new THREE.BoxGeometry( size.w, size.h, size.d )
    const material = new THREE.MeshBasicMaterial( { color } )
    const cube = new THREE.Mesh( geometry, material )
    cube.position.set(posX, 0, 0)
    cube.rotation.y = rotY
    scene.add( cube )
    return cube
}