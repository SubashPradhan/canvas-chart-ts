import Chart from './modules/Chart';
import CandleStick from './modules/Candlestick';

const container: HTMLDivElement = document.querySelector('.container');
const head: HTMLHeadElement = document.head;
const style: HTMLStyleElement = document.createElement('style');
head.appendChild(style);

const currentScreenHeight: number = document.documentElement.clientHeight;
const currentScreenWidth: number = document.documentElement.clientWidth;
style.innerHTML = `
  *{
    margin: 0;
    padding: 0;
  }
  
  .container{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${currentScreenHeight}px;
    width: ${currentScreenWidth}px;
  }

  canvas{
    border: 1px solid black;
  }
`;

function init() {
	const candleStick: CandleStick = new CandleStick(container);
	candleStick.drawGrids();
	candleStick.drawTimeLine();
	candleStick.drawPriceLine();
	candleStick.drawCandleStick();
}

init();
