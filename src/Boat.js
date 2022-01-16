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

    sailPivot = -20 // -20px from center of boat
    sailLen = 50
    rudderPivot = 45
    rudderLen = 25

    update = () => {

        let prevSpeed = this.speed

        // calculate speed
        let sailNormalSpeed = windSpeed * Math.sin(this.heading - windHeading * d2r + this.sailAngle * d2r)
        this.speed = Math.abs(sailNormalSpeed * Math.cos((90-this.sailAngle) * d2r))*dt - 20*dt + prevSpeed
        if (this.speed < 0) {
            this.speed = 0
        } else if (this.speed > windSpeed) {
            this.speed = windSpeed
        }
        
        console.log(`speed: ${this.speed} \nnormal: ${sailNormalSpeed} \nmult: ${Math.cos((90-this.sailAngle) * d2r)}
        \nheading: ${this.heading}` )


        // update position and angle
        this.heading += (Math.sin(this.rudderAngle * d2r) * (this.speed / windSpeed)) * d2r * 1.5 ;
        // console.log(this.heading)
        this.x += this.speed * Math.sin(this.heading) * dt;
        this.y -= this.speed * Math.cos(this.heading) * dt;

        windEl.innerHTML = (windSpeed).toFixed(1)
        // headingEl.innerHTML = (this.heading).toFixed(1)
        speedEl.innerHTML = (this.speed).toFixed(1)
    }

    draw = () => {
        this.drawBoat()
        this.drawRudder()
        this.drawSail()
        this.drawFlag()
    }

    drawFlag = () => {
        
    }

    drawBoat = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.fillStyle = 'rgb(228, 216, 192)'
        c.fillRect(-25, -26, 50, 76)
        c.arc(0, -25, 25, 0, Math.PI, true)
        c.fill()
        c.restore()
    }

    drawSail = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.lineWidth = 7;
        c.moveTo(0, this.sailPivot)
        c.lineTo((this.sailLen * Math.sin(this.sailAngle * Math.PI/180)),
            (this.sailLen * Math.cos(this.sailAngle * Math.PI/180)) + this.sailPivot)
        c.stroke()
        c.restore()
    }

    drawRudder = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.lineWidth = 7;
        c.moveTo(0, this.rudderPivot)
        c.lineTo((this.rudderLen * Math.sin(this.rudderAngle * Math.PI/180)),
            (this.rudderLen * Math.cos(this.rudderAngle * Math.PI/180)) + this.rudderPivot)
        c.stroke()
        c.restore()
    }

    
}


