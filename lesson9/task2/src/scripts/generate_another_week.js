import {
  arrDaysOfWeek,
  generateArrDaysOfWeek,
  renderCurrentWeek,
} from './current_week';
import { renderTitleDate } from './generate_title_date';
import { renderEventObject } from './generate_event_object';
import { renderRedLIne, intervalFunc, timerId } from './redline';


const numbersOfDates = document.querySelectorAll('.header__week-block_daydate');
export let counter = 0;//eslint-disable-line

export const renderAnotherWeek = (event) => {
  const certainArrow = event.target;
  const checkArrow = certainArrow.classList.contains('nav__arow_left')
        || certainArrow.classList.contains('nav__arow_right');
  if (!checkArrow) return;

  if (certainArrow.classList.contains('nav__arow_right')) {
    arrDaysOfWeek
      .forEach((element) => element.setDate(element.getDate() + 7));
    counter += 1;
  }
  if (certainArrow.classList.contains('nav__arow_left')) {
    arrDaysOfWeek
      .forEach((element) => element.setDate(element.getDate() - 7));
    counter -= 1;
  }
  const temp = new Date(arrDaysOfWeek[0]);
  [...numbersOfDates]
    .forEach((elem) => {
      const tempElem = elem.closest('.header__week-block_days');
      tempElem.classList.remove('today__header__week-block_days');
      elem.innerHTML = temp.getDate();
      temp.setDate(temp.getDate() + 1);
    });
  renderEventObject();
  renderTitleDate(arrDaysOfWeek[0], arrDaysOfWeek[6]);
  clearInterval(timerId);
  if (counter === 0) {
    const arr = generateArrDaysOfWeek();
    renderCurrentWeek(arr);
    renderRedLIne();
  }
};

const arrows = document.querySelector('.nav__arow');
arrows.addEventListener('click', renderAnotherWeek);
arrows.removeEventListener('click', renderRedLIne);
arrows.removeEventListener('click', intervalFunc);
