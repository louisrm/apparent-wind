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
        this.heading += (Math.sin(this.rudderAngle * d2r) * (this.speed / windSpeed)) * d2r * 5 ;
        // console.log(this.heading)
        this.x += this.speed * Math.sin(this.heading) * dt;
        this.y -= this.speed * Math.cos(this.heading) * dt;

        this.updateTelem()

        
    }

    updateTelem = () => {
        boatHeadingEl.setAttribute("style", `transform:rotate(${this.heading*180/Math.PI}deg)`)
        speedEl.innerHTML = (Number(this.speed)).toFixed(0)

        windHeadingEl.setAttribute("style", `transform:rotate(${windHeading*180/Math.PI}deg)`)
        windEl.innerHTML = windSpeed

        windAngleRange.value = windHeading*180/Math.PI
        windAngleVal.innerHTML = `wind heading: ${windAngleRange.value}&#176`

        windSpeedRange.value = windSpeed
        windSpeedVal.innerHTML = `wind speed: ${windSpeedRange.value}`

        rudderRange.value = this.rudderAngle;
        rudderVal.innerHTML = `rudder: ${(rudderRange.value)}&#176`;

        sailRange.value = this.sailAngle;
        sailVal.innerHTML = `sail: ${(sailRange.value)}&#176`;
    }

    draw = () => {
        this.drawBoat()
        // this.drawWake()
        this.drawRudder()
        this.drawSail()
    }

    drawWake = () => {
        c.save()
        c.beginPath()
        c.translate(this.x, this.y)
        c.rotate(this.heading)
        c.moveTo(-15, 30)
        c.fillStyle = 'rgba(82, 154, 255, 0.5)'
        c.arc()
        c.fill()
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


