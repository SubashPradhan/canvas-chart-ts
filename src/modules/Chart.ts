import { givenData } from './helper/data';
import { countBlocks } from './helper/countBlocks';
import {
	getLowestStartPrice,
	getHighestEndingPrice,
} from './helper/getPriceRange';

interface IChart {
	drawGrids: () => void;
	drawTimeLine: () => void;
}

class Chart implements IChart {
	public container: HTMLDivElement;
	private xGrid: number = 10;
	private yGrid: number = 10;
	private tabcellSize: number = 10;
	public currentStartingLowPrice: number = getLowestStartPrice(givenData);
	public currentEndingHighPrice: number = getHighestEndingPrice(givenData);
	private screenMargin: number = 100;
	private canvas: HTMLCanvasElement = document.createElement('canvas');
	public canvasHeight: number = (this.canvas.height =
		document.documentElement.clientHeight - this.screenMargin);
	public canvasWidth: number = (this.canvas.width =
		document.documentElement.clientWidth - this.screenMargin);
	public ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

	public constructor(container: HTMLDivElement) {
		this.container = container;
		this.container.appendChild(this.canvas);
	}

	public drawGrids() {
		this.ctx.beginPath();
		// Draw Y grids
		while (this.yGrid < this.canvasWidth) {
			let xPoint: number = this.canvasWidth - this.yGrid;
			this.ctx.moveTo(xPoint, 0);
			this.ctx.lineTo(xPoint, this.canvasHeight);
			this.yGrid += this.tabcellSize;
		}

		// Draw x grids
		while (this.xGrid < this.canvasHeight) {
			let yPoint: number = this.canvasHeight - this.xGrid;
			this.ctx.moveTo(0, yPoint);
			this.ctx.lineTo(this.canvasWidth, yPoint);
			this.xGrid += this.tabcellSize;
		}
		this.ctx.strokeStyle = 'grey';
		this.ctx.stroke();
	}

	public drawTimeLine() {
		let yBaseLine: number = this.canvasHeight - countBlocks(5);
		this.ctx.beginPath();
		this.ctx.moveTo(0, yBaseLine);
		this.ctx.lineTo(this.canvasWidth, yBaseLine);
	}

	public priceIncrementOnBlocks: number = Math.floor(
		countBlocks(
			(this.currentEndingHighPrice - this.currentStartingLowPrice) /
				(this.canvasHeight - countBlocks(5)),
		),
	); // prices per block times number of blocks.

	public drawPriceLine() {
		console.log(this.currentStartingLowPrice);
		const xBaseLine = this.ctx.moveTo(this.canvasWidth - countBlocks(5), 0);
		this.ctx.lineTo(this.canvasWidth - countBlocks(5), this.canvasHeight);
		let startingPointForY = this.canvasHeight - countBlocks(5);
		let startingPointForX = this.canvasWidth - countBlocks(5);

		let Yline: number = this.currentStartingLowPrice; // Change this as well
		let priceIncrement: number = this.priceIncrementOnBlocks * 5; // per block holds the price of price increment so per 5 blocks which is our increment for line Y
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
