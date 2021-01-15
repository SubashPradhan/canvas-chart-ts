import { givenData } from './helper/data';
import { countBlocks } from './helper/countBlocks';
import {
	getLowestStartPrice,
	getHighestEndingPrice,
} from './helper/getPriceRange';

interface IChart {
	// container: HTMLDivElement;
	currentStartingLowPrice: number;
	currentEndingHighPrice: number;
	canvasHeight: number;
	canvasWidth: number;
	ctx: CanvasRenderingContext2D;
	drawGrids: () => void;
	drawTimeLine: () => void;
	drawPriceLine: () => void;
}

class Chart implements IChart {
	public container: HTMLDivElement;
	public currentStartingLowPrice: number = getLowestStartPrice(givenData);
	public currentEndingHighPrice: number = getHighestEndingPrice(givenData);
	private screenMargin: number = 100;
	private canvasMargin: number = countBlocks(5);
	private canvas: HTMLCanvasElement = document.createElement('canvas');
	public ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
	public canvasHeight: number = (this.canvas.height =
		document.documentElement.clientHeight - this.screenMargin);
	public canvasWidth: number = (this.canvas.width =
		document.documentElement.clientWidth - this.screenMargin);
	private xGrid: number = 10;
	private yGrid: number = 10;
	private tabcellSize: number = 10;

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

		// Draw X grids
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
		let yBaseLine: number = this.canvasHeight - this.canvasMargin;
		this.ctx.beginPath();
		this.ctx.moveTo(0, yBaseLine);
		this.ctx.lineTo(this.canvasWidth, yBaseLine);
	}

	// Get price per blocks in blocks count
	public priceIncrementOnBlocks: number = Math.floor(
		countBlocks(
			(this.currentEndingHighPrice - this.currentStartingLowPrice) /
				(this.canvasHeight - this.canvasMargin),
		),
	);

	public drawPriceLine() {
		this.ctx.moveTo(this.canvasWidth - this.canvasMargin, 0);
		this.ctx.lineTo(this.canvasWidth - this.canvasMargin, this.canvasHeight);
		let startingPointForY: number = this.canvasHeight - this.canvasMargin;
		let startingPointForX: number = this.canvasWidth - this.canvasMargin;
		let Yline: number = this.currentStartingLowPrice;
		let priceIncrement: number = this.priceIncrementOnBlocks * 5; // per block holds the price of price increment so per 5 blocks which is our increment for line Y
		while (startingPointForY >= 0) {
			this.ctx.moveTo(startingPointForX, startingPointForY);
			this.ctx.lineTo(startingPointForX + 20, startingPointForY);
			this.ctx.fillText(`${Yline}`, startingPointForX + 5, startingPointForY);
			startingPointForY -= this.canvasMargin;
			Yline += priceIncrement * 5; // prices shown on the side
		}
	}
}

export default Chart;
