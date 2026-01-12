const inputField = document.getElementById("todo-input");
 const dateField = document.getElementById("dateInput");
const addButton = document.getElementById("add-btn");
const listContainer = document.getElementById("todo-list");

function showTasks() {
  taskList.innerHTML = "";

 
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-white/5 p-4 rounded-2xl";

    li.innerHTML = `
      <div>
        <p class="${task.done ? 'line-through opacity-50' : ''}">
          ${task.text}
        </p>
        <small class="text-white/40">${task.date || ""}</small>
      </div>

      <div class="flex gap-2">
        <button onclick="editTask(${i})">✏️</button>
        <button onclick="completeTask(${i})">✔</button>
        <button onclick="deleteTask(${i})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  }
}

// ========== Add OR Edit Task ==========
addBtn.onclick = function () {
  if (taskInput.value === "") {
    alert("Please write a task");
    return;
  }

  // 🔹 EDIT MODE
  if (editIndex !== null) {
    tasks[editIndex].text = taskInput.value;
    tasks[editIndex].date = dateInput.value;

   
    addBtn.innerHTML = "+"; // button back to add
  }
  // 🔹 ADD MODE
  else {
    let task = {
      text: taskInput.value,
      date: dateInput.value,
    };
    tasks.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  dateInput.value = "";

  showTasks();
};

// ========== Edit Task ==========
function editTask(index) {
  taskInput.value = tasks[index].text;
  dateInput.value = tasks[index].date;
  editIndex = index;

  addBtn.innerHTML = "✔"; // button becomes update
}

// ========== Complete Task ==========
function completeTask(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

// ========== Delete Task ==========
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;
showTasks();

