import { renderTimingSidebar } from './scripts/sidebar_timing.js';
import { generateDaysPlace } from './scripts/sidebar_days.js';
import { renderCurrentWeek } from './scripts/current_week.js';
import { renderAnotherWeek } from './scripts/generate_another_week.js';
import { renderTitleDate } from './scripts/generate_title_date.js';
import { todayButtonFunc } from './scripts/today_button.js';
import { renderRedLIne } from './scripts/redline.js';
import { renderEventObject } from './scripts/generate_event_object.js';
import { onCreateButton } from './scripts/create_button.js';
import { onFormSubmit } from './scripts/popup_funcs.js';
import { onClickOnPlaceInField } from './scripts/event_on_click.js';
import { funcForEditEvent } from './scripts/edit_event.js';
import { funcForDeleteEvene } from './scripts/delete_event.js';
import { onInputValidate } from './scripts/validate.js';
import { getEventList, createEvent, updatEvent, deleteEvent } from './scripts/eventsGateway.js'

import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
    renderEventObject();
    renderRedLIne();
});

const onStorageChange = e => {
    if (e.key === 'eventsArray') renderEventObject();
};
window.addEventListener('storage', onStorageChange);