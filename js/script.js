const inputField = document.getElementById("taskInput");
const dateField = document.getElementById("dateInput");
const addButton = document.getElementById("addBtn");
const listContainer = document.getElementById("taskList");

addBtn.onclick = () => {
 
  if (taskInput.value === "" ) {
    alert("Task aur date dono likhein");
    return;
  }
  if(!dateInput.value) {
    alert("Date likhein");
    return;
  }

  
  const listItem = document.createElement("li");
  const taskSpan = document.createElement("span");
  const dateSpan = document.createElement("span");     

 
  taskSpan.innerText = taskInput.value.trim() ;
  dateSpan.innerText = dateInput.value;


  listItem.appendChild(taskSpan , dateSpan ,);

 taskList.appendChild(listItem);



  taskInput.value = "";
  dateInput.value = "";
  
};
