import { renderTimingSidebar } from './scripts/sidebar_timing';//eslint-disable-line
import { generateDaysPlace } from './scripts/sidebar_days';//eslint-disable-line
import { renderCurrentWeek } from './scripts/current_week';//eslint-disable-line
import { renderAnotherWeek } from './scripts/generate_another_week';//eslint-disable-line
import { renderTitleDate } from './scripts/generate_title_date';//eslint-disable-line
import { todayButtonFunc } from './scripts/today_button';//eslint-disable-line
import { renderRedLIne } from './scripts/redline';
import { renderEventObject } from './scripts/generate_event_object';
import { onCreateButton } from './scripts/create_button';//eslint-disable-line
import { onFormSubmit } from './scripts/popup_funcs';//eslint-disable-line
import { onClickOnPlaceInField } from './scripts/event_on_click';//eslint-disable-line
import { funcForEditEvent } from './scripts/edit_event';//eslint-disable-line
import { funcForDeleteEvene } from './scripts/delete_event';//eslint-disable-line
import { onInputValidate } from './scripts/validate';//eslint-disable-line
import {
  getEventList,
  createEvent,
  updatEvent,
  deleteEvent,
} from './scripts/eventsGateway';//eslint-disable-line
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  renderEventObject();
  renderRedLIne();
});

const onStorageChange = (e) => {
  if (e.key === 'eventsArray') renderEventObject();
};
window.addEventListener('storage', onStorageChange);
