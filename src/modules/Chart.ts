import { givenData } from './helper/data';
import { countBlocks } from './helper/countBlocks';

interface IChart {
	drawGrids: () => void;
	drawTimeLine: () => void;
}
class Chart implements IChart {
	public container: HTMLDivElement;
	private xGrid: number = 10;
	private yGrid: number = 10;
	private margin: number = 100;
	private tabcellSize: number = 10;
	private canvas: HTMLCanvasElement = document.createElement('canvas');
	public canvasHeight: number = (this.canvas.height =
		document.documentElement.clientHeight - this.margin);
	public canvasWidth: number = (this.canvas.width =
		document.documentElement.clientWidth - this.margin);
	public ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

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
		// let startingPoint: number = this.canvasWidth - countBlocks(5);
		// let differenceBetweenPoints: number = 50;
		this.ctx.beginPath();
		this.ctx.moveTo(0, yBaseLine);
		this.ctx.lineTo(this.canvasWidth, yBaseLine);
		// this.ctx.stroke();
		// const data: (string | number)[][] = givenData;
		// const time = givenData.map(prices => {
		// Change given timestamps to UTC time format
		// let currentTime: string = new Date((prices[0] as number) / 1000)
		// .toLocaleString()
		// 		// .replace(/^(\w+|\s)|(\w+)$/g, '');
		// 	let openingPrice: string | number = prices[1];
		// 	let highestPrice: string | number = prices[2];
		// 	let lowestPrice: string | number = prices[3];
		// 	let closingPrice: string | number = prices[4];
		// 	this.ctx.moveTo(startingPoint, yBaseLine);
		// 	this.ctx.lineTo(startingPoint, yBaseLine + 10);
		// 	this.ctx.fillText(`${currentTime}`, startingPoint, yBaseLine + 15);
		// 	this.ctx.textAlign = 'center';
		// 	startingPoint -= differenceBetweenPoints;
		// });
		// this.ctx.strokeStyle = 'red';
		// this.ctx.stroke();
	}

	/// REFACTOR THIS CODE LATER
	public listOfLowestPrice: (string | number)[] = givenData.map(
		prices => prices[3],
	);

	// Change this name to lowestPrice
	public currentLowestPoint: number = Math.trunc(
		Math.min(...(this.listOfLowestPrice as number[])),
	);

	//Current min/ lowest point
	public currentStartingLowPoint: number =
		this.currentLowestPoint % 5 === 0
			? this.currentLowestPoint
			: this.currentLowestPoint - (this.currentLowestPoint % 5); //This needs to be checked as well

	/// For creating range between highest and lowest price.
	public listOfHighestPrice: (string | number)[] = givenData.map(
		prices => prices[2],
	);

	public currentHighestPrice = Math.trunc(
		Math.max(...(this.listOfHighestPrice as number[])),
	);

	public currentEndingHighestPrice =
		this.currentHighestPrice % 5 === 0
			? this.currentHighestPrice
			: this.currentHighestPrice + (5 - (this.currentHighestPrice % 5));

	public drawPriceLine() {
		console.log(this.currentEndingHighestPrice - this.currentStartingLowPoint);
		console.log(this.currentEndingHighestPrice);
		console.log(this.currentStartingLowPoint);
		console.log('Height', this.canvasHeight);
		const xBaseLine = this.ctx.moveTo(this.canvasWidth - countBlocks(5), 0);
		this.ctx.lineTo(this.canvasWidth - countBlocks(5), this.canvasHeight);
		let startingPointForY = this.canvasHeight - countBlocks(5);
		console.log('This is start ', startingPointForY);
		let startingPointForX = this.canvasWidth - countBlocks(5);

		let Yline: number = this.currentStartingLowPoint; //Change this as well
		let priceIncrement: number = 18 * 5; // prices per block times number of blocks.
		while (startingPointForY >= 0) {
			this.ctx.moveTo(startingPointForX, startingPointForY);
			this.ctx.lineTo(startingPointForX + 20, startingPointForY);
			this.ctx.fillText(`${Yline}`, startingPointForX + 5, startingPointForY);
			startingPointForY -= countBlocks(5);

			Yline += priceIncrement; // prices shown on the side
		}
		this.ctx.stroke();
	}
}

// Button for show hide grid

export default Chart;
