import { renderListItems } from './renderer.js';
import { addItem } from './additem.js';
import { onChangeFunc } from './onchangefunc.js';
import { getTasksList } from './tasksGateway.js';
import { setItem } from './storage.js';
import { onDeleteBtn } from './delete.js';
document.addEventListener('DOMContentLoaded', function () {
  getTasksList().then(function (arrayOfTasks) {
    setItem('arrayOfTasks', arrayOfTasks);
    renderListItems();
  });
});

var onStorageChange = function onStorageChange(e) {
  if (e.key === 'arrayOfTasks') renderListItems();
};

window.addEventListener('storage', onStorageChange); // 1. Get data from server 
// 2. Save data to front-ene storage
// 3.