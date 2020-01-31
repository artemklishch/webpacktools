import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { getItem } from './storage.js';
var listElem = document.querySelector('.list');
export var renderListItems = function renderListItems() {
  listElem.innerHTML = '';
  var arrayOfTasks = getItem('arrayOfTasks') || [];
  var listItemsElems = arrayOfTasks.sort(function (a, b) {
    return a.done - b.done;
  }).map(function (_ref) {
    var text = _ref.text,
        done = _ref.done,
        id = _ref.id;
    var listItemElem = document.createElement('li');
    listItemElem.classList.add('list__item');
    listItemElem.setAttribute('id', id);
    var textElem = document.createElement('span');
    textElem.textContent = text;

    if (done) {
      listItemElem.classList.add('list__item_done');
      textElem.classList.add('list__item-text');
    }

    if (!done) {
      textElem.classList.remove('list__item-text');
    }

    var checkboxElem = document.createElement('input');
    checkboxElem.setAttribute('type', 'checkbox');
    checkboxElem.checked = done;
    checkboxElem.classList.add('list__item-checkbox');
    var deleteBtnElem = document.createElement('button');
    deleteBtnElem.classList.add('delete-btn');
    listItemElem.append(checkboxElem, textElem, deleteBtnElem);
    return listItemElem;
  });
  var tempNoDoneList = listItemsElems.filter(function (elem) {
    return !elem.classList.contains('list__item_done');
  }).sort(function (a, b) {
    return b.createdDate > a.createdDate ? 1 : -1;
  });
  var tempDoneList = listItemsElems.filter(function (elem) {
    return elem.classList.contains('list__item_done');
  });
  listElem.append.apply(listElem, _toConsumableArray(tempNoDoneList));
  listElem.append.apply(listElem, _toConsumableArray(tempDoneList));
};