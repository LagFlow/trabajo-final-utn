document.addEventListener("DOMContentLoaded", () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  const startListeningButton = document.querySelector("#record");
  const tasksList = document.querySelector(".tasks");
  const filterPriority = document.querySelector("#filter-priority");
  const filterStatus = document.querySelector("#filter-status");
  const pendingCountElement = document.querySelector("#pending-count");
  const completedCountElement = document.querySelector("#completed-count");
  const dueDateInput = document.querySelector("#due-date");

  let tasks = [];
  let recognizing = false;
  let editingTaskId = null;

  recognition.continuous = true;
  recognition.lang = "es";

  startListeningButton.addEventListener("click", toggleSpeechRecognition);

  filterPriority.addEventListener("change", renderTasks);
  filterStatus.addEventListener("change", renderTasks);

  function toggleSpeechRecognition() {
    if (recognizing) {
      recognizing = false;
      startListeningButton.innerHTML = '<i class="bx bx-microphone"></i>';
      startListeningButton.classList.remove("recording");
      recognition.stop();
    } else {
      console.log('start recognition');
      recognizing = true;
      startListeningButton.innerHTML = '<i class="bx bx-loader bx-spin"></i>';
      startListeningButton.classList.add("recording");
      recognition.start();
    }
  }

  recognition.onresult = (event) => {
    const taskText = event.results[event.results.length - 1][0].transcript;
    if (editingTaskId) {
      editTask(taskText);
    } else {
      console.log(taskText);
      addTask(taskText);
    }
  };

  function addTask(taskText) {
    let priority = null;

    if (taskText.includes("prioridad alta")) {
      priority = "alta";
      taskText = taskText.replace("prioridad alta", "- 🔥").trim();
    } else if (taskText.includes("prioridad media")) {
      priority = "media";
      taskText = taskText.replace("prioridad media", "- 🧊").trim();
    } else if (taskText.includes("prioridad baja")) {
      priority = "baja";
      taskText = taskText.replace("prioridad baja", "- 🌿").trim();
    } else {
      priority = "baja";
    }

    // Obtén la fecha seleccionada
    const dueDate = dueDateInput.value ? new Date(dueDateInput.value) : null;

    // Crea la tarea
    const task = {
      id: crypto.randomUUID(),
      text: taskText.charAt(0).toUpperCase() + taskText.slice(1),
      done: false,
      priority,
      dueDate: dueDate ? dueDate.toISOString() : null, // Guardamos la fecha en formato ISO
    };

    tasks.unshift(task);
    saveTasksToLocalStorage();
    renderTasks();
    updateTaskCounters();

    // Limpia el campo de fecha después de agregar la tarea
    dueDateInput.value = "";
  }

  function editTask(newText) {
    const task = tasks.find((task) => task.id === editingTaskId);
    if (task) {
      task.text = newText.charAt(0).toUpperCase() + newText.slice(1) + ".";
      editingTaskId = null;
      saveTasksToLocalStorage();
      renderTasks();
    }
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }
  
    tasksList.innerHTML = "";
  
    const selectedPriority = filterPriority.value;
    const selectedStatus = filterStatus.value;
  
    const filteredTasks = tasks.filter((task) => {
      const matchesPriority =
        selectedPriority === "all" || task.priority === selectedPriority;
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "completed" && task.done) ||
        (selectedStatus === "pending" && !task.done);
      return matchesPriority && matchesStatus;
    });
  
    filteredTasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task");
  
      // Formatear la fecha si existe
      const dueDateText = task.dueDate
        ? ` - Vence: ${new Date(task.dueDate).toLocaleDateString("es-ES")}`
        : "";
  
      taskItem.innerHTML = `
        <input type="checkbox" ${task.done ? "checked" : ""} />
        <span class="${task.done ? "task-done" : ""}">${task.text}${dueDateText}</span>
        <button class="edit-task"><i class="bx bx-edit"></i></button>
        <button class="delete-task"><i class="bx bx-trash"></i></button>
      `;
  
      const checkbox = taskItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => {
        toggleTaskDone(task.id, checkbox.checked);
      });
  
      taskItem.querySelector(".edit-task").addEventListener("click", () => {
        editingTaskId = task.id;
        toggleSpeechRecognition();
      });
  
      taskItem.querySelector(".delete-task").addEventListener("click", () => {
        deleteTask(task.id);
      });
  
      tasksList.appendChild(taskItem);
    });
  
    // Actualiza los contadores después de renderizar las tareas
    updateTaskCounters();
  }
  
  function toggleTaskDone(taskId, isChecked) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.done = isChecked;
      saveTasksToLocalStorage();
      renderTasks();
      updateTaskCounters();
    }
  }

  function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasksToLocalStorage();
    renderTasks();
    updateTaskCounters();
  }

  function updateTaskCounters() {
    const pendingCount = tasks.filter((task) => !task.done).length;
    const completedCount = tasks.filter((task) => task.done).length;
    pendingCountElement.textContent = `Pendientes: ${pendingCount}`;
    completedCountElement.textContent = `Completadas: ${completedCount}`;
  }

  renderTasks();
});
