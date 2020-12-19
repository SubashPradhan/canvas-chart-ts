import { givenData } from './helper/data';
import { countBlocks } from './helper/countBlocks';

interface IChart {
	drawGrids: () => void;
}

class Chart implements IChart {
	private container: HTMLDivElement;
	private xGrid: number = 10;
	private yGrid: number = 10;
	private tabcellSize: number = 10;
	private canvas: HTMLCanvasElement = document.createElement('canvas');
	private canvasHeight: number = (this.canvas.height = 500);
	private canvasWidth: number = (this.canvas.width = 700);
	private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

	public constructor(container: HTMLDivElement) {
		this.container = container;
		this.container.appendChild(this.canvas);
		this.ctx.beginPath();
	}

	public drawGrids() {
		while (this.yGrid < this.canvasWidth) {
			this.ctx.moveTo(this.canvasWidth - this.yGrid, 0);
			this.ctx.lineTo(this.canvasWidth - this.yGrid, this.canvasHeight);
			this.yGrid += this.tabcellSize;
		}

		while (this.xGrid < this.canvasHeight) {
			this.ctx.moveTo(0, this.canvasHeight - this.xGrid);
			this.ctx.lineTo(this.canvasWidth, this.canvasHeight - this.xGrid);
			this.xGrid += this.tabcellSize;
		}
		this.ctx.strokeStyle = 'grey';
		this.ctx.stroke();
	}

	public drawTimeLine() {
		let yBaseLine = countBlocks(45);
		let startingPoint = this.canvasWidth - countBlocks(1);
		let differenceBetweenPoints = 50;
		this.ctx.beginPath();
		this.ctx.moveTo(0, yBaseLine);
		this.ctx.lineTo(this.canvasWidth, yBaseLine);
		// this.ctx.stroke();
		const data: (string | number)[][] = givenData;
		const time = data.map(prices => {
			//Change given timestamps to UTC time format
			let currentTime: string = new Date((prices[0] as number) / 1000)
				.toLocaleString()
				.replace(/^(\w+|\s)|(\w+)$/g, '');
			// let openingPrice: string | number = prices[1];
			// let highestPrice: string | number = prices[2];
			// let lowestPrice: string | number = prices[3];
			let closingPrice: string | number = prices[4];
			this.ctx.moveTo(startingPoint, yBaseLine);
			this.ctx.lineTo(startingPoint, yBaseLine + 10);
			this.ctx.fillText(`${currentTime}`, startingPoint, yBaseLine + 15);
			this.ctx.textAlign = 'center';
			startingPoint -= differenceBetweenPoints;
		});
		this.ctx.strokeStyle = 'red';
		this.ctx.stroke();
		// console.log('Time', time);
	}
}

export default Chart;
