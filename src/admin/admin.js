import { getEmployees } from "../Utils/localStorage";

function populateAssignToDropdown() {
    const employees = getEmployees();
    const assignToSelect = document.getElementById('assignTo');

    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.firstName;
        option.textContent = employee.firstName;
        assignToSelect.appendChild(option);
    });
}

function addTask(name, task) {
    const employees = getEmployees();
    const employee = employees.find(emp => emp.firstName == name);
    if (employee) {
        employee.tasks.push(task);
        localStorage.setItem('employees', JSON.stringify(employees));
    }
}

const showEmployeeTaskSummary = () => {
    const employees = getEmployees();

    const AllTasksDiv = document.querySelector('.AllTasks');


    employees.forEach(employee => {
        
        let currentEmployee = document.createElement('div');
        currentEmployee.classList.add('tasks-list');
        currentEmployee.innerHTML = `
            <h3>${employee.firstName}</h3>
        `;

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

        currentEmployee.innerHTML += `
            <h3 style="color: #85c1e9;">${newTasksCount}</h3>
            <h3 style="color: #f9e79f">${acceptedTasksCount}</h3>
            <h3 style="color: #a9dfbf;">${completedTasksCount}</h3>
            <h3 style="color: #f5b7b1">${failedTasksCount}</h3>
        `;

        AllTasksDiv.appendChild(currentEmployee);
    });
    
}

const submitButton = document.querySelector('#submit');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const AssignedTo = document.querySelector('#assignTo').value;
    const TaskTitle = document.querySelector('#title').value;
    const TaskDescription = document.querySelector('#taskDescription').value;
    const category = document.querySelector('#category').value;

    const task = {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: TaskTitle,
        taskDescription: TaskDescription,
        taskDate: new Date().toISOString().split('T')[0],
        category: category
    };

    addTask(AssignedTo, task);
    window.location.reload();
});

const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentEmployee');
    window.location.href = '../login/login.html';
});

document.addEventListener('DOMContentLoaded', () => {
    populateAssignToDropdown();
    showEmployeeTaskSummary();
});