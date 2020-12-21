import { givenData } from './helper/data';
import Chart from './Chart';
import { countBlocks } from './helper/countBlocks';
import { textChangeRangeIsUnchanged } from '../../node_modules/typescript/lib/typescript';
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
	// private highestPrice: number = 23000;
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
		let startingPointY: number = this.canvasHeight - countBlocks(5); // This is 5 blocks above the starting point of y
		givenData.map(prices => {
			let openingPrice: string | number = prices[1];
			let highestPrice: string | number = prices[2];
			let lowestPrice: string | number = prices[3];
			let closingPrice: string | number = prices[4];
			this.ctx.moveTo(
				startingPointX,
				startingPointY -
					countBlocks((highestPrice as number) - lowestPricePoint) / 2, // Divide by two so each bock holds 2 prices
			);
			this.ctx.lineTo(
				startingPointX,
				startingPointY -
					countBlocks((lowestPrice as number) - lowestPricePoint) / 2,
			);
			this.ctx.strokeStyle = 'black';
			this.ctx.stroke();
			this.ctx.fillStyle = closingPrice < openingPrice ? 'green' : 'red';
			this.ctx.fillRect(
				startingPointX - 10,
				startingPointY -
					countBlocks((openingPrice as number) - lowestPricePoint) / 2,
				20,
				countBlocks((openingPrice as number) - Number(closingPrice)) / 2,
			);
			startingPointX -= countBlocks(2.5);
		});
	}
}

export default CandleStick;
