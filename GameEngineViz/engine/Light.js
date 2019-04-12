class Light{
	constructor(id, position, radius) {
				this.id = id;
                this.position = position;
		        this.radius = radius;
	}
}


class LightSystem{
	constructor(canvas, width, height) {
                this.drawingCanvas = canvas;
		        this.ctx = drawingCanvas.getContext("2d");
                this.width = width;
                this.height = height;
                this.lights = [];
	}
	
	darken(ctx, darkenColor, amount) {
		ctx.fillStyle = darkenColor;
		ctx.globalAlpha = amount;
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.globalAlpha = 1;
	}
	
	lightenGradient(ctx, x, y, radius) {
		ctx.save();
		ctx.globalCompositeOperation = 'lighter';
		var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
		radius = radius * (1 + rnd);
		var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
		radialGradient.addColorStop(0.0, '#BB9');
		radialGradient.addColorStop(0.2 + rnd, '#AA8');
		radialGradient.addColorStop(0.7 + rnd, '#330');
		radialGradient.addColorStop(0.90, '#110');
		radialGradient.addColorStop(1, '#000');
		ctx.fillStyle = radialGradient;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	}
	
	addLight(id, position, radius){
		var light = new Light(id, position, radius);
		this.lights.push(light);	
	}
	
	draw(g){
		for (var i = 0; i < this.lights.length; i++){
			var light = this.lights[i];
			this.lightenGradient(g, light.position.x, light.position.y, light.radius);
		}
	}

}
