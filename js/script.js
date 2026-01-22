const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;
let currentFilter = "all";

/* --- Show Tasks --- */
function showTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "pending") return !task.done;
    if (currentFilter === "completed") return task.done;
    return true;
  });

  filteredTasks.forEach(task => {
    const index = tasks.indexOf(task);

    const li = document.createElement("li");
    li.className = "task-item flex justify-between items-center bg-gray-50 p-4 rounded-2xl transition-all duration-200";

    li.innerHTML = `
      <div class="flex flex-col">
        <p class="${task.done ? "completed" : ""} text-gray-800 font-medium">${task.text}</p>
        <small class="text-gray-400">${task.date}</small>
      </div>
      <div class="flex gap-2">
        <button class="hover:text-blue-500" onclick="editTask(${index})">✏️</button>
        <button class="hover:text-green-500" onclick="completeTask(${index})">✔</button>
        <button class="hover:text-red-500" onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
  updateFilterUI();
}

/* --- Filters --- */
function setFilter(filter) {
  currentFilter = filter;
  showTasks();
}

function updateFilterUI() {
  ["all", "pending", "completed"].forEach(f => {
    const btn = document.getElementById(`filter-${f}`);
    btn.classList.toggle("border-blue-500", f === currentFilter);
    btn.classList.toggle("opacity-50", f !== currentFilter);
  });
}


function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;

  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");

  progressText.innerText = `${completed} / ${total}`;

  const maxTasks = 40; 
  const widthPercent = total === 0 ? 0 : Math.min((total / maxTasks) * 100, 100);
  progressBar.style.width = `${widthPercent}%`;
  progressBar.style.transition = "width 0.4s ease, background 0.4s ease";

  
  if (total === 0) {
    progressBar.style.background = "linear-gradient(90deg, #60a5fa, #3b82f6)";
  } else {
    const percentDone = (completed / total) * 100;
    progressBar.style.background = `linear-gradient(90deg, #60a5fa ${percentDone}%, #b0d0ff ${percentDone}%)`;
  }
}

/* --- Add Task --- */
addBtn.onclick = () => {
  if (!taskInput.value || !dateInput.value) {
    alert("Task aur date dono likho");
    return;
  }

  if (editIndex !== null) {
    tasks[editIndex].text = taskInput.value;
    tasks[editIndex].date = dateInput.value;
    editIndex = null;
    addBtn.innerHTML = '<i class="fa-solid fa-plus text-sm"></i>';
  } else {
    tasks.push({
      text: taskInput.value,
      date: dateInput.value,
      done: false
    });
  }

  save();
};

/* --- Edit Task --- */
function editTask(i) {
  taskInput.value = tasks[i].text;
  dateInput.value = tasks[i].date;
  editIndex = i;
  addBtn.innerHTML = "✔";
}

/* --- Complete / Toggle Task --- */
function completeTask(i) {
  tasks[i].done = !tasks[i].done;
  save();
}

/* --- Delete Task --- */
function deleteTask(i) {
  tasks.splice(i, 1);
  save();
}

/* --- Save & Render --- */
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  dateInput.value = "";
  showTasks();
}

/* --- Initial Render --- */
showTasks();
