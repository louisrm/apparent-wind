class Waves {
    constructor() {
        this.seed = Date.now();
        this.imageData = c.createImageData(canvas.width, canvas.height);
        this.openSimplex = openSimplexNoise(this.seed);
        this.zoom = 64;
        this.z = 0;
    }

    update = () => {
        let index = 0;
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                let value = this.openSimplex.noise3D(x / this.zoom, y / this.zoom, this.z/64);
                this.imageData.data[index++] = value > 0 ? 3 : 25;
                this.imageData.data[index++] = value > 0 ? 107 : 121;
                this.imageData.data[index++] = value > 0 ? 250 : 255;
                this.imageData.data[index++] = 255;
            }
          }
        c.putImageData(this.imageData, 0, 0)
        this.z++
    }
}