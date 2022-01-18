// Boat
class Boat {
    constructor(x, y, heading, speed, moveAngle, sailAngle, rudderAngle) {
        this.x = x
        this.y = y
        this.heading = heading
        this.speed = speed
        this.moveAngle = moveAngle
        this.sailAngle = sailAngle
        this.rudderAngle = rudderAngle
    }

    sailPivot = -10 // -20px from center of boat
    sailLen = 30
    rudderPivot = 25
    rudderLen = 15
    hullSpeed = 0
    windNorm = 0

    update = () => {

        let prevSpeed = this.speed

        // wind speed normal to sail
        this.windNorm = windSpeed * Math.cos((-windHeading - this.sailAngle + 90) * d2r + this.heading)

        // hull speed from wind normal to sail
        this.hullSpeed = this.windNorm * Math.sin(this.sailAngle * d2r)

        // smooth motion by filtering over time and adding friction
        let friction = -0.01/dt
        this.speed = this.hullSpeed * dt + prevSpeed * 1-dt + friction

        // set min and max speeds
        if (this.speed < 0) {
            this.speed = 0
        } else if (this.speed > windSpeed) {
            this.speed = windSpeed
        }

        // update position and angle
        this.heading += (Math.sin(this.rudderAngle * d2r) * (this.speed / windSpeed)) * d2r * 5 
        this.x += this.speed * Math.sin(this.heading) * dt
        this.y -= this.speed * Math.cos(this.heading) * dt

        // rollover x position
        if (this.x <= -30) {
            this.x = canvas.width + 30
        } else if (this.x >= canvas.width + 30) {
            this.x = -30
        }

        // rollover y position
        if (this.y <= -30) {
            this.y = canvas.height + 30
        } else if (this.y >= canvas.height + 30) {
            this.y = -30
        }

        this.updateTelem()
    }

    updateTelem = () => {
        boatHeadingEl.setAttribute("style", `transform:rotate(${this.heading*180/Math.PI}deg)`)
        speedEl.innerHTML = (Number(this.speed)).toFixed(0)

        windHeadingEl.setAttribute("style", `transform:rotate(${windHeading}deg)`)
        windEl.innerHTML = windSpeed

        windAngleRange.value = windHeading
        windAngleVal.innerHTML = `wind heading: ${windAngleRange.value}&#176`

        windSpeedRange.value = windSpeed
        windSpeedVal.innerHTML = `wind speed: ${windSpeedRange.value}`
    }

    draw = () => {
        this.drawBoat()
        this.drawRudder()
        this.drawSail()
        this.drawMainSheet()

        if ( drawForces ) {
            this.drawSpeedVec()
            this.drawSailNormalForce()
        }
    }

    drawSailNormalForce = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.lineWidth = 3
        c.strokeStyle = 'rgb(1,255,1)'
        c.moveTo(0, this.sailPivot)
        c.lineTo(this.windNorm * 0.5 * Math.sin((this.sailAngle + 90) * Math.PI/180),
        this.windNorm * 0.5 * Math.cos((this.sailAngle + 90)* Math.PI/180) + this.sailPivot)
        c.stroke()
        c.restore()
    }

    drawSpeedVec = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.lineWidth = 3
        c.strokeStyle = 'rgb(255,1,1)'
        c.moveTo(0, this.sailPivot)
        c.lineTo(0, -this.hullSpeed * 0.5 + this.sailPivot)
        c.stroke()
        c.restore()
    }

    drawBoat = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.fillStyle = 'rgb(228, 216, 192)'
        c.fillRect(-15, -16, 30, 46)
        c.arc(0, -15, 15, 0, Math.PI, true)
        c.fill()
        c.restore()
    }

    drawSail = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.lineWidth = 3;
        c.moveTo(0, this.sailPivot)
        c.lineTo((this.sailLen * Math.sin(this.sailAngle * Math.PI/180)),
            (this.sailLen * Math.cos(this.sailAngle * Math.PI/180)) + this.sailPivot)
        c.stroke()
        c.restore()
    }

    drawMainSheet = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.lineWidth = 2;
        c.moveTo((this.sailLen/2 * Math.sin(this.sailAngle * Math.PI/180)),
            (this.sailLen/2 * Math.cos(this.sailAngle * Math.PI/180)) + this.sailPivot)
        c.lineTo(0, 10)
        c.stroke()
        c.restore()
    }

    drawRudder = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.lineWidth = 3;
        c.moveTo(0, this.rudderPivot)
        c.lineTo((this.rudderLen * Math.sin(this.rudderAngle * Math.PI/180)),
            (this.rudderLen * Math.cos(this.rudderAngle * Math.PI/180)) + this.rudderPivot)
        c.stroke()
        c.restore()
    }

    
}


