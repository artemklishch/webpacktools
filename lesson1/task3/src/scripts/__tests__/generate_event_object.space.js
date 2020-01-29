import { transformHourFormat } from '../generate_event_object';
import { renderTitleDate } from '../generate_title_date';

it ('should get tranformed hour', () => {
    const result = transformHourFormat(22);
    expect(result).toEqual(10);
});

it ('should get correct title of date', () => {
    expect(title).toEqual();
});