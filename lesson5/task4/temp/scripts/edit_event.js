import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.for-each";
import "core-js/modules/web.dom-collections.for-each";
import { setItem, getItem } from './storage.js';
import { onCheckLateEffortOfDeleteOrEdite } from './validate.js';
import { getEventList, createEvent, updatEvent, deleteEvent } from './eventsGateway.js';
var fieldOfDays = document.querySelector('.main__sidebar_days');
var popupBlock = document.querySelector('.popup-layer');
var iconDelete = document.querySelector('.event__btn-delete');
export var markOnFactOfEdit = 0;
export var dataId = '';
export var funcForMakeMarkValuableNull = function funcForMakeMarkValuableNull() {
  markOnFactOfEdit = 0;
};
export var funcForMakeDataIdEmpty = function funcForMakeDataIdEmpty() {
  dataId = '';
};
export var funcForEditEvent = function funcForEditEvent(event) {
  var blockOfEvent = event.target;
  if (!blockOfEvent.classList.contains('main__sidebar_day_object')) return;
  popupBlock.style.display = 'block';
  iconDelete.style.display = 'block';
  dataId = blockOfEvent.dataset.id;
  getEventList().then(function (array) {
    var arr = [];
    array.forEach(function (elem) {
      elem.startTime = new Date(elem.startTime);
      elem.endTime = new Date(elem.endTime);
      arr.push(elem);
    });
    return arr;
  }).then(function (eventsArray) {
    var currentObject = eventsArray.find(function (elem) {
      return elem.id === dataId;
    });
    var title = document.querySelector('.event__name');
    currentObject.header !== null ? title.value = currentObject.header : title.value = '';
    var description = document.querySelector('.multiline__text');
    currentObject.description !== null ? description.value = currentObject.description : description.value = '';
    var startDateInput = document.querySelector('.event__date-start');
    var startYear = currentObject.startTime.getFullYear();
    var startMonth = currentObject.startTime.getMonth();
    var startDate = currentObject.startTime.getDate();
    var startDateObject = new Date(Date.UTC(startYear, startMonth, startDate));
    startDateInput.value = new Date(startDateObject).toISOString().substr(0, 10);
    var endDateInput = document.querySelector('.event__date-end');
    var endYear = currentObject.endTime.getFullYear();
    var endMonth = currentObject.endTime.getMonth();
    var endDate = currentObject.endTime.getDate();
    var endDateObject = new Date(Date.UTC(endYear, endMonth, endDate));
    endDateInput.value = new Date(endDateObject).toISOString().substr(0, 10);
    var startTimePlace = document.querySelector('.startTime_place');
    var startHour = new Date(currentObject.startTime).getHours();
    startHour < 10 ? startHour = "0".concat(startHour) : startHour;
    var startMin = new Date(currentObject.startTime).getMinutes();
    startMin < 10 ? startMin = "0".concat(startMin) : startMin;
    startTimePlace.value = "".concat(startHour, ":").concat(startMin);
    var endTimePlace = document.querySelector('.endTime_place');
    var endHour = new Date(currentObject.endTime).getHours();
    endHour < 10 ? endHour = "0".concat(endHour) : endHour;
    var endMin = new Date(currentObject.endTime).getMinutes();
    endMin < 10 ? endMin = "0".concat(endMin) : endMin;
    endTimePlace.value = "".concat(endHour, ":").concat(endMin);
    var colorPicerInput = document.querySelector('.pick_color');
    colorPicerInput.value = currentObject.backgroundColor;
    onCheckLateEffortOfDeleteOrEdite(currentObject);
    markOnFactOfEdit = 1;
    return currentObject;
  });
};
fieldOfDays.addEventListener('click', funcForEditEvent);