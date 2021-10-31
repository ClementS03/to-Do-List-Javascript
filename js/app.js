/**
 * Todolist
 */
var app = {
  init: function () {

    // Init Counter, Container and Count for use in our app
    app.container = document.getElementById('todo');
    app.counter = document.createElement('p');
    app.count = 0;

    app.createForm();
    app.createCounter();
    app.createListTasks();
  },

  createForm: function () {
    const form = document.createElement('form');
    form.className = 'form_addTask';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Ajouter une tâche';
    input.className = 'input_addTask';
    form.appendChild(input);

    form.addEventListener('submit', app.handleSubmit);

    app.container.appendChild(form);
  },


  createCounter: function () {

    app.setCounterValue();

    app.counter.className = 'counter';

    app.container.appendChild(app.counter);
  },

  createListTasks: function () {
    app.ul = document.createElement('ul');

    app.container.appendChild(app.ul);
  },

  setCounterValue: function () {
    if (app.count > 1) {
      app.counter.textContent = `${app.count} tâches en cours`;
    } else {
      app.counter.textContent = `${app.count} tâche en cours`
    }
  },

  generateTask: function (taskTitle) {
    // Create container for tasks
    const taskContainer = document.createElement('li');
    taskContainer.className = 'taskContainer';

    const id = 'checkbox-' + taskTitle;

    // Create Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'taskCheckbox';
    checkbox.id = id;
    checkbox.addEventListener('change', app.handleChange);

    // Create Label
    const label = document.createElement('label');
    label.textContent = taskTitle;
    label.className = 'taskLabel';
    label.setAttribute('for', id);

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(label);

    app.ul.appendChild(taskContainer);

    app.count += 1;
    app.setCounterValue();
  },

  handleSubmit: function (event) {
    event.preventDefault();

    const inputValue = event.target.children[0].value;

    if (inputValue.trim()) {
      app.generateTask(inputValue);
      event.target.children[0].value = "";
    } else {
      console.log('Attention le champ est vide !!');
    }
  },

  handleChange: function (event) {

    if (event.target.checked) {
      event.target.closest('li').classList.add('taskContainer--done');
      app.count -= 1;
      app.setCounterValue();
    } else {
      event.target.closest('li').classList.remove('taskContainer--done');
      app.count += 1;
      app.setCounterValue();
    }

  }
};




// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
