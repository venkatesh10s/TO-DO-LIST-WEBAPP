$(document).ready(function() {
  // Function to load tasks from localStorage
  function loadTasks(filter = "all") {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    $("#taskList").empty(); // Clear the task list

    tasks.forEach(function(task, index) {
      // Apply filtering logic based on button click
      if (filter === "all" || (filter === "completed" && task.completed) || (filter === "pending" && !task.completed)) {
        const taskItem = `<li class="list-group-item d-flex justify-content-between">
                            <input type="checkbox" class="task-checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
                            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                            <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
                          </li>`;
        $("#taskList").append(taskItem);
      }
    });
  }

  // Add task to the list
  $("#addTask").click(function() {
    const taskText = $("#taskInput").val().trim();
    if (taskText === "") return; // Don't add empty tasks

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false }); // Default to pending
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks(); // Reload tasks after adding a new one
    $("#taskInput").val(""); // Clear the input field
  });

  // Function to delete tasks
  window.deleteTask = function(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1); // Remove the task at the given index
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); // Reload the tasks
  }

  // Mark task as completed or pending
  $(document).on("click", ".task-checkbox", function() {
    const index = $(this).data("index");
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed; // Toggle completed status
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); // Reload tasks after marking as completed or pending
  });

  // Filter tasks based on completion status
  $("#filterAll").click(function() {
    loadTasks("all");
  });

  $("#filterCompleted").click(function() {
    loadTasks("completed");
  });

  $("#filterPending").click(function() {
    loadTasks("pending");
  });

  loadTasks(); // Initial load of tasks from localStorage
});
