import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { getItem } from './storage.js';
import { arrDaysOfWeek } from './current_week.js';
export var firstPoint, lastPoint;
var fileOfHoures = document.querySelectorAll('.main__sidebar_days_line');

var clearFunc = function clearFunc() {
  var arrOfHours = document.querySelectorAll('.main__sidebar_days_hours');

  _toConsumableArray(arrOfHours).forEach(function (elem) {
    return elem.innerHTML = '';
  });
};

var transformObjectFunc = function transformObjectFunc(element) {
  var endYearForObj1 = new Date(element.startTime).getFullYear();
  var endMonthForObj1 = new Date(element.startTime).getMonth();
  var endDateForObj1 = new Date(element.startTime).getDate();
  var endTimeForObj1 = new Date(endYearForObj1, endMonthForObj1, endDateForObj1, 24);
  var startYearForObj2 = new Date(element.endTime).getFullYear();
  var startMonthForObj2 = new Date(element.endTime).getMonth();
  var endDateForObj2 = new Date(element.endTime).getDate();
  var startTimeForObj2 = new Date(startYearForObj2, startMonthForObj2, endDateForObj2);
  var obj1 = {
    backgroundColor: element.backgroundColor,
    header: element.header,
    startTime: element.startTime,
    endTime: endTimeForObj1,
    description: element.description,
    id: element.id
  };
  var obj2 = {
    backgroundColor: element.backgroundColor,
    header: element.header,
    startTime: startTimeForObj2,
    endTime: element.endTime,
    description: element.description,
    id: element.id
  };
  return [obj1, obj2];
};

var forHeight = function forHeight(object, elem) {
  if (object.startTime.getMinutes() === 15) elem.style.top = '25%';
  if (object.startTime.getMinutes() === 30) elem.style.top = '50%';
  if (object.startTime.getMinutes() === 45) elem.style.top = '75%';
  var timesOfRange = (object.endTime - object.startTime) / 1000 / 60 / 15;
  elem.style.height = timesOfRange * 24.5 + '%';
  if (timesOfRange < 4) elem.style.padding = 0;
};

export var transformHourFormat = function transformHourFormat(hour) {
  if (hour === 13) hour = 1;
  if (hour === 14) hour = 2;
  if (hour === 15) hour = 3;
  if (hour === 16) hour = 4;
  if (hour === 17) hour = 5;
  if (hour === 18) hour = 6;
  if (hour === 19) hour = 7;
  if (hour === 20) hour = 8;
  if (hour === 21) hour = 9;
  if (hour === 22) hour = 10;
  if (hour === 23) hour = 11;
  if (hour === 24) hour = 0;
  return hour;
};

var fillDayPlace = function fillDayPlace(dayObject) {
  var startTime = new Date(dayObject.startTime);
  var endTime = new Date(dayObject.endTime);
  var certainHour = startTime.getHours();
  var startTimeHour = startTime.getHours();
  startTimeHour = transformHourFormat(startTimeHour);
  var startTimeMinutes = startTime.getMinutes();
  var endTimeHour = endTime.getHours();
  endTimeHour = transformHourFormat(endTimeHour);
  var endTimeMinutes = endTime.getMinutes();

  if (startTimeMinutes !== 0) {
    startTimeHour += ":".concat(startTimeMinutes);
  }

  if (endTimeMinutes !== 0) {
    endTimeHour += ":".concat(endTimeMinutes);
  }

  var certainDay = _toConsumableArray(fileOfHoures).find(function (elem, index) {
    return index === new Date(dayObject.startTime).getDay();
  });

  var certainPlace = _toConsumableArray(certainDay.children).find(function (elem, index) {
    return index === certainHour;
  });

  var tempNum = 12;
  var tempVal;

  _toConsumableArray(fileOfHoures).forEach(function () {
    if (startTime.getHours() <= tempNum && endTime.getHours() <= tempNum) {
      tempVal = "".concat(startTimeHour, " - ").concat(endTimeHour, " AM");
    }

    if (startTime.getHours() <= tempNum && endTime.getHours() > tempNum) {
      tempVal = "".concat(startTimeHour, " AM - ").concat(endTimeHour, " PM");
    }

    if (startTime.getHours() > tempNum) {
      tempVal = "".concat(startTimeHour, " - ").concat(endTimeHour, " PM");
    }
  });

  var divElem = document.createElement('div');
  var h7Elem = document.createElement('h4');
  dayObject.header ? h7Elem.innerHTML = dayObject.header : h7Elem.innerHTML = "without of header";
  var pElem = document.createElement('p');
  pElem.innerHTML = tempVal;
  divElem.classList.add('main__sidebar_day_object');
  divElem.style.backgroundColor = dayObject.backgroundColor;
  divElem.setAttribute('data-id', dayObject.id);
  forHeight(dayObject, divElem);
  divElem.append(h7Elem, pElem);
  certainPlace.append(divElem);
};

export var filterCorrectDays = function filterCorrectDays(eventsArray, firstDayOfWeek, lastDayOfWeek) {
  var firstDateInWeek = new Date(firstDayOfWeek);
  var firstDayYear = firstDateInWeek.getFullYear();
  var firstDayMonth = firstDateInWeek.getMonth();
  var firstDayDate = firstDateInWeek.getDate();
  firstPoint = new Date(firstDayYear, firstDayMonth, firstDayDate);
  var lastDateInWeek = new Date(lastDayOfWeek);
  var lastDayYear = lastDateInWeek.getFullYear();
  var lastDayMonth = lastDateInWeek.getMonth();
  var lastDayDate = lastDateInWeek.getDate();
  lastPoint = new Date(lastDayYear, lastDayMonth, lastDayDate + 1);
  return eventsArray.filter(function (elem) {
    return elem.startTime >= firstPoint && elem.startTime < lastPoint;
  });
};

var forChangingEventsArray = function forChangingEventsArray(array) {
  var arr = array.map(function (element) {
    element.startTime = new Date(element.startTime);
    element.endTime = new Date(element.endTime);
    return element;
  });
  var transformedArray = [];
  arr.forEach(function (element) {
    if (element.startTime.getDate() !== element.endTime.getDate() && element.endTime.getHours() > 0) {
      transformObjectFunc(element).forEach(function (elem) {
        return transformedArray.push(elem);
      });
    } else transformedArray.push(element);
  });
  var tempArr = filterCorrectDays(transformedArray, arrDaysOfWeek[0], arrDaysOfWeek[6]);
  tempArr.forEach(function (elem) {
    return fillDayPlace(elem);
  });
};

export var renderEventObject = function renderEventObject() {
  clearFunc();
  var array = getItem('eventsArray') || [];
  return forChangingEventsArray(array);
};