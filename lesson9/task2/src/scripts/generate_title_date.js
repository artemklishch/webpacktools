import { arrDaysOfWeek } from './current_week';


export const renderTitleDate = (startdate, enddate) => {
  const placeForDateTitle = document.querySelector('.nav__dateMonEar-today');
  const firstDayOfWeek = new Date(startdate);
  const firstDayMonth = firstDayOfWeek.toDateString().split(' ')[1];
  const firstDayYear = firstDayOfWeek.getFullYear();

  const lastDayOfWeek = new Date(enddate);
  const lastDayMonth = lastDayOfWeek.toDateString().split(' ')[1];
  const lastDayYear = lastDayOfWeek.getFullYear();

  if (firstDayMonth === lastDayMonth && firstDayYear === lastDayYear) {
    placeForDateTitle.innerHTML = `${firstDayMonth} ${firstDayYear}`;
  }
  if (firstDayMonth !== lastDayMonth && firstDayYear === lastDayYear) {
    placeForDateTitle.innerHTML = `${firstDayMonth} - ${lastDayMonth.toLocaleLowerCase()} ${firstDayYear}`;
  }
  if (firstDayMonth !== lastDayMonth && firstDayYear !== lastDayYear) {
    placeForDateTitle.innerHTML = `${firstDayMonth} ${firstDayYear} - ${lastDayMonth} ${lastDayYear}`;
  }
};

renderTitleDate(arrDaysOfWeek[0], arrDaysOfWeek[6]);
