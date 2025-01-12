import { renderTasks,showTasksSummary } from "../employee/employee";
import { getEmployees } from "../Utils/localStorage";

    const sumbitButton = document.getElementById('Submit');

    sumbitButton.addEventListener('click', (event) => {
        event.preventDefault();

        const Email = document.getElementById('Email').value;
        const password = document.getElementById('Password').value;
        const employees = getEmployees();
        const employee = employees.find(emp => emp.email == Email && emp.password == password);

        if (Email == 'admin@me.com' && password == '123') {
            window.location.href = '../admin/admin.html';
            
        }
        else if(employee){
            console.log(employee);
            localStorage.setItem('currentEmployee', employee.firstName);
            window.location.href = '../employee/employee.html';
        }
         else {
            alert('Invalid username or password');
        }
    });