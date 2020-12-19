interface IChart {
	drawGrids: () => void;
}

class Chart implements IChart {
	private container: HTMLDivElement;
	private xGrid: number = 10;
	private yGrid: number = 10;
	private tabcellSize: number = 10;

	constructor(container: HTMLDivElement) {
		this.container = container;
	}

	public drawGrids() {
		const canvas: HTMLCanvasElement = document.createElement('canvas');
		const canvasHeight: number = (canvas.height = 500);
		const canvasWidth: number = (canvas.width = 700);
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		this.container.appendChild(canvas);
		ctx.beginPath();

		while (this.yGrid < canvasWidth) {
			ctx.moveTo(canvasWidth - this.yGrid, 0);
			ctx.lineTo(canvasWidth - this.yGrid, canvasHeight);
			this.yGrid += this.tabcellSize;
		}

		while (this.xGrid < canvasHeight) {
			ctx.moveTo(0, canvasHeight - this.xGrid);
			ctx.lineTo(canvasWidth, canvasHeight - this.xGrid);
			this.xGrid += this.tabcellSize;
		}
		ctx.strokeStyle = 'grey';
		ctx.stroke();
	}
}

export default Chart;
