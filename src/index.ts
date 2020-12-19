import Chart from './modules/Chart';
const container: HTMLDivElement = document.querySelector('.container');
const head: HTMLHeadElement = document.head;
const style: HTMLStyleElement = document.createElement('style');
head.appendChild(style);

const currentScreenHeight: number = document.documentElement.clientHeight;
style.innerHTML = `
  *{
    margin: 0;
    padding: 0;
  }

  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${currentScreenHeight}px;
  }

  canvas{
    border: 1px solid black;
  }
`;

const chart = new Chart(container);
chart.draw();
