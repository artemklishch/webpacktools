import "core-js/modules/es.array.find";
import { funcForMakeMarkValuableNull, funcForMakeDataIdEmpty } from './edit_event.js';
import { dataId } from './edit_event.js';
import { setItem, getItem } from './storage.js';
import { renderEventObject } from './generate_event_object.js';
import { renderRedLIne } from './redline.js';
import { onClearValidateMessages, onMakeMarkOnValidateTextNull } from './validate.js';
import { getEventList, deleteEvent } from './eventsGateway.js';
var deleteBasket = document.querySelector('.event__btn-delete');
var popupBlock = document.querySelector('.popup-layer');
export var funcForDeleteEvene = function funcForDeleteEvene() {
  var eventsArray = getItem('eventsArray') || [];
  var currentObject = eventsArray.find(function (elem) {
    return elem.id === dataId;
  });
  deleteEvent(currentObject.id).then(function () {
    return getEventList();
  }).then(function (eventsArray) {
    setItem('eventsArray', eventsArray);
    renderEventObject();
    funcForMakeMarkValuableNull();
    funcForMakeDataIdEmpty();
    renderRedLIne();
    onClearValidateMessages();
    onMakeMarkOnValidateTextNull();
  }).catch(function (err) {
    err.message = 'Server calls limit is exceeded. Need to update server URL';
    alert(err);
  });
  popupBlock.style.display = 'none';
  deleteBasket.style.display = 'none';
};
deleteBasket.addEventListener('click', funcForDeleteEvene);