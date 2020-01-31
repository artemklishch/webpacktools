import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var numbersOfDates = document.querySelectorAll('.header__week-block_daydate');
export var arrDaysOfWeek = [];
export var generateArrDaysOfWeek = function generateArrDaysOfWeek() {
  var currentFullDate = new Date(); //full day

  var currentDate = currentFullDate.getDate(); //date

  var currentDayOfWeek = currentFullDate.getDay(); //day num

  var countToDown = 0;
  var countToUp = 0;

  _toConsumableArray(numbersOfDates).forEach(function (element, index) {
    if (index < currentDayOfWeek) {
      countToDown++;
    } else if (index > currentDayOfWeek) {
      countToUp++;
    }

    if (currentDayOfWeek === index) {
      element.innerHTML = currentDate;
      var tempElem = element.closest('.header__week-block_days');
      tempElem.classList.add('today__header__week-block_days');
    }
  });

  countToDown = countToDown * 24 * 60 * 60 * 1000;
  countToUp = countToUp * 24 * 60 * 60 * 1000;
  var milliSeconds = 0;

  for (var i = 0; i < 7; i++) {
    arrDaysOfWeek[i] = new Date(Date.now() - countToDown + milliSeconds);
    milliSeconds += 86400000;
  }

  return arrDaysOfWeek;
};
generateArrDaysOfWeek();
export var renderCurrentWeek = function renderCurrentWeek(arraydays) {
  var currentFullDate = new Date();
  var currentDayOfWeek = currentFullDate.getDay();
  var tempBefore = new Date(arraydays[0]);
  var tempAfter = new Date(currentFullDate);
  tempAfter.setDate(tempAfter.getDate() + 1);

  for (var i = 0; i < _toConsumableArray(numbersOfDates).length; i++) {
    if (i < currentDayOfWeek) {
      numbersOfDates[i].innerHTML = tempBefore.getDate();
      tempBefore.setDate(tempBefore.getDate() + 1);
    }

    if (i > currentDayOfWeek) {
      numbersOfDates[i].innerHTML = tempAfter.getDate();
      tempAfter.setDate(tempAfter.getDate() + 1);
    }
  }
};
renderCurrentWeek(arrDaysOfWeek);