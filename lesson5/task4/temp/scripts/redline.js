function createRedLine() {
  var redLine = document.createElement('div');
  redLine.setAttribute("id", 'red');
  redLine.setAttribute("class", 'redline');
  var redLineBall = document.createElement('div');
  redLineBall.setAttribute('class', 'redline__ball');
  var redLineLine = document.createElement('div');
  redLineLine.setAttribute('class', 'redline__line');
  redLine.appendChild(redLineBall);
  redLine.appendChild(redLineLine);
  return redLine;
}

export var renderRedLIne = function renderRedLIne() {
  var hourDiv = document.querySelector('div[data-day-number="' + new Date().getDay() + '"] > ' + 'div[data-hour-number="' + new Date().getHours() + '"]');
  var hourRect = hourDiv.getClientRects()[0];
  var redLine = document.getElementById('red');

  if (redLine == null) {
    redLine = createRedLine();
  } else {
    redLine.parentNode.removeChild(redLine);
  }

  var position = hourRect.height / 60 * new Date().getMinutes();
  redLine.style.top = position + "px";
  hourDiv.appendChild(redLine);
};
export var timerId;
export var intervalFunc = function intervalFunc() {
  timerId = setInterval(renderRedLIne, 60 * 1000);
  return timerId;
};
intervalFunc();
renderRedLIne();