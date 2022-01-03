// Apparent Wind
// louisrm

// Canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const x = canvas.width / 2
const y = canvas.height * 3/4
const d2r = Math.PI / 180

let keys = []
let boat = new Boat( x, y, 0, 0, 0, 0, 0)
let windHeading = 0
let windSpeed = 1

// init
init = () => {
    boat = new Boat( x, y, 0, 0, 0, 0, 0)
    windHeading = 0
    windSpeed = 1
}

// animate
let animationId
animate = () => {

    // render page
    // c.beginPath()
    c.clearRect(0, 0, canvas.width, canvas.height);
    animationId = requestAnimationFrame(animate)
    // c.fillStyle = 'rgb(0, 61, 102)'
    // c.fillRect(0, 0, canvas.width, canvas.height)

    boat.update()
    boat.draw()

    // steering
    if (keys && keys[37]) {
        if (boat.rudderAngle > -45) {
            boat.rudderAngle -= 1 ;
        }
    }
    if (keys && keys[39]) {
        if (boat.rudderAngle < 45) {
            boat.rudderAngle += 1;
        }
    }
    if (keys && keys[65]) {
        if (boat.sailAngle > -80) {
            boat.sailAngle -= 1 ;
        }
    }
    if (keys && keys[68]) {
        if (boat.sailAngle < 80) {
            boat.sailAngle += 1;
        }
    }
}

// steering
addEventListener('keydown', (e) => {
    e.preventDefault();
    keys = (keys || []);
    keys[e.keyCode] = (e.type == "keydown");
})

addEventListener('keyup', (e) => {
    keys[e.keyCode] = (e.type == "keydown");
})



// start
init()
animate()
// setInterval(() => {

    

//     // animate
//     animate()
// }, 20)
