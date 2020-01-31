import "core-js/modules/es.array.find";
import "core-js/modules/es.object.assign";
import { renderListItems } from './renderer.js';
import { setItem, getItem } from './storage.js';
import { updateTask, getTasksList } from './tasksGateway.js';
var listElem = document.querySelector('.list');
export var onChangeFunc = function onChangeFunc(event) {
  var isCheckbox = event.target.classList.contains('list__item-checkbox');

  if (!isCheckbox) {
    return;
  }

  var arrayOfTasks = getItem('arrayOfTasks');
  var taskId = event.target.parentNode.id;
  var taskData = arrayOfTasks.find(function (task) {
    return task.id === taskId;
  });
  Object.assign(taskData, {
    done: event.target.checked
  });

  if (taskData.done === true) {
    taskData.completedDate = new Date();
  }

  if (taskData.done === false) {
    taskData.createdDate = new Date();
    taskData.completedDate = null;
  }

  updateTask(taskId, taskData).then(function () {
    return getTasksList();
  }).then(function (arrayOfTasks) {
    setItem('arrayOfTasks', arrayOfTasks);
    renderListItems();
  });
};
listElem.addEventListener('change', onChangeFunc); // 1. Prepare data
// 2. Write new data in bd
// 3. Read new data from server
// 4. Save new data to front-end storage
// 5. Update UI based on new data