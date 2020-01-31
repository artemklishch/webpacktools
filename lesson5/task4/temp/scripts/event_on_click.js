import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.join";
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
import { onClickValidate, onMakeObjectFromValuesInForm } from './validate.js';
var fieldOfDays = document.querySelector('.main__sidebar_days');
var popupBlock = document.querySelector('.popup-layer');
var saveBtn = document.querySelector('.event__btn-save');
export var onClickOnPlaceInField = function onClickOnPlaceInField(event) {
  var clickedHour = event.target;
  if (!clickedHour.classList.contains('main__sidebar_days_hours')) return;
  var hourNumber = +clickedHour.dataset.hourNumber;
  var dayNumber = clickedHour.closest('.main__sidebar_days_line').dataset.dayNumber;
  var currentYear = arrDaysOfWeek[dayNumber].getFullYear();
  var currentMonth = arrDaysOfWeek[dayNumber].getMonth();
  var currentDate = arrDaysOfWeek[dayNumber].getDate();
  var startTime = new Date(Date.UTC(currentYear, currentMonth, currentDate, hourNumber));
  popupBlock.style.display = 'block';
  saveBtn.style.display = 'block';
  var myDate = document.querySelectorAll('.specialDate');

  _toConsumableArray(myDate).forEach(function (elem) {
    return elem.value = new Date(startTime).toISOString().substr(0, 10);
  });

  var startHour = new Date(currentYear, currentMonth, currentDate, hourNumber).getHours();
  var endHour = startHour + 1;
  var startTimePlace = document.querySelector('.startTime_place');
  startHour < 10 ? startTimePlace.value = ["0".concat(startHour), '00'].join(':') : startTimePlace.value = ["".concat(startHour), '00'].join(':');
  var endTimePlace = document.querySelector('.endTime_place');
  endHour < 10 ? endTimePlace.value = ["0".concat(endHour), '00'].join(':') : endTimePlace.value = ["".concat(endHour), '00'].join(':');

  if (startHour === 23) {
    _toConsumableArray(myDate)[1].value = new Date(startTime.setDate(startTime.getDate() + 1)).toISOString().substr(0, 10);
    endTimePlace.value = ["00", '00'].join(':');
  }

  var headerInput = document.querySelector('.event__name');
  headerInput.value = '';
  var descriptionInput = document.querySelector('.multiline__text');
  descriptionInput.value = '';
  var defaultBackgroundColor = document.querySelector('.pick_color');
  defaultBackgroundColor.value = '#0851f6';
  fieldOfDays.removeEventListener('click', onClickOnPlaceInField);
  var tempObj = onMakeObjectFromValuesInForm();
  onClickValidate(tempObj);
};
fieldOfDays.addEventListener('click', onClickOnPlaceInField);