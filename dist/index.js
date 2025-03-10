"use strict";
let Tasks = JSON.parse(localStorage.getItem("Task") || '[]');
function ShowTasks() {
    const myDiv = document.getElementById('myDiv');
    myDiv.innerHTML = '';
    Tasks.forEach((task) => {
        const card = document.createElement('div');
        card.className = "TaskCard";
        card.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.status}</p>
            <p>${task.startDate}</p>
            <p>${task.endDate}</p>
            <button class="edit-btn" data-id="${task.id}">Edit</button>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        `;
        myDiv.appendChild(card);
    });
}
let myForm = document.getElementById('myForm');
myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let id = document.getElementById('myId');
    let title = document.getElementById('title');
    let status = document.getElementById('status');
    let startDate = document.getElementById('sDate');
    let endDate = document.getElementById('eDate');
    const Id = Tasks.length > 0 ? Tasks[Tasks.length - 1].id + 1 : 1;
    const Title = title.value;
    const Status = status.value;
    const StartDate = startDate.value;
    const EndDate = endDate.value;
    const newTask = {
        id: Id,
        title: Title,
        status: Status,
        startDate: StartDate,
        endDate: EndDate
    };
    Tasks.push(newTask);
    localStorage.setItem('Task', JSON.stringify(Tasks));
    id.value = '';
    title.value = '';
    status.value = '';
    startDate.value = '';
    endDate.value = '';
    ShowTasks();
});
document.addEventListener('DOMContentLoaded', () => {
    ShowTasks();
});
