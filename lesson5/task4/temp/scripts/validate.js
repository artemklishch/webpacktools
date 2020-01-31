import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.get-own-property-descriptors";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.set-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { setItem, getItem } from './storage.js';
import { funcForDeleteEvene } from './delete_event.js';
import { dataId, markOnFactOfEdit } from './edit_event.js';
var validateMessageElem = document.querySelector('.message_validation');
var deleteBasket = document.querySelector('.event__btn-delete');
export var markOnValidateText = 0;
export var onMakeMarkOnValidateTextNull = function onMakeMarkOnValidateTextNull() {
  markOnValidateText = 0;
};
export var onClearValidateMessages = function onClearValidateMessages() {
  return validateMessageElem.innerHTML = '';
};

var onCheckIntersectionEvents = function onCheckIntersectionEvents(object) {
  var errorText = undefined;
  var eventsArray = getItem('eventsArray') || [];
  eventsArray.map(function (elem) {
    elem.startTime = new Date(elem.startTime);
    elem.endTime = new Date(elem.endTime);
  });
  var currentStartTime = object.startTime.getTime();
  var currentEndTime = object.endTime.getTime();

  for (var i = 0; i < eventsArray.length; i++) {
    if (eventsArray[i].id === object.id) continue;
    var elemStartTime = eventsArray[i].startTime.getTime();
    var elemEndTime = eventsArray[i].endTime.getTime();

    if (currentStartTime < elemEndTime && currentStartTime < elemEndTime && currentEndTime > elemStartTime && currentEndTime > elemStartTime) {
      errorText = 'Error! Event can`t intersect';
    }
  }

  ;
  return errorText;
};

var onCheckCorrectDates = function onCheckCorrectDates(object) {
  return object.endTime < object.startTime ? 'Error! End date can`t be ealier than start date' : undefined;
};

var onCheckEventLength = function onCheckEventLength(object) {
  return 21600000 <= object.endTime - object.startTime ? 'Error! Event can`t be more than 6 hours' : undefined;
};

var onCheckMinutes = function onCheckMinutes(object) {
  return object.startTime.getMinutes() !== 0 && object.startTime.getMinutes() % 15 !== 0 || object.endTime.getMinutes() !== 0 && object.endTime.getMinutes() % 15 !== 0 ? 'Error! Minuts must be a multiple of fifteen' : undefined;
};

export var onMakeObjectFromValuesInForm = function onMakeObjectFromValuesInForm() {
  var form = document.querySelector('.popup');

  var tempObj = _toConsumableArray(new FormData(form)).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        field = _ref2[0],
        value = _ref2[1];

    return _objectSpread({}, acc, _defineProperty({}, field, value));
  }, {});

  var startDate_hours = tempObj.startTimePlace.split(':')[0];
  var startDate_min = tempObj.startTimePlace.split(':')[1];
  tempObj.startTime = _toConsumableArray(tempObj.startTime.split('-'));
  tempObj.startTime[1] = tempObj.startTime[1] - 1;
  tempObj.startTime.push(startDate_hours, startDate_min);
  tempObj.startTime = _construct(Date, _toConsumableArray(tempObj.startTime));
  var endDate_hours = tempObj.endTimePlace.split(':')[0];
  var endDate_min = tempObj.endTimePlace.split(':')[1];
  tempObj.endTime = _toConsumableArray(tempObj.endTime.split('-'));
  tempObj.endTime[1] = tempObj.endTime[1] - 1;
  tempObj.endTime.push(endDate_hours, endDate_min);
  tempObj.endTime = _construct(Date, _toConsumableArray(tempObj.endTime));
  tempObj.id = dataId || '';
  return tempObj;
};
var form = document.querySelector('.popup');
var arrOfValidateFuncs = [onCheckMinutes, onCheckEventLength, onCheckCorrectDates, onCheckIntersectionEvents];
export var onInputValidate = function onInputValidate(event) {
  if (!event.target.classList.contains('input')) return;
  var tempObj = onMakeObjectFromValuesInForm();
  var errorText = arrOfValidateFuncs.map(function (func) {
    return func(tempObj);
  }).filter(function (erroText) {
    return erroText;
  }).join(' ');
  validateMessageElem.textContent = errorText;

  if (validateMessageElem.textContent !== '') {
    markOnValidateText = 1;
  } else {
    markOnValidateText = 0;
  }
};
form.addEventListener('input', onInputValidate);
export var onCheckLateEffortOfDeleteOrEdite = function onCheckLateEffortOfDeleteOrEdite(object) {
  var timeToEvent = (object.startTime.valueOf() - Date.now()) / 1000 / 60;

  if (timeToEvent <= 15 && timeToEvent > 0) {
    validateMessageElem.innerHTML = 'You can`t change or delete event after 15 minutes to event';
    markOnValidateText = 1;
    deleteBasket.removeEventListener('click', funcForDeleteEvene);
  } else {
    validateMessageElem.innerHTML = '';
    markOnValidateText = 0;
    deleteBasket.addEventListener('click', funcForDeleteEvene);
  }

  ;
};
export var onClickValidate = function onClickValidate(object) {
  var errorText = arrOfValidateFuncs.map(function (func) {
    return func(object);
  }).filter(function (erroText) {
    return erroText;
  }).join(' ');
  validateMessageElem.textContent = errorText;

  if (validateMessageElem.textContent !== '') {
    markOnValidateText = 1;
  } else {
    markOnValidateText = 0;
  }
};