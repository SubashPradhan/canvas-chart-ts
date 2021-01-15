import { countBlocks } from './countBlocks';

// Create list of low prices.
// Get the lowest price from the list.
// Return price that is multiple of 5
// Use count blocks to give margin on top(ADD BLOCKS) and bottom(SUBTRACT BLOCKS) prices

const defaultMargin: number = countBlocks(10);
export const getLowestStartPrice = (data: (string | number)[][]): number => {
	const listOfLowestPrices: (string | number)[] = data.map(prices => prices[3]);
	const lowestPrice: number = Math.min(...(listOfLowestPrices as number[]));
	return lowestPrice % 5 === 0
		? lowestPrice - defaultMargin
		: lowestPrice - (lowestPrice % 5) - defaultMargin;
};

export const getHighestEndingPrice = (data: (string | number)[][]): number => {
	const listOfHighestPrices: (string | number)[] = data.map(
		prices => prices[2],
	);
	const highestPrice: number = Math.max(...(listOfHighestPrices as number[]));
	return highestPrice % 5 === 0
		? highestPrice + defaultMargin
		: highestPrice - (highestPrice % 5) + defaultMargin;
};
