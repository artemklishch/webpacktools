
import './redLine.scss';

function createRedLine() {
  const redLine = document.createElement('div');
  redLine.setAttribute('id', 'red');
  redLine.setAttribute('class', 'redline');

  const redLineBall = document.createElement('div');
  redLineBall.setAttribute('class', 'redline__ball');

  const redLineLine = document.createElement('div');
  redLineLine.setAttribute('class', 'redline__line');

  redLine.appendChild(redLineBall);
  redLine.appendChild(redLineLine);
  return redLine;
}

export const renderRedLIne = () => {
  const hourDiv = document.querySelector(`div[data-day-number="${new Date().getDay()}"] > `
        + `div[data-hour-number="${new Date().getHours()}"]`);

  const hourRect = hourDiv.getClientRects()[0];
  let redLine = document.getElementById('red');

  if (redLine == null) {
    redLine = createRedLine();
  } else {
    redLine.parentNode.removeChild(redLine);
  }

  const position = (hourRect.height / 60) * new Date().getMinutes();
  redLine.style.top = `${position}px`;
  hourDiv.appendChild(redLine);
};
export let timerId;//eslint-disable-line
export const intervalFunc = () => {
  timerId = setInterval(renderRedLIne, 60 * 1000);
  return timerId;
};
intervalFunc();

renderRedLIne();
