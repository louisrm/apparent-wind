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
let t0 = 0
let fpsLimit = 60

animate = (t1) => {
    // render page
    c.clearRect(0, 0, canvas.width, canvas.height);
    animationId = requestAnimationFrame(animate)

    // if dt faster than 1/60s just draw
    let dt = t1 - t0;
    if (fpsLimit && dt < 1000 / fpsLimit) {
        boat.draw()
        return;
    }

    boat.update()
    boat.draw()

    // steering
    if (keys && keys[37]) {
        if (boat.rudderAngle > -45) {
            boat.rudderAngle -= 2;
        }
    }
    if (keys && keys[39]) {
        if (boat.rudderAngle < 45) {
            boat.rudderAngle += 2;
        }
    }
    if (keys && keys[65]) {
        if (boat.sailAngle > -80) {
            boat.sailAngle -= 2;
        }
    }
    if (keys && keys[68]) {
        if (boat.sailAngle < 80) {
            boat.sailAngle += 2;
        }
    }

    // update previous time step
    t0 = t1;
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
requestAnimationFrame(animate)
// setInterval(() => {

    

//     // animate
//     animate()
// }, 20)
