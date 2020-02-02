import './header.scss';

const numbersOfDates = document.querySelectorAll('.header__week-block_daydate');
export const arrDaysOfWeek = [];

export const generateArrDaysOfWeek = () => {
  const currentFullDate = new Date();// full day
  const currentDate = currentFullDate.getDate();// date
  const currentDayOfWeek = currentFullDate.getDay();// day num
  let countToDown = 0;
  let countToUp = 0;//eslint-disable-line
  [...numbersOfDates]
    .forEach((element, index) => {
      if (index < currentDayOfWeek) {
        countToDown += 1;
      } else if (index > currentDayOfWeek) {
        countToUp += 1;
      }
      if (currentDayOfWeek === index) {
        element.innerHTML = currentDate;
        const tempElem = element.closest('.header__week-block_days');
        tempElem.classList.add('today__header__week-block_days');
      }
    });

  countToDown = countToDown * 24 * 60 * 60 * 1000;
  countToUp = countToUp * 24 * 60 * 60 * 1000;

  let milliSeconds = 0;
  for (let i = 0; i < 7; i += 1) {
    arrDaysOfWeek[i] = new Date(Date.now() - countToDown + milliSeconds);
    milliSeconds += 86400000;
  }
  return arrDaysOfWeek;
};
generateArrDaysOfWeek();


export const renderCurrentWeek = (arraydays) => {
  const currentFullDate = new Date();
  const currentDayOfWeek = currentFullDate.getDay();
  const tempBefore = new Date(arraydays[0]);
  const tempAfter = new Date(currentFullDate);
  tempAfter.setDate(tempAfter.getDate() + 1);
  for (let i = 0; i < [...numbersOfDates].length; i += 1) {
    if (i < currentDayOfWeek) {
      numbersOfDates[i].innerHTML = tempBefore.getDate();
      tempBefore.setDate(tempBefore.getDate() + 1);
    }
    if (i > currentDayOfWeek) {
      numbersOfDates[i].innerHTML = tempAfter.getDate();
      tempAfter.setDate(tempAfter.getDate() + 1);
    }
  }
};
renderCurrentWeek(arrDaysOfWeek);
