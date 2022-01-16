// Apparent Wind
// louisrm

// Canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
var rect = canvas.parentNode.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

const x = canvas.width / 2
const y = canvas.height * 3/4
const d2r = Math.PI / 180

// collect elements
const speedEl = document.querySelector('#speedEl')
const boatHeadingEl = document.getElementById('boatHeadingEl')
const windHeadingEl = document.getElementById('windHeadingEl')
const windEl = document.querySelector('#windEl')
const fpsEl = document.querySelector('#fpsEl')

let keys = []
let boat = new Boat( x, y, 0, 0, 0, 0, 0)
let windHeading = 0
let windSpeed = 10
let waves = new Waves;

// init
init = () => {
    boat = new Boat( x, y, 0, 0, 0, 0, 0)
    windHeading = 0
    windSpeed = 100
}

// animate
let animationId
let t0 = 0
let fpsLimit = 120
let dt = 0

animate = (t1) => {
    // render page
    c.clearRect(0, 0, canvas.width, canvas.height);
    animationId = requestAnimationFrame(animate)

    dt = (t1 - t0) / 1000;
    fpsEl.innerHTML = (1/dt).toFixed(0)

    // waves.update()
    boat.update()
    boat.draw()

    // steering
    if (keys && keys[37]) {
        if (boat.rudderAngle > -45) {
            boat.rudderAngle -= 50 * dt;
        }
    }
    if (keys && keys[39]) {
        if (boat.rudderAngle < 45) {
            boat.rudderAngle += 50 * dt;
        }
    }
    if (keys && keys[65]) {
        if (boat.sailAngle > -80) {
            boat.sailAngle -= 50 * dt;
        }
    }
    if (keys && keys[68]) {
        if (boat.sailAngle < 80) {
            boat.sailAngle += 50 * dt;
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
