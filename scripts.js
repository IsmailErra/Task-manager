document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('toggleDarkMode').addEventListener('click', toggleDarkMode);
    document.getElementById('filterAll').addEventListener('click', () => filterTasks('all'));
    document.getElementById('filterPending').addEventListener('click', () => filterTasks('pending'));
    document.getElementById('filterCompleted').addEventListener('click', () => filterTasks('completed'));
    document.getElementById('themeSelect').addEventListener('change', changeTheme);

    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();
        const taskPriority = document.getElementById('taskPriority').value;

        if (taskText !== "") {
            const taskList = document.getElementById('taskList');
            const newTask = document.createElement('li');
            newTask.className = taskPriority;
            newTask.innerHTML = `
                <div class="complete-circle"></div>
                <div class="task-content">${taskText}</div>
                <button class="update">Modifier</button>
                <button class="delete">Supprimer</button>
            `;

            newTask.querySelector('.complete-circle').addEventListener('click', function () {
                newTask.classList.toggle('completed');
                this.classList.toggle('completed');
                filterTasks(document.querySelector('button.active')?.id.replace('filter', '').toLowerCase() || 'all');
            });

            newTask.querySelector('.update').addEventListener('click', function () {
                const newTaskText = prompt("Modifier la tâche :", taskText);
                if (newTaskText !== null) {
                    newTask.querySelector('.task-content').textContent = newTaskText;
                }
            });

            newTask.querySelector('.delete').addEventListener('click', function () {
                taskList.removeChild(newTask);
            });

            taskList.appendChild(newTask);
            taskInput.value = '';
        }
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    function filterTasks(filter) {
        const tasks = document.querySelectorAll('#taskList li');
        tasks.forEach(task => {
            switch (filter) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'pending':
                    task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                    break;
                case 'completed':
                    task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                    break;
            }
        });

        // Update active filter button
        document.querySelectorAll('.filter-container button').forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(`filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`).classList.add('active');
    }

    function changeTheme() {
        const theme = document.getElementById('themeSelect').value;
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);

        const buttons = document.querySelectorAll('.filter-container button, #addTaskBtn');
        buttons.forEach(button => {
            button.className = button.className.replace(/theme-\w+/g, '');
            button.classList.add('theme-button', `theme-${theme}`);
        });
    }

    // Initial filter to display all tasks
    filterTasks('all');
    changeTheme(); // Apply initial theme
});
