const themeToggle = document.getElementById("theme-toggle");
const tasksBoxElement = document.getElementById("tasks-box");
const numberElement = document.getElementById("task-number");
const clearElement = document.getElementById("clear-tasks");
const filterAll = document.getElementById("filter-all");
const filterActiveElement = document.getElementById("filter-active");
const completedElement = document.getElementById("completed");
const newtaskElement = document.getElementById("newtask");
const formElement = document.getElementById("form");


const switchMode = () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    themeToggle.src = "./assets/images/icon-moon.svg";
  } else {
    document.body.classList.add("dark");
    themeToggle.src = "./assets/images/icon-sun.svg";
  }
};

themeToggle.addEventListener("click", switchMode);

let TASKS = [
  {
    id: Date.now(),
    name: "Create your first task...",
    completed: false,
  },
];

const createTask = (event) => {
  event.preventDefault();
  const taskText = newtaskElement.value;
  if (taskText !== "") {
    const newTask = {
      id: Date.now(),
      name: taskText,
      completed: false,
    };
    TASKS.push(newTask);
    newtaskElement.value = "";
    printNewTask(TASKS);
  } else {
    console.log("El campo está vacío.");
  }
};

formElement.addEventListener("submit", createTask);


const completedTask = (id) => {
  const taskFounded = TASKS.find((task) => task.id === id);
  if (taskFounded.completed === false) {
    taskFounded.completed = true;
  } else {
    taskFounded.completed = false;
  }
  printNewTask(TASKS);
};


const clearCompletedTasks = () => {
  TASKS = TASKS.filter((task) => task.completed === false);
  printNewTask(TASKS);
};

clearElement.addEventListener("click", clearCompletedTasks);


const printNewTask = (tasks) => {
  tasksBoxElement.textContent = "";

  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    const newTask = document.createElement("div");
    newTask.classList.add("task", "exampletask");

    const newCheckbox = document.createElement("input");
    newCheckbox.classList.add("checkbox");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = task.completed;
    newCheckbox.id = task.id;

    newCheckbox.addEventListener("change", () => completedTask(task.id));

    const newTaskText = document.createElement("label");
    newTaskText.classList.add("checkbox-text");
    newTaskText.textContent = task.name;

    const cancelTask = document.createElement("img");
    cancelTask.classList.add("cancel");
    cancelTask.src = "./assets/images/icon-cross.svg";

    cancelTask.addEventListener("click", () => deleteTask(task.id));

    newTask.append(newCheckbox, newTaskText, cancelTask);
    fragment.append(newTask);
  });
  tasksBoxElement.append(fragment);
  taskCounter();
};

const deleteTask = (taskId) => {
  TASKS = TASKS.filter((task) => task.id !== taskId);
  printNewTask(TASKS);
};

const taskCounter = () => {
  const incomplete = TASKS.filter((task) => task.completed === false);
  numberElement.textContent = `${incomplete.length} items left`;
};

const showAll = () => {
  printNewTask(TASKS);
  filterActiveElement.classList.remove("filter-all");
  filterAll.classList.add("filter-all");
  completedElement.classList.remove("filter-all");
};
filterAll.addEventListener("click", showAll);


const showIncompleted = () => {
  const incomplete = TASKS.filter((task) => task.completed === false);
  printNewTask(incomplete);
  filterActiveElement.classList.add("filter-all");
  filterAll.classList.remove("filter-all");
  completedElement.classList.remove("filter-all");
};

filterActiveElement.addEventListener("click", showIncompleted);

const showCompleted = () => {
  const completedTasks = TASKS.filter((task) => task.completed === true);
  printNewTask(completedTasks);
  filterActiveElement.classList.remove("filter-all");
  filterAll.classList.remove("filter-all");
  completedElement.classList.add("filter-all");
};

completedElement.addEventListener("click", showCompleted);

printNewTask(TASKS);

