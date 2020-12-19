interface IChart {
	container: HTMLDivElement;
	draw: () => void;
}

class Chart implements IChart {
	public container: HTMLDivElement;
	private xGrid: number = 10;
	private yGrid: number = 10;
	private tabcellSize: number = 10;

	constructor(container: HTMLDivElement) {
		this.container = container;
	}

	public draw() {
		const canvas: HTMLCanvasElement = document.createElement('canvas');
		const canvasHeight: number = (canvas.height = 500);
		const canvasWidth: number = (canvas.width = 700);
		this.container.appendChild(canvas);
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.beginPath();

		while (this.yGrid < canvasWidth) {
			ctx.moveTo(canvasWidth - this.yGrid, 0);
			ctx.lineTo(canvasWidth - this.yGrid, canvasHeight);
			this.yGrid += this.tabcellSize;
		}

		while (this.xGrid < canvasHeight) {
			console.log(this.xGrid);
			ctx.moveTo(0, canvasHeight - this.xGrid);
			ctx.lineTo(canvasWidth, canvasHeight - this.xGrid);
			this.xGrid += this.tabcellSize;
		}
		ctx.strokeStyle = 'grey';
		ctx.stroke();
	}
}

export default Chart;
