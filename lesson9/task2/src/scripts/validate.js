import { getItem } from './storage';
import { funcForDeleteEvene } from './delete_event';
import { dataId } from './edit_event';


const validateMessageElem = document.querySelector('.message_validation');
const deleteBasket = document.querySelector('.event__btn-delete');
export let markOnValidateText = 0;//eslint-disable-line

export const onMakeMarkOnValidateTextNull = () => {
  markOnValidateText = 0;
};

export const onClearValidateMessages = () => validateMessageElem.innerHTML = '';


const onCheckIntersectionEvents = (object) => {
  let errorText;
  const eventsArray = getItem('eventsArray') || [];
  eventsArray.map((elem) => {
    elem.startTime = new Date(elem.startTime);
    elem.endTime = new Date(elem.endTime);
    return elem;
  });
  const currentStartTime = object.startTime.getTime();
  const currentEndTime = object.endTime.getTime();
  for (let i = 0; i < eventsArray.length; i += 1) {
    if (eventsArray[i].id === object.id) continue;
    const elemStartTime = eventsArray[i].startTime.getTime();
    const elemEndTime = eventsArray[i].endTime.getTime();
    if ((currentStartTime < elemEndTime
            && currentStartTime < elemEndTime)
        && (currentEndTime > elemStartTime
            && currentEndTime > elemStartTime)
    ) {
      errorText = 'Error! Event can`t intersect';
    }
  }
  return errorText;
};


const onCheckCorrectDates = (object) => (object.endTime < object.startTime
  ? 'Error! End date can`t be ealier than start date'
  : undefined);


const onCheckEventLength = (object) => (object.endTime - object.startTime >= 21600000
  ? 'Error! Event can`t be more than 6 hours'
  : undefined);


const onCheckMinutes = (object) => ((object.startTime.getMinutes() !== 0 && object.startTime.getMinutes() % 15 !== 0)
    || (object.endTime.getMinutes() !== 0 && object.endTime.getMinutes() % 15 !== 0)
  ? 'Error! Minuts must be a multiple of fifteen'
  : undefined);


export const onMakeObjectFromValuesInForm = () => {
  const form = document.querySelector('.popup');
  const tempObj = [...new FormData(form)]
    .reduce((acc, [field, value]) => ({ ...acc, [field]: value }), {});

  const startDateHours = tempObj.startTimePlace.split(':')[0];
  const startDateMin = tempObj.startTimePlace.split(':')[1];
  tempObj.startTime = [...tempObj.startTime.split('-')];
  tempObj.startTime[1] -= 1;
  tempObj.startTime.push(startDateHours, startDateMin);
  tempObj.startTime = new Date(...tempObj.startTime);

  const endDateHours = tempObj.endTimePlace.split(':')[0];
  const endDateMin = tempObj.endTimePlace.split(':')[1];
  tempObj.endTime = [...tempObj.endTime.split('-')];
  tempObj.endTime[1] -= 1;
  tempObj.endTime.push(endDateHours, endDateMin);
  tempObj.endTime = new Date(...tempObj.endTime);

  tempObj.id = dataId || '';

  return tempObj;
};


const form = document.querySelector('.popup');
const arrOfValidateFuncs = [onCheckMinutes, onCheckEventLength,
  onCheckCorrectDates, onCheckIntersectionEvents];
export const onInputValidate = (event) => {
  if (!event.target.classList.contains('input')) return;
  const tempObj = onMakeObjectFromValuesInForm();
  const errorText = arrOfValidateFuncs
    .map((func) => func(tempObj))
    .filter((erroText) => erroText)
    .join(' ');
  validateMessageElem.textContent = errorText;
  if (validateMessageElem.textContent !== '') {
    markOnValidateText = 1;
  } else {
    markOnValidateText = 0;
  }
};
form.addEventListener('input', onInputValidate);


export const onCheckLateEffortOfDeleteOrEdite = (object) => {
  const timeToEvent = (object.startTime.valueOf() - Date.now()) / 1000 / 60;
  if (timeToEvent <= 15 && timeToEvent > 0) {
    validateMessageElem.innerHTML = 'You can`t change or delete event after 15 minutes to event';
    markOnValidateText = 1;
    deleteBasket.removeEventListener('click', funcForDeleteEvene);
  } else {
    validateMessageElem.innerHTML = '';
    markOnValidateText = 0;
    deleteBasket.addEventListener('click', funcForDeleteEvene);
  }
};


export const onClickValidate = (object) => {
  const errorText = arrOfValidateFuncs
    .map((func) => func(object))
    .filter((erroText) => erroText)
    .join(' ');
  validateMessageElem.textContent = errorText;
  if (validateMessageElem.textContent !== '') {
    markOnValidateText = 1;
  } else {
    markOnValidateText = 0;
  }
};
