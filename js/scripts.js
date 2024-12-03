const themeToggle = document.getElementById("toggle-theme");
const taskListBox = document.getElementById("task-list-box");
const taskCounter = document.getElementById("task-counter");
const clearCompletedButton = document.getElementById("clear-completed");
const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterCompleted = document.getElementById("filter-completed");
const taskInput = document.getElementById("task-input");
const taskForm = document.getElementById("task-form");

let tasks = [
  { id: Date.now(), name: "Create your first task...", completed: false },
];

/* Cambiar entre temas */
const toggleTheme = () => {
  document.body.classList.toggle("dark");
  themeToggle.src = document.body.classList.contains("dark")
    ? "./images/icon-sun.svg"
    : "./images/icon-moon.svg";
};

themeToggle.addEventListener("click", toggleTheme);

/* Crear nueva tarea */
const addTask = (event) => {
  event.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName) {
    tasks.push({ id: Date.now(), name: taskName, completed: false });
    taskInput.value = "";
    renderTasks(tasks);
  }
};

taskForm.addEventListener("submit", addTask);

/* Marcar tarea como completada */
const toggleTaskCompletion = (taskId) => {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  renderTasks(tasks);
};

/* Eliminar tarea */
const removeTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks(tasks);
};

/* Limpiar tareas completadas */
const clearCompletedTasks = () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks(tasks);
};

clearCompletedButton.addEventListener("click", clearCompletedTasks);

/* Renderizar tareas */
const renderTasks = (tasksToRender) => {
  taskListBox.innerHTML = "";

  tasksToRender.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

    const label = document.createElement("label");
    label.textContent = task.name;
    label.classList.add(task.completed ? "completed" : "active");

    const deleteButton = document.createElement("img");
    deleteButton.src = "./images/icon-cross.svg";
    deleteButton.classList.add("delete-icon");
    deleteButton.addEventListener("click", () => removeTask(task.id));

    taskElement.append(checkbox, label, deleteButton);
    taskListBox.appendChild(taskElement);
  });

  updateTaskCounter();
};

/* Actualizar contador de tareas */
const updateTaskCounter = () => {
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  taskCounter.textContent = `${remainingTasks} item${remainingTasks === 1 ? "" : "s"} left`;
};

/* Filtros */
const filterTasks = (filter) => {
  let filteredTasks = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }
  renderTasks(filteredTasks);
};

filterAll.addEventListener("click", () => filterTasks("all"));
filterActive.addEventListener("click", () => filterTasks("active"));
filterCompleted.addEventListener("click", () => filterTasks("completed"));

/* Inicialización */
renderTasks(tasks);
