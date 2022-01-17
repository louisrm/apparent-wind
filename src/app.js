// Apparent Wind
// GitHub: @louisrm

// Canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
var rect = canvas.parentNode.getBoundingClientRect()
canvas.width = rect.width > 800 ? 800 : rect.width - 50
canvas.height = 500;

const x = canvas.width / 2
const y = canvas.height * 3/4
const d2r = Math.PI / 180

// collect elements
const speedEl = document.querySelector('#speedEl')
const boatHeadingEl = document.getElementById('boatHeadingEl')
const windHeadingEl = document.getElementById('windHeadingEl')
const windEl = document.querySelector('#windEl')
const fpsEl = document.querySelector('#fpsEl')

// const rudderRange = document.getElementById('rudderRange')
// const rudderVal = document.getElementById('rudderVal')
// const sailRange = document.getElementById('sailRange')  
// const sailVal = document.getElementById('sailVal')  

const windAngleRange = document.getElementById('windAngleRange')
const windAngleVal = document.getElementById('windAngleVal')
const windSpeedRange = document.getElementById('windSpeedRange')  
const windSpeedVal = document.getElementById('windSpeedVal')  

const showWaves = document.getElementById('showWaves')
const showForces = document.getElementById('showForces')

// init
let keys = []
let boat = new Boat( x, y, 0, 0, 0, 0, 0)
let windHeading = 0
let windSpeed = 100
let waves = new Waves
let drawWaves = true
let drawForces = false

// animate
let animationId
let t0 = 0
let dt = 0
let fpsArr = []
let t2 = 0

animate = (t1) => {
    // render page
    c.clearRect(0, 0, canvas.width, canvas.height)
    animationId = requestAnimationFrame(animate)

    // calculate fps
    dt = (t1 - t0) / 1000;
    if (t2 > 1/10) {
        const avgFps = fpsArr.reduce((a, b) => a + b) / fpsArr.length
        fpsEl.innerHTML = (1/avgFps).toFixed(0)
        t2 = 0
        fpsArr = []
    } else {
        t2 += dt
        fpsArr.push(dt)
    }

    // update canvas
    waves.update(drawWaves)
    boat.update()
    boat.draw()

    // steering
    if (keys && keys[37]) {
        if (boat.rudderAngle > -45) {
            boat.rudderAngle -= 50 * dt
        }
    }
    if (keys && keys[39]) {
        if (boat.rudderAngle < 45) {
            boat.rudderAngle += 50 * dt
        }
    }
    if (keys && keys[65]) {
        if (boat.sailAngle > -80) {
            boat.sailAngle -= 50 * dt
        }
    }
    if (keys && keys[68]) {
        if (boat.sailAngle < 80) {
            boat.sailAngle += 50 * dt
        }
    }

    // update previous time step
    t0 = t1;
}

// steering
addEventListener('keydown', (e) => {
    e.preventDefault();
    keys = (keys || []);
    keys[e.keyCode] = (e.type == "keydown")
})

addEventListener('keyup', (e) => {
    keys[e.keyCode] = (e.type == "keydown")
})

showWaves.addEventListener('change', () => {
    drawWaves = showWaves.checked;
})

showForces.addEventListener('change', () => {
    drawForces = showForces.checked;
})

// rudderRange.oninput = function() {
//     boat.rudderAngle = this.value
// }

// sailRange.oninput = function() {
//     boat.sailAngle = this.value
// }

windAngleRange.oninput = function() {
    windHeading = this.value
}

windSpeedRange.oninput = function() {
    windSpeed = this.value
}

// start
requestAnimationFrame(animate)
