import Chart from './Chart';
import { countBlocks } from './helper/countBlocks';
const container: HTMLDivElement = document.createElement('div');
interface ICandleStick {
	currentTime: Date;
	highestPrice: number;
	lowestPrice: number;
	openingPrice: number;
	closingPrice: number;
}

class CandleStick extends Chart {
	private currentTime: Date;
	private highestPrice: number = 23000;
	private lowestPrice: number = 22980;
	private openingPrice: number = 22985;
	private closingPrice: number = 22995;
	public constructor(container: HTMLDivElement) {
		super(container);
		this.container = container;
	}

	public drawCandleStick() {
		let lowestPricePoint = this.currentPoint;
		let startingPointX: number = this.canvasWidth - countBlocks(10);
		let startingPointY: number =
			this.canvasHeight - countBlocks(this.highestPrice - lowestPricePoint);
		// console.log('HERE', this.lowestPrice - lowestPricePoint);
		this.ctx.beginPath();
		this.ctx.moveTo(startingPointX, startingPointY);
		this.ctx.lineTo(
			startingPointX,
			this.canvasHeight - countBlocks(this.lowestPrice - lowestPricePoint),
		);
		this.ctx.strokeStyle = 'green';
		this.ctx.stroke();
		this.ctx.fillStyle =
			this.closingPrice > this.openingPrice ? 'green' : 'red';
		this.ctx.fillRect(
			startingPointX,
			this.canvasHeight - countBlocks(this.openingPrice - lowestPricePoint),
			10,
			countBlocks(this.openingPrice - this.closingPrice),
		);
	}
}

export default CandleStick;
