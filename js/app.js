/**
 * Todolist
 */
var app = {
  init: function () {

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

    app.container.appendChild(form);
  },


  createCounter: function () {

    app.setCounterValue();

    app.counter.className = 'counter';

    app.container.appendChild(app.counter);
  },

  createListTasks: function () {
    const ul = document.createElement('ul');

    for (let i = 0; i < 2; i++) {
      const taskContainer = document.createElement('li');
      taskContainer.className = 'taskContainer';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'taskCheckbox';

      const label = document.createElement('label');
      label.textContent = 'Faire une action';
      label.className = 'taskLabel';

      taskContainer.appendChild(checkbox);
      taskContainer.appendChild(label);

      ul.appendChild(taskContainer);
    }

    app.container.appendChild(ul);
  },

  setCounterValue: function () {
    if (app.count > 1) {
      app.counter.textContent = `${app.count} tâches en cours`;
    } else {
      app.counter.textContent = `${app.count} tâche en cours`
    }
  }

};




// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
