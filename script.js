// Array to store tasks
const tasks = [];

// Show Add Task Section
function showAddTask() {
    document.getElementById('addTaskSection').style.display = 'block';
    document.getElementById('manageTasksSection').style.display = 'none';
    document.getElementById('decision').style.display = 'none';
}

// Show Manage Tasks Section
function showManageTasks() {
    document.getElementById('manageTasksSection').style.display = 'block';
    document.getElementById('addTaskSection').style.display = 'none';
    document.getElementById('decision').style.display = 'none';
}

// Show Decision Section
function showDecision() {
    document.getElementById('decision').style.display = 'block';
    document.getElementById('addTaskSection').style.display = 'none';
    document.getElementById('manageTasksSection').style.display = 'none';
}

// Render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the task list

    // Loop through tasks and create list items
    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${task.description} (Due: ${task.dueDate})
            <button class="delete-btn" onclick="deleteTask('${task.description}')">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add a task
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('task-input').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskInput && dueDate) {
        // Create a new task object
        const newTask = {
            description: taskInput,
            dueDate: dueDate
        };

        // Add the new task to the task list
        tasks.push(newTask);

        // Sort tasks by due date (earliest first)
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        // Clear input fields
        document.getElementById('task-input').value = '';
        document.getElementById('due-date').value = '';

        // Re-render the task list after sorting
        renderTasks();
    } else {
        alert("Please enter task details and due date.");
    }
});

// Delete a task
function deleteTask(taskDescription) {
    // Remove the task from the tasks array
    const taskIndex = tasks.findIndex(task => task.description === taskDescription);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }

    // Re-render the task list after deletion
    renderTasks();
}
