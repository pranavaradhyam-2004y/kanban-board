let taskIdCounter = 0;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  
  let targetList = ev.target;
  if (!targetList.classList.contains('task-list')) {
    targetList = targetList.closest('.column').querySelector('.task-list');
  }
  
  if (targetList) {
    targetList.appendChild(draggedElement);
    updateCounts();
  }
}

function addTask() {
  const input = document.getElementById('taskInput');
  const priority = document.getElementById('prioritySelect').value;
  const taskText = input.value.trim();

  if (!taskText) return;

  taskIdCounter++;
  const card = document.createElement('div');
  card.className = 'task-card';
  card.draggable = true;
  card.id = 'task-' + taskIdCounter;
  card.ondragstart = drag;

  card.innerHTML = `
    <span class="priority-badge priority-${priority}">${priority}</span>
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    <div class="task-text">${taskText}</div>
  `;

  document.getElementById('todo-list').appendChild(card);
  input.value = '';
  updateCounts();
}

function deleteTask(btn) {
  btn.parentElement.remove();
  updateCounts();
}

function updateCounts() {
  document.getElementById('todo-count').textContent = document.getElementById('todo-list').children.length;
  document.getElementById('progress-count').textContent = document.getElementById('progress-list').children.length;
  document.getElementById('done-count').textContent = document.getElementById('done-list').children.length;
}

// Add task on Enter key
document.getElementById('taskInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});