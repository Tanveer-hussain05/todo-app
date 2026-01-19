const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;
let currentFilter = 'all'; // Track active filter

function showTasks() {
  taskList.innerHTML = "";

  // 1. Filter the tasks based on currentFilter
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.done;
    if (currentFilter === 'completed') return task.done;
    return true; // 'all'
  });

  // 2. Render the filtered list
  filteredTasks.forEach((task, filteredIdx) => {
    // We find the original index in the main 'tasks' array to keep edit/delete working
    const originalIndex = tasks.indexOf(task);

    let li = document.createElement("li");
    li.className = "flex justify-between items-center bg-white/5 p-4 rounded-2xl animate-fadeIn";

    li.innerHTML = `
      <div>
        <p class="${task.done ? 'line-through opacity-50' : ''}">
          ${task.text}
        </p>
        <small class="text-white/40">${task.date || "No date"}</small>
      </div>
      <div class="flex gap-2">
        <button class="hover:scale-110 transition-transform" onclick="editTask(${originalIndex})">✏️</button>
        <button class="hover:scale-110 transition-transform" onclick="completeTask(${originalIndex})">✔</button>
        <button class="hover:scale-110 transition-transform" onclick="deleteTask(${originalIndex})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  updateStats();
  updateFilterUI();
}

// ========== Filter Logic ==========
function setFilter(filter) {
  currentFilter = filter;
  showTasks();
}

function updateFilterUI() {
  const filters = ['all', 'pending', 'completed'];
  filters.forEach(f => {
    const btn = document.getElementById(`filter-${f}`);
    if (f === currentFilter) {
      btn.classList.add('border-pink-500');
      btn.classList.remove('border-transparent', 'opacity-50');
    } else {
      btn.classList.remove('border-pink-500');
      btn.classList.add('border-transparent', 'opacity-50');
    }
  });
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;

  const maxTasks = 10; 

  const addProgress = total === 0 ? 0 : Math.min((total / maxTasks) * 100, 100);
  
  const doneProgress = total === 0 ? 0 : (completed / total) * 100;

  const progressText = document.getElementById("progressText");
  if (progressText) {
    progressText.innerText = `${completed} / ${total}`;
  }

  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
   
    progressBar.style.background = `linear-gradient(to right, #f43f5e ${doneProgress}%, #f9a8d4 ${addProgress}%)`;
    progressBar.style.width = `${addProgress}%`;
  }
}

// ========== Add OR Edit Task ==========
addBtn.onclick = function () {
  if (taskInput.value.trim() === "") {
    alert("Please write a task");
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

  saveAndRefresh();
};

function editTask(index) {
  taskInput.value = tasks[index].text;
  dateInput.value = tasks[index].date;
  editIndex = index;
  addBtn.innerHTML = "✔";
  taskInput.focus();
}

function completeTask(index) {
  tasks[index].done = !tasks[index].done;
  saveAndRefresh();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRefresh();
}

function saveAndRefresh() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  dateInput.value = "";
  showTasks();
}

// Initialize
showTasks();