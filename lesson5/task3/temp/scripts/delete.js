import { deleteTask, getTasksList } from './tasksGateway.js';
import { setItem } from './storage.js';
import { renderListItems } from './renderer.js';
var listElem = document.querySelector('.list');
export var onDeleteBtn = function onDeleteBtn(event) {
  var isDeleteBtn = event.target.classList.contains('delete-btn');

  if (!isDeleteBtn) {
    return;
  }

  var taskId = event.target.parentNode.id;
  deleteTask(taskId).then(function () {
    return getTasksList();
  }).then(function (arrayOfTasks) {
    setItem('arrayOfTasks', arrayOfTasks);
    renderListItems();
  });
};
listElem.addEventListener('click', onDeleteBtn);