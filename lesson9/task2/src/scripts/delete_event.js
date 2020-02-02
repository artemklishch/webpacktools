import {
  funcForMakeMarkValuableNull,
  funcForMakeDataIdEmpty,
  dataId,
} from './edit_event';
import { setItem, getItem } from './storage';
import { renderEventObject } from './generate_event_object';
import { renderRedLIne } from './redline';
import { onClearValidateMessages, onMakeMarkOnValidateTextNull } from './validate';
import { getEventList, deleteEvent } from './eventsGateway';

const deleteBasket = document.querySelector('.event__btn-delete');
const popupBlock = document.querySelector('.popup-layer');

export const funcForDeleteEvene = () => {
  const eventsArray = getItem('eventsArray') || [];
  const currentObject = eventsArray.find((elem) => elem.id === dataId);
  deleteEvent(currentObject.id)
    .then(() => getEventList())
    .then((eventsArrayForDelete) => {
      setItem('eventsArray', eventsArrayForDelete);
      renderEventObject();
      funcForMakeMarkValuableNull();
      funcForMakeDataIdEmpty();
      renderRedLIne();
      onClearValidateMessages();
      onMakeMarkOnValidateTextNull();
    })
    .catch((err) => {
      err.message = 'Server calls limit is exceeded. Need to update server URL';
      alert(err);
    });
  popupBlock.style.display = 'none';
  deleteBasket.style.display = 'none';
};
deleteBasket.addEventListener('click', funcForDeleteEvene);
