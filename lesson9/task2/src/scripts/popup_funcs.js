import { setItem } from './storage';
import { renderEventObject } from './generate_event_object';
import { counter } from './generate_another_week';
import { onClickOnPlaceInField } from './event_on_click';
import { renderRedLIne } from './redline';
import { onClearValidateMessages, onMakeMarkOnValidateTextNull, markOnValidateText } from './validate';
import {
  markOnFactOfEdit,
  dataId,
  funcForMakeMarkValuableNull,
  funcForMakeDataIdEmpty,
} from './edit_event';
import { getEventList, createEvent, updatEvent } from './eventsGateway';
import './popup.scss';

const fieldOfDays = document.querySelector('.main__sidebar_days');
const popupBlock = document.querySelector('.popup-layer');
const iconDelete = document.querySelector('.event__btn-delete');


const lockWindow = document.querySelector('.popup__btn-close');
export const funcForLockWindow = () => {
  popupBlock.style.display = 'none';
  iconDelete.style.display = 'none';
  fieldOfDays.addEventListener('click', onClickOnPlaceInField);
  onClearValidateMessages();
  funcForMakeDataIdEmpty();
  onMakeMarkOnValidateTextNull();
  funcForMakeMarkValuableNull();
};
lockWindow.addEventListener('click', funcForLockWindow);


const form = document.querySelector('.popup');
export const onFormSubmit = (event) => {
  event.preventDefault();

  const tempObj = [...new FormData(form)]
    .reduce((acc, [field, value]) => ({ ...acc, [field]: value }), {});

  tempObj.startTime = tempObj.startTime.split('-');
  tempObj.startTime[1] -= 1;
  tempObj.startTimePlace = tempObj.startTimePlace.split(':');
  tempObj.startTime = tempObj.startTime.concat(tempObj.startTimePlace);
  tempObj.startTime = new Date(...tempObj.startTime);

  tempObj.endTime = tempObj.endTime.split('-');
  tempObj.endTime[1] -= 1;
  tempObj.endTimePlace = tempObj.endTimePlace.split(':');
  tempObj.endTime = tempObj.endTime.concat(tempObj.endTimePlace);
  tempObj.endTime = new Date(...tempObj.endTime);

  delete tempObj.startTimePlace;
  delete tempObj.endTimePlace;

  if (markOnValidateText === 1) return;

  if (markOnFactOfEdit === 0) {
    createEvent(tempObj)
      .then(() => getEventList())
      .then((eventsArray) => {
        setItem('eventsArray', eventsArray);
        renderEventObject();
        if (counter === 0) renderRedLIne();
      })
      .catch((err) => {
        err.message = 'Server calls limit is exceeded. Need to update server URL';
        alert(err);
      });
  } else if (markOnFactOfEdit === 1) {
    getEventList()
      .then((eventsArrayFromServer) => {
        const obj = eventsArrayFromServer.find((element) => element.id === dataId);
        Object.assign(obj, tempObj);
        updatEvent(obj.id, obj)
          .then(() => getEventList())
          .then((eventsArrayForUpdate) => {
            setItem('eventsArray', eventsArrayForUpdate);
            renderEventObject();
            funcForMakeMarkValuableNull();
            funcForMakeDataIdEmpty();
            if (counter === 0) renderRedLIne();
          })
          .catch((err) => {
            err.message = 'Server calls limit is exceeded. Need to update server URL';
            alert(err);
          });
      });
  }
  popupBlock.style.display = 'none';
  fieldOfDays.addEventListener('click', onClickOnPlaceInField);
};
form.addEventListener('submit', onFormSubmit);
