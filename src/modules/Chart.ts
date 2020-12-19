interface IChart {
	tabcell: number;
	container: HTMLDivElement;
	draw: () => void;
}

class Chart implements IChart {
	public tabcell: number;
	public container: HTMLDivElement;
	private xGrid: number = 10;
	constructor(container: HTMLDivElement, tabcell: number) {
		this.tabcell = tabcell;
		this.container = container;
	}

	public draw() {
		const canvas: HTMLCanvasElement = document.createElement('canvas');
		const canvasHeight: number = (canvas.height = 500);
		const canvasWidth: number = (canvas.width = 700);
		this.container.appendChild(canvas);
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.beginPath();
		while (this.tabcell < canvasWidth) {
			ctx.moveTo(canvasWidth - this.tabcell, 0);
			ctx.lineTo(canvasWidth - this.tabcell, canvasHeight);
			this.tabcell += 10;
		}

		while (this.xGrid < canvasHeight) {
			ctx.moveTo(0, canvasHeight - this.xGrid);
			ctx.lineTo(canvasWidth, canvasHeight - this.xGrid);
			this.xGrid += 10;
			console.log(this.xGrid);
		}
		ctx.strokeStyle = 'grey';
		ctx.stroke();
		console.log('I am drawing this');
	}
}

export default Chart;
