import Chart from './modules/Chart';
import { countBlocks } from './modules/helper/countBlocks';
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
	private highestPrice: number;
	private lowestPrice: number;
	private openingPrice: number = 22995;
	private closingPrice: number = 22980;
	public constructor(container: HTMLDivElement) {
		super(container);
		this.container = container;
	}
	// ctx: CanvasRenderingContext2D = this.getCtx();
	public drawCandleStick() {
		let lowestPricePoint = this.currentPoint;
		let startingPointX: number = this.canvasWidth - countBlocks(10);
		let startingPointY: number =
			this.canvasHeight - countBlocks(this.openingPrice - lowestPricePoint);
		console.log('HERE', this.closingPrice - lowestPricePoint);
		this.ctx.beginPath();
		this.ctx.moveTo(startingPointX, startingPointY);
		this.ctx.lineTo(
			startingPointX,
			this.canvasHeight - countBlocks(this.closingPrice - lowestPricePoint),
		);
		this.ctx.strokeStyle = 'black';
		this.ctx.stroke();
	}
}

export default CandleStick;
