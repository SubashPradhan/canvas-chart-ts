const head: HTMLHeadElement = document.head;
const style: HTMLStyleElement = document.createElement('style');
head.appendChild(style);

style.innerHTML = `
  *{
    margin: 0;
    padding: 0;
  }
`;

console.log('Hello World');
