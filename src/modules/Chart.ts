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
	private canvasHeight: number = (this.canvas.height =
		document.documentElement.clientHeight - 100);
	private canvasWidth: number = (this.canvas.width =
		document.documentElement.clientWidth - 100);
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
		let yBaseLine: number = this.canvasHeight - countBlocks(5);
		let startingPoint: number = this.canvasWidth - countBlocks(5);
		let differenceBetweenPoints: number = 50;
		this.ctx.beginPath();
		this.ctx.moveTo(0, yBaseLine);
		this.ctx.lineTo(this.canvasWidth, yBaseLine);
		// this.ctx.stroke();
		const data: (string | number)[][] = givenData;
		const time = data.map(prices => {
			//Change given timestamps to UTC time format
			// let currentTime: string = new Date((prices[0] as number) / 1000)
			// 	.toLocaleString()
			// 	.replace(/^(\w+|\s)|(\w+)$/g, '');
			// let openingPrice: string | number = prices[1];
			// let highestPrice: string | number = prices[2];
			// let lowestPrice: string | number = prices[3];
			let closingPrice: string | number = prices[4];
			this.ctx.moveTo(startingPoint, yBaseLine);
			this.ctx.lineTo(startingPoint, yBaseLine + 10);
			// this.ctx.fillText(`${currentTime}`, startingPoint, yBaseLine + 15);
			// this.ctx.textAlign = 'center';
			startingPoint -= differenceBetweenPoints;
		});
		this.ctx.strokeStyle = 'red';
		this.ctx.stroke();
	}

	drawPriceLine() {
		const xBaseLine = this.ctx.moveTo(this.canvasWidth - countBlocks(5), 0);
		this.ctx.lineTo(this.canvasWidth - countBlocks(5), this.canvasHeight);
		let startingPointForY = this.canvasHeight;
		let startingPointForX = this.canvasWidth - countBlocks(5);
		const listOfLowestPrice: (string | number)[] = givenData.map(
			prices => prices[3],
		);
		const listOfHighestPrice: (string | number)[] = givenData.map(
			prices => prices[2],
		);
		let currentLowestPoint = Math.min(...(listOfLowestPrice as number[]));
		let currentPoint: number =
			currentLowestPoint % 5 === 0
				? Math.trunc(currentLowestPoint)
				: Math.trunc(currentLowestPoint + (currentLowestPoint % 5));

		while (startingPointForY >= 0) {
			this.ctx.moveTo(startingPointForX, startingPointForY);
			this.ctx.lineTo(startingPointForX - 20, startingPointForY);
			this.ctx.fillText(
				`${currentPoint}`,
				startingPointForX + 10,
				startingPointForY,
			);
			startingPointForY -= countBlocks(5);
			currentPoint += 5;
		}
		this.ctx.stroke();
	}
}

export default Chart;
