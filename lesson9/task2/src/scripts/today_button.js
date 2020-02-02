import { generateArrDaysOfWeek, arrDaysOfWeek, renderCurrentWeek } from './current_week';
import { renderTitleDate } from './generate_title_date';
import { renderEventObject } from './generate_event_object';
import { renderRedLIne } from './redline';

const todayButton = document.querySelector('.nav_day');

export const todayButtonFunc = () => {
  const arr = generateArrDaysOfWeek();
  renderCurrentWeek(arr);
  renderEventObject();
  renderRedLIne();
  renderTitleDate(arrDaysOfWeek[0], arrDaysOfWeek[6]);
};
todayButton.addEventListener('click', todayButtonFunc);
