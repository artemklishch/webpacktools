const baseUrl = 'https://crudcrud.com/api/6a0e49f6b9e84ad4986bb6fb9c99be78/eventsArray';

const mapEvents = (tasks) => tasks.map(({ _id, ...rest }) => ({ ...rest, id: _id }));

export const getEventList = () => fetch(baseUrl)
  .then((response) => response.json())
  .then((tasks) => mapEvents(tasks));

export const createEvent = (object) => fetch(baseUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(object),
});

export const updatEvent = (eventId, updatedEventData) => fetch(`${baseUrl}/${eventId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(updatedEventData),
});


export const deleteEvent = (taskId) => fetch(`${baseUrl}/${taskId}`, {
  method: 'DELETE',
});
