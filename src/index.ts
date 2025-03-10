// index.ts

interface Task {
    id: number;
    title: string;
    status: string;
    startDate: string;
    endDate: string;
}

// Load tasks from localStorage or initialize as an empty array
let Tasks: Task[] = JSON.parse(localStorage.getItem("Task") || '[]');

function ShowTasks() {
    const myDiv = document.getElementById('myDiv') as HTMLDivElement;
    myDiv.innerHTML = ''; // Clear existing cards

    Tasks.forEach((task) => {
        const card = document.createElement('div');
        card.className = "TaskCard";
        
        // Add task details and buttons with data-id for identification
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

// Handle form submission
let myForm = document.getElementById('myForm') as HTMLFormElement;

myForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let id = document.getElementById('myId') as HTMLInputElement;
    let title = document.getElementById('title') as HTMLInputElement;
    let status = document.getElementById('status') as HTMLInputElement;
    let startDate = document.getElementById('sDate') as HTMLInputElement;
    let endDate = document.getElementById('eDate') as HTMLInputElement;

    const Id = Tasks.length > 0 ? Tasks[Tasks.length - 1].id + 1 : 1;
    const Title = title.value;
    const Status = status.value;
    const StartDate = startDate.value;
    const EndDate = endDate.value;

    // Create new task object
    const newTask: Task = {
        id: Id,
        title: Title,
        status: Status,
        startDate: StartDate,
        endDate: EndDate
    };

    Tasks.push(newTask);

    localStorage.setItem('Task', JSON.stringify(Tasks)); // Save to localStorage

    // Clear form inputs
    id.value = '';
    title.value = '';
    status.value = '';
    startDate.value = '';
    endDate.value = '';

    ShowTasks(); // Refresh display
});


// Single event listener on myDiv for edit buttons (event delegation)
// const myDiv = document.getElementById('myDiv') as HTMLDivElement;
// myDiv.addEventListener('click', (event) => {
//     const tar = event.target as HTMLElement;
//     if (tar.matches('.edit-btn')) { // Check if clicked element is an edit button
//         const taskId = parseInt(tar.dataset.id!); // Get task ID from data-id
//         const taskIndex = Tasks.findIndex(task => task.id === taskId); // Find task index

//         if (taskIndex !== -1) { // Ensure task exists
//             const newTitle = prompt('Enter new title:', Tasks[taskIndex].title); // Prompt for new title
//             if (newTitle && newTitle.trim() !== '') { // Validate input
//                 Tasks[taskIndex].title = newTitle.trim(); // Update title
//                 localStorage.setItem('Task', JSON.stringify(Tasks)); // Save to localStorage
//                 ShowTasks(); // Refresh display
//             }
//         }
//     }
// });


// Display tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    ShowTasks();
});