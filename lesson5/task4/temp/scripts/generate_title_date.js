import "core-js/modules/es.array.concat";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.split";
import { arrDaysOfWeek } from './current_week.js';
export var renderTitleDate = function renderTitleDate(startdate, enddate) {
  var placeForDateTitle = document.querySelector('.nav__dateMonEar-today');
  var firstDayOfWeek = new Date(startdate);
  var firstDayMonth = firstDayOfWeek.toDateString().split(' ')[1];
  var firstDayYear = firstDayOfWeek.getFullYear();
  var lastDayOfWeek = new Date(enddate);
  var lastDayMonth = lastDayOfWeek.toDateString().split(' ')[1];
  var lastDayYear = lastDayOfWeek.getFullYear();

  if (firstDayMonth === lastDayMonth && firstDayYear === lastDayYear) {
    placeForDateTitle.innerHTML = "".concat(firstDayMonth, " ").concat(firstDayYear);
  }

  if (firstDayMonth !== lastDayMonth && firstDayYear === lastDayYear) {
    placeForDateTitle.innerHTML = "".concat(firstDayMonth, " - ").concat(lastDayMonth.toLocaleLowerCase(), " ").concat(firstDayYear);
  }

  if (firstDayMonth !== lastDayMonth && firstDayYear !== lastDayYear) {
    placeForDateTitle.innerHTML = "".concat(firstDayMonth, " ").concat(firstDayYear, " - ").concat(lastDayMonth, " ").concat(lastDayYear);
  }
};
renderTitleDate(arrDaysOfWeek[0], arrDaysOfWeek[6]);