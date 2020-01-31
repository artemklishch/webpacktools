import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.assign";
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
import { renderEventObject } from './generate_event_object.js';
import { counter } from './generate_another_week.js';
import { onClickOnPlaceInField } from './event_on_click.js';
import { renderRedLIne } from './redline.js';
import { onClearValidateMessages, onMakeMarkOnValidateTextNull } from './validate.js';
import { markOnValidateText } from './validate.js';
import { markOnFactOfEdit, dataId } from './edit_event.js';
import { funcForMakeMarkValuableNull, funcForMakeDataIdEmpty } from './edit_event.js';
import { getEventList, createEvent, updatEvent } from './eventsGateway.js';
var fieldOfDays = document.querySelector('.main__sidebar_days');
var popupBlock = document.querySelector('.popup-layer');
var iconDelete = document.querySelector('.event__btn-delete');
var lockWindow = document.querySelector('.popup__btn-close');
export var funcForLockWindow = function funcForLockWindow() {
  popupBlock.style.display = 'none';
  iconDelete.style.display = 'none';
  fieldOfDays.addEventListener('click', onClickOnPlaceInField);
  onClearValidateMessages();
  funcForMakeDataIdEmpty();
  onMakeMarkOnValidateTextNull();
  funcForMakeMarkValuableNull();
};
lockWindow.addEventListener('click', funcForLockWindow);
var form = document.querySelector('.popup');
export var onFormSubmit = function onFormSubmit(event) {
  event.preventDefault();

  var tempObj = _toConsumableArray(new FormData(form)).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        field = _ref2[0],
        value = _ref2[1];

    return _objectSpread({}, acc, _defineProperty({}, field, value));
  }, {});

  tempObj.startTime = tempObj.startTime.split('-');
  tempObj.startTime[1] = tempObj.startTime[1] - 1;
  tempObj.startTimePlace = tempObj.startTimePlace.split(':'); //tempObj.startTime = [...tempObj.startTime, ...tempObj.startTimePlace]; //this expression makes the same as next expression that is down

  tempObj.startTime = tempObj.startTime.concat(tempObj.startTimePlace);
  tempObj.startTime = _construct(Date, _toConsumableArray(tempObj.startTime));
  tempObj.endTime = tempObj.endTime.split('-');
  tempObj.endTime[1] = tempObj.endTime[1] - 1;
  tempObj.endTimePlace = tempObj.endTimePlace.split(':'); //tempObj.endTime = [...tempObj.endTime, ...tempObj.endTimePlace]; //this expression makes the same as next expression that is down

  tempObj.endTime = tempObj.endTime.concat(tempObj.endTimePlace);
  tempObj.endTime = _construct(Date, _toConsumableArray(tempObj.endTime));
  delete tempObj.startTimePlace;
  delete tempObj.endTimePlace;
  if (markOnValidateText === 1) return;

  if (markOnFactOfEdit === 0) {
    createEvent(tempObj).then(function () {
      return getEventList();
    }).then(function (eventsArray) {
      setItem('eventsArray', eventsArray);
      renderEventObject();
      if (counter === 0) renderRedLIne();
    }).catch(function (err) {
      err.message = 'Server calls limit is exceeded. Need to update server URL';
      alert(err);
    });
  } else if (markOnFactOfEdit === 1) {
    getEventList().then(function (eventsArray) {
      var obj = eventsArray.find(function (element) {
        return element.id === dataId;
      });
      Object.assign(obj, tempObj);
      updatEvent(obj.id, obj).then(function () {
        return getEventList();
      }).then(function (eventsArray) {
        setItem('eventsArray', eventsArray);
        renderEventObject();
        funcForMakeMarkValuableNull();
        funcForMakeDataIdEmpty();
        if (counter === 0) renderRedLIne();
      }).catch(function (err) {
        err.message = 'Server calls limit is exceeded. Need to update server URL';
        alert(err);
      });
    });
  }

  popupBlock.style.display = 'none';
  fieldOfDays.addEventListener('click', onClickOnPlaceInField);
};
form.addEventListener('submit', onFormSubmit);