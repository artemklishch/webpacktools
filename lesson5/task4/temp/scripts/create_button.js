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

import { onClickOnPlaceInField } from './event_on_click.js';
import { onClickValidate, onMakeObjectFromValuesInForm } from './validate.js';
var createButton = document.querySelector('.nav__button');
var popupBlock = document.querySelector('.popup-layer');
var fieldOfDays = document.querySelector('.main__sidebar_days');
export var onCreateButton = function onCreateButton() {
  var startHour = new Date().getHours();
  var endHour = startHour + 1;
  document.querySelector('.startTime_place').value = [startHour, '00'].join(':');
  document.querySelector('.endTime_place').value = [endHour, '00'].join(':');
  popupBlock.style.display = 'block';
  var myDate = document.querySelectorAll('.specialDate');

  _toConsumableArray(myDate).forEach(function (elem) {
    return elem.value = new Date().toISOString().substr(0, 10);
  });

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
createButton.addEventListener('click', onCreateButton);