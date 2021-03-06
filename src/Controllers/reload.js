/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
import it from '../helpers/main_module';
import {
  getKeys, addTask as store, editTask as edit, deleteTask as remove,
} from '../Models/local_storage';
import { getCategories as categories, getUpcomingTasks as upcomingTasks } from '../helpers/render_object';

export const isEmpty = target => target.length === 0 || !(target.toString()).trim();

export const reloadCategories = container => {
  const categoryContainer = document.getElementById('categoryContainer');
  while (categoryContainer.lastElementChild) {
    categoryContainer.removeChild(categoryContainer.lastElementChild);
    categoryContainer.lastElementChild;
  }
  categoryContainer.appendChild(container);
};

export const reloadMain = container => {
  const secondSection = document.getElementById('secondSection');
  while (secondSection.lastElementChild) {
    secondSection.removeChild(secondSection.lastElementChild);
    secondSection.lastElementChild;
  }
  secondSection.appendChild(container);
};

export const reloadTaskDescription = task => {
  const taskDescriptionTarget = document.getElementById('taskDescriptionContainer');
  while (taskDescriptionTarget.lastElementChild) {
    taskDescriptionTarget.removeChild(taskDescriptionTarget.lastElementChild);
    taskDescriptionTarget.lastElementChild;
  }
  if (!task) return true;
  const container = it.is('div');
  container.classes('d-flex flex-column px-2');
  const header = it.is('div');
  header.classes('w-100 d-flex flex-column justify-content-between');
  const title = it.is('h3');
  title.classes('mb-2');
  title.innerText = task.title;
  const dueDate = it.is('p');
  dueDate.innerText = `Due date - ${task.dueDate}`;
  const category = it.is('h5');
  category.innerText = `Category - ${task.category}`;
  const priority = it.is('h5');
  priority.classes('h5 mt-2');
  priority.innerText = 'Priority - ';
  for (let i = 0; i < parseInt(task.priority, 10); i += 1) {
    priority.innerHTML += '&#x2605;';
  }
  header.classes('border-bottom border-dark pb-2');
  header.append(title, category, priority, dueDate);

  const description = it.is('div');
  description.classes('pt-2 h5 overflow-auto');
  description.innerText = task.description;
  container.append(header, description);

  taskDescriptionTarget.append(container);
  return true;
};

export const sharedEvent = (obj, notifId, oldObj = null) => {
  const notif = document.getElementById(notifId);
  isEmpty(obj.category) || Object.values(obj.data).some(value => isEmpty(value)) ? (() => {
    notif.innerText = 'Fill all the fields';
    return true;
  })() : (() => {
    oldObj ? edit(obj, oldObj) : store(obj);
    notif.innerText = `${obj.data.title} is added`;
    reloadCategories(categories());
    reloadMain(upcomingTasks());
    return true;
  })();
};

export const editTask = task => {
  const taskDescriptionTarget = document.getElementById('taskDescriptionContainer');
  const selectTag = getKeys().map(option => {
    const newOption = it.is('option');
    newOption.innerText = option;
    newOption.value = option;
    if (task.category === option) newOption.setAttribute('selected', 'selected');
    return newOption;
  });
  taskDescriptionTarget.innerHTML = '';
  taskDescriptionTarget.innerHTML = `<form class="px-2">
  <div class="form-group">
    <label for="Title">Task title</label>
    <input type="text" class="form-control" id="editTitle" aria-Editdescribedby="Title" placeholder="Enter new category" value = "${task.title}">
  </div>
  <div class="form-group">
    <label for="Desc">Task Description</label>
    <textarea class="form-control" name="Description" id="editDesc" cols="Edit30" rows="5" placeholder="Enter Description">${task.description}</textarea>
  </div>
  <div class="form-group">
    <label for="Date">Task Due Date</label>
    <input type="date" class="form-control" id="editDate" aria-dEditescribedby="Date" value="${task.dueDate}">
  </div>
  <div class="form-group">
    <label for="Priority">Task Priority</label>
    <select name="priority" class= "form-control" id="editpriority">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="taskCategories">Task Category</label>
    <select name="categories" id="editTaskCategories" class="form-control">
    ${
  selectTag.map(tag => tag.outerHTML)
}
    </select>
  </div>
  <p class="text-dark text-center" id="editnewTaskNotif"></p>
  </form>`;
  const button = it.is('button');
  button.id = 'editButton';
  button.classes('btn btn-dark text-white');
  button.innerText = 'Edit';
  button.addEventListener('click', () => {
    const newtaskObject = {
      category: document.getElementById('editTaskCategories').value,
      data: {
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDesc').value,
        dueDate: document.getElementById('editDate').value,
        priority: document.getElementById('editpriority').value,
        id: task.id,
      },
    };
    sharedEvent(newtaskObject, 'editnewTaskNotif', task);
    reloadTaskDescription(null);
  });
  taskDescriptionTarget.appendChild(button);
};

export const deleteTask = obj => {
  remove(obj);
  reloadCategories(categories());
  reloadMain(upcomingTasks());
  reloadTaskDescription(null);
};
