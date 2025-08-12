// Show Date & Time
function updateDateTime() {
    const now = new Date();
    document.getElementById('datetime').innerText = now.toLocaleString();
}
setInterval(updateDateTime, 1000);

// Add Task
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.getElementById('addTask').addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        addTaskToList(task);
        saveTasks();
        taskInput.value = '';
    }
});

function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerHTML = `${task} <button onclick="removeTask(this)">❌</button>`;
    taskList.appendChild(li);
}

function removeTask(btn) {
    btn.parentElement.remove();
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push(li.firstChild.textContent.trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => addTaskToList(task));
}
loadTasks();

// Weather API
document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    if (!city) return;

    const apiKey = "YOUR_OPENWEATHER_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
        document.getElementById('weatherInfo').innerText =
            `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
    } else {
        document.getElementById('weatherInfo').innerText = "City not found!";
    }
});
