/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */

import { setKey, getKeys } from '../Models/local_storage';
import it from '../helpers/main_module';
import * as reload from './reload';
import { getCategories as categories, getPastTasks as pastTasks, getUpcomingTasks as upcomingTasks } from '../helpers/render_object';

const idSelector = id => document.getElementById(id);

const getValue = id => idSelector(id).value;

const addCategory = () => {
  const value = getValue('newCategoryKey');
  const notif = idSelector('newCategoryKeyNotif');
  reload.isEmpty(value) ? (() => {
    notif.innerText = 'Empty Key is not allowed';
  })() : (() => {
    setKey(value);
    reload.reloadCategories(categories());
    notif.innerText = `${value} is added to the categories`;
  })();
};

const addEventToCategoryModal = () => {
  const addEventToCategoryButtonInModal = idSelector('addCategoryButton');
  addEventToCategoryButtonInModal.setAttribute('click-event', 'true');
  addEventToCategoryButtonInModal.onclick = addCategory;
};

const addTask = () => {
  const newtaskObject = {
    category: getValue('taskCategories'),
    data: {
      title: getValue('newTaskTitle'),
      description: getValue('newTaskDesc'),
      dueDate: getValue('newTaskDate'),
      priority: getValue('newTaskpriority'),
    },
  };
  reload.sharedEvent(newtaskObject, 'newTaskNotif');
};

const addEventToNewTaskModal = () => {
  const addEventToNewTaskButton = idSelector('newTaskButton');
  addEventToNewTaskButton.setAttribute('click-event', 'true');
  addEventToNewTaskButton.onclick = addTask;
};

const updateSelect = () => {
  const categoriesInNewTaskModal = document.getElementById('taskCategories');
  categoriesInNewTaskModal.innerHTML = '';
  getKeys().map(option => {
    const newOption = it.is('option');
    newOption.innerText = option;
    newOption.value = option;
    categoriesInNewTaskModal.appendChild(newOption);
    return true;
  });
};

const addSelectUpdaterEvent = () => {
  const button = document.getElementById('middleSectionAddButton');
  button.setAttribute('click-event', 'true');
  button.addEventListener('click', updateSelect);
};

const upcomingEvent = () => {
  reload.reloadMain(upcomingTasks());
};

const pastEvent = () => {
  reload.reloadMain(pastTasks());
};

const addNavButtonEvents = () => {
  const upcoming = document.getElementById('upcomingTasks');
  const past = document.getElementById('pastTasks');
  upcoming.setAttribute('click-event', 'true');
  past.setAttribute('click-event', 'true');
  upcoming.addEventListener('click', upcomingEvent);
  past.addEventListener('click', pastEvent);
};

export {
  addEventToCategoryModal, addEventToNewTaskModal, addSelectUpdaterEvent, addNavButtonEvents, addCategory, addTask, updateSelect, upcomingEvent, pastEvent,
};