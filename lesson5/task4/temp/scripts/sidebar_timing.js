import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
export var generateNumbers = function generateNumbers(from, to) {
  var count = 0;
  var arrOfPoints = [];
  var timeOfDay = 'AM';

  for (var i = from; count !== 2; i++) {
    var tempStr = void 0;

    if (i === from) {
      tempStr = '';
      arrOfPoints.push(tempStr);
      continue;
    }

    if (i > to) {
      i = 1;
      count++;
      timeOfDay = 'PM';
    }

    if (i === to && timeOfDay === 'PM') {
      tempStr = '';
      arrOfPoints.push(tempStr);
      break;
    }

    tempStr = "".concat(i, " ").concat(timeOfDay);
    arrOfPoints.push(tempStr);
  }

  return arrOfPoints;
};
var sidebarTiming = document.querySelector('.main__sidebar_timing');
export var renderTimingSidebar = function renderTimingSidebar() {
  var arrOfTimePoints = generateNumbers(0, 12);
  var timePoints = arrOfTimePoints.map(function (timePoint) {
    return "\n        <div class=\"main__sidebar_timing_place\">\n            <span class=\"main__sidebar_time\">".concat(timePoint, "</span>\n            <div class=\"main__sidebar_timing_place-bord\"></div>\n        </div>\n        ");
  }).join('');
  sidebarTiming.innerHTML = timePoints;
};
renderTimingSidebar();