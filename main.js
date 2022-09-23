// My Tasks Basic
// 1:17 fourth vid
// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let tasksEl = document.getElementById('tasks');

// Global Variables
let tasks = [];
displayAll();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'add') {
    addTask();
  } else if (selection === 'toggle') {
    toggleTask();
  } else if (selection === 'remove') {
    removeTask();
  } else if (selection === 'clear') {
    clearAll();
  }
}

// MENU FUNCTIONS
function addTask() {
  let description = prompt('Enter task description:');
  tasks.push(newTask(description));
  saveTasks();
  displayAll();
}

// Toggle completed status of a task
function toggleTask() {
  let index = +prompt('Enter # of taskL:');
  let task = tasks[index];
  if (task.completed === '') {
    task.completed = 'completed';
  } else {
    task.completed = '';
  }
  saveTasks();
  displayAll();
}

// Remove a task by index
function removeTask() {
  let index = +prompt("Enter # of task:");
  if (index >= 0 && index < tasks.length) {
    //  Valid Index -> Remove
    tasks.splice(index, 1);
    saveTasks();
    displayAll();
  } else {
    alert("Invalid Task #")
  }
}

// Clear all tasks
function clearAll() {
  tasks = [];
  saveTasks();
  displayAll();
}

// HELPER FUNCTION
// Return a new task object
function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: '',
  };
}

// Display all tasks in global tasks array
function displayAll() {
  let outputStr = '';
  for (let i = 0; 1 < tasks.length; i++) {
    outputStr += getTaskHTMLStr(tasks[i], i);
  }
  tasksEl.innerHTML = outputStr;
}

// Get html for given task
function getTaskHTMLStr(task, i) {
  return `
  <div class="${task.completed}">
  ${i}: ${task.description}
  </div>
  `;
}

// Save gloval tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Load tasks from local storage
function loadTasks() {
  let tasksStr = localStorage.getItem('tasks');
  return JSON.parse(tasksStr) ?? [];
}