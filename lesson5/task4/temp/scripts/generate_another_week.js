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

import { arrDaysOfWeek } from './current_week.js';
import { generateArrDaysOfWeek } from './current_week.js';
import { renderCurrentWeek } from './current_week.js';
import { renderTitleDate } from './generate_title_date.js';
import { renderEventObject } from './generate_event_object.js';
import { renderRedLIne, intervalFunc } from './redline.js';
import { timerId } from './redline.js';
var numbersOfDates = document.querySelectorAll('.header__week-block_daydate');
export var counter = 0;
export var renderAnotherWeek = function renderAnotherWeek(event) {
  var certainArrow = event.target;
  var checkArrow = certainArrow.classList.contains('nav__arow_left') || certainArrow.classList.contains('nav__arow_right');
  if (!checkArrow) return;

  if (certainArrow.classList.contains('nav__arow_right')) {
    arrDaysOfWeek.forEach(function (element) {
      return element.setDate(element.getDate() + 7);
    });
    counter++;
  }

  if (certainArrow.classList.contains('nav__arow_left')) {
    arrDaysOfWeek.forEach(function (element) {
      return element.setDate(element.getDate() - 7);
    });
    counter--;
  }

  var temp = new Date(arrDaysOfWeek[0]);

  _toConsumableArray(numbersOfDates).forEach(function (elem) {
    var tempElem = elem.closest('.header__week-block_days');
    tempElem.classList.remove('today__header__week-block_days');
    elem.innerHTML = temp.getDate();
    temp.setDate(temp.getDate() + 1);
  });

  renderEventObject();
  renderTitleDate(arrDaysOfWeek[0], arrDaysOfWeek[6]);
  clearInterval(timerId);

  if (counter === 0) {
    var arr = generateArrDaysOfWeek();
    renderCurrentWeek(arr);
    renderRedLIne();
  }
};
var arrows = document.querySelector('.nav__arow');
arrows.addEventListener('click', renderAnotherWeek);
arrows.removeEventListener('click', renderRedLIne);
arrows.removeEventListener('click', intervalFunc);