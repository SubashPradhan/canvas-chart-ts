import { givenData } from './helper/data';
import Chart from './Chart';
import { countBlocks } from './helper/countBlocks';

class CandleStick extends Chart {
	public constructor(container: HTMLDivElement) {
		super(container);
		this.container = container;
	}

	public drawCandleStick() {
		let lowestPricePoint: number = this.currentStartingLowPoint;
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
					countBlocks((highestPrice as number) - lowestPricePoint) /
						this.priceIncrementOnBlocks, // Divide by number of prices so each block holds this.priceIncrementOnBlocks prices so we can calculate the distance in blocks
			);
			this.ctx.stroke();
			this.ctx.strokeStyle = 'black';
			this.ctx.lineTo(
				startingPointX,
				startingPointY -
					countBlocks((lowestPrice as number) - lowestPricePoint) /
						this.priceIncrementOnBlocks, //per this.priceIncrementOnBlocks
			);
			if (closingPrice === openingPrice)
				console.log('this is the condition we are looking for');
			this.ctx.fillStyle = closingPrice < openingPrice ? 'green' : 'red';
			this.ctx.fillRect(
				startingPointX - 10,
				startingPointY -
					countBlocks((openingPrice as number) - lowestPricePoint) /
						this.priceIncrementOnBlocks, // per this.priceIncrementOnBlocks
				20,
				countBlocks((openingPrice as number) - Number(closingPrice)) /
					this.priceIncrementOnBlocks, // per 18
			);
			startingPointX -= countBlocks(2.5); //per candlestick size
		});
	}
}

export default CandleStick;
