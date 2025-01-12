import { getEmployees } from "../Utils/localStorage";

const showUsername = (name) => {
    const username = document.querySelector('.header').querySelector('h2');
    username.textContent = 'Hello ' + name;
}

export const renderTasks = (name) => {
    const employees = getEmployees();
    const employee = employees.find(emp => emp.firstName == name);

    const tasksContainer = document.querySelector('.tasks');
    tasksContainer.innerHTML = ''; // Clear existing tasks

    employee.tasks.forEach(task => {
        const taskDiv = document.createElement('div');

        taskDiv.classList.add('task');

        taskDiv.innerHTML = `
            <h2>${task.taskTitle}</h2>
            <p>${task.taskDescription}</p>
        `;

        taskDiv.style.cssText = `
            width: 300px; 
            height: 90%;
        `;

        if(task.active){
            taskDiv.classList.add('acceptedTasks');

            taskDiv.innerHTML += `
                <button class="accept">Complete</button>
                <button class="reject">Fail</button>
            `;
        }
        else if(task.newTask){
            taskDiv.classList.add('newTasks');
            taskDiv.innerHTML += `
                <button class="accept">Accept</button>
                <button class="reject">Reject</button>
            `;
        }
        else if(task.completed){
            taskDiv.classList.add('completedTasks');
            taskDiv.innerHTML += `
                <button class="accept">Completed</button>
            `;
        }
        else{
            taskDiv.classList.add('failedTasks');
        }

        tasksContainer.appendChild(taskDiv);
    });
}

export const showTasksSummary = (name) => {
    const employees = getEmployees();
    const employee = employees.find(emp => emp.firstName == name);
    const newTasks = document.querySelector('.newTasks');
    const acceptedTasks = document.querySelector('.acceptedTasks');
    const completedTasks = document.querySelector('.completedTasks');
    const failedTasks = document.querySelector('.failedTasks');

    let newTasksCount = 0;
    let acceptedTasksCount = 0;
    let completedTasksCount = 0;
    let failedTasksCount = 0;

    employee.tasks.forEach(task => {
        if (task.active) {
            acceptedTasksCount++;
        } 

        if(task.newTask){
            newTasksCount++;
        }

        if (task.completed) {
            completedTasksCount++;
        }

        if (task.failed) {
            failedTasksCount++;
        }
    });

    newTasks.querySelector('h1').textContent = newTasksCount;
    acceptedTasks.querySelector('h1').textContent = acceptedTasksCount;
    completedTasks.querySelector('h1').textContent = completedTasksCount;
    failedTasks.querySelector('h1').textContent = failedTasksCount;
}


const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentEmployee');
    window.location.href = '../login/login.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const employeeName = localStorage.getItem('currentEmployee');
    if (employeeName) {
        renderTasks(employeeName);
        showTasksSummary(employeeName);
        showUsername(employeeName);
    }
});