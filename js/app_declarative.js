/**
 * Todolist
 */

/* 
version impérative : on stocke les données directement dans le DOM. Pas pratique pour
ajouter des fonctionnalités (si on voulait ordonner les tâches : finies puis pas
finies => traitement du clic sur une tâche aaaahhhhhhhhh)
Programmation déclarative :
- on a une seule source de vérité : les données
- quand on veut changer quelque chose (par exemple traiter une action utilisateur) :
on modifie les données
- dès que les données changent, on reconstruit l'affichage en partant de zéro
avantages et inconvénients
- impératif : on met à jour dans le DOM seulement ce qui a changé, mais peu évolutif
- déclaratif : évolutif, mais on recharge tout le DOM (bof pour la performance)
Et si on pouvait avoir quelque chose d'évolutif, mais qui mette à jour dans le 
DOM seulement ce qui a changé ?
=> React !
Il utilise un DOM virtuel (génération du JSX, ce n'est pas affiché), et met à jour
dans le DOM réel seulement ce qui a changé (mécanisme de réconciliation)
*/

const app = {
    tasks: [
        {
            id: 1,
            title: 'Coder une todo-list',
            done: true,
        },
        {
            id: 2,
            title: 'Améliorer la todo-list',
            done: false,
        }
    ],

    init: function () {
        app.drawUI();
    },

    drawUI: function () {
        app.container = document.getElementById('todo');


        app.container.innerHTML = '';

        app.createForm();
        app.createCounter();
        app.createListTasks();
    },

    createForm: function () {
        const form = document.createElement('form');
        form.className = 'form-addTask';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Ajouter une tâche';
        input.className = 'input_addTask';
        form.appendChild(input);

        form.addEventListener('submit', app.handleSubmit);

        app.container.appendChild(form);
    },

    createCounter: function () {


        const counter = document.createElement('p');
        counter.className = 'counter';

        const tasksNotDone = app.tasks.filter((task) => {

            return !task.done;
        });

        const count = tasksNotDone.length;

        if (count > 1) {
            counter.textContent = `${count} tâches en cours`;
        }
        else {
            counter.textContent = `${count} tâche en cours`;
        }

        app.container.appendChild(counter);
    },

    createListTasks: function () {
        app.ul = document.createElement('ul');
        app.container.appendChild(app.ul);

        app.tasks.forEach((task) => {
            app.generateTask(task.title, task.id, task.done);
        });
    },

    generateTask: function (taskTitle, taskId, isDone) {
        const taskContainer = document.createElement('li');

        if (isDone) {
            taskContainer.setAttribute('class', 'taskContainer taskContainer--done');
        } else {
            taskContainer.setAttribute('class', 'taskContainer');
        }


        const id = 'checkbox-' + taskId;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'taskCheckbox';


        checkbox.checked = isDone;

        checkbox.id = id;


        checkbox.dataset.identifier = taskId;


        checkbox.addEventListener('change', app.handleChange);

        const label = document.createElement('label');
        label.textContent = taskTitle;
        label.className = 'taskLabel';

        label.htmlFor = id;

        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(label);

        app.ul.appendChild(taskContainer);
    },

    handleSubmit(event) {

        event.preventDefault();

        const inputValue = event.target.childNodes[0].value;


        if (inputValue.trim() !== '') {

            const newTask = {

                id: app.tasks.length + 1,
                title: inputValue,
                done: false,
            };
            app.tasks.push(newTask);

            app.drawUI();

            event.target.childNodes[0].value = '';
        }
        else {
            console.log('attention le champ est vide');
        }
    },

    handleChange: function (event) {

        const identifier = Number(event.target.dataset.identifier);


        const taskToUpdate = app.tasks.find((task) => task.id === identifier);
        taskToUpdate.done = event.target.checked;

        app.drawUI();

    }

};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);