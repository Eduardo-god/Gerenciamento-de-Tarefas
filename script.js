document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
  
    // Função para carregar as tarefas do LocalStorage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskItem = createTaskElement(task.text, task.completed, index);
        taskList.appendChild(taskItem);
      });
    };
  
    // Função para criar um item de tarefa
    const createTaskElement = (text, completed = false, index) => {
      const li = document.createElement('li');
      li.classList.toggle('completed', completed);
  
      const taskText = document.createElement('span');
      taskText.textContent = text;
      taskText.classList.add('task-text');
  
      const editButton = document.createElement('button');
      editButton.classList.add('edit');
      editButton.textContent = 'Editar';
      editButton.onclick = () => editTask(index);
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.textContent = 'Excluir';
      deleteButton.onclick = () => deleteTask(index);
  
      const completeButton = document.createElement('button');
      completeButton.textContent = completed ? 'Desmarcar' : 'Concluir';
      completeButton.onclick = () => toggleComplete(index);
  
      li.appendChild(taskText);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      li.appendChild(completeButton);
  
      return li;
    };
  
    // Função para salvar tarefas no LocalStorage
    const saveTasks = (tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Função para adicionar nova tarefa
    const addTask = () => {
      const taskText = taskInput.value.trim();
      if (taskText === '') {
        alert('Por favor, digite uma tarefa.');
        return;
      }
  
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({ text: taskText, completed: false });
      saveTasks(tasks);
      loadTasks();
      taskInput.value = ''; // Limpar campo de entrada
    };
  
    // Função para editar uma tarefa
    const editTask = (index) => {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      const newText = prompt('Editar tarefa:', tasks[index].text);
      if (newText) {
        tasks[index].text = newText;
        saveTasks(tasks);
        loadTasks();
      }
    };
  
    // Função para excluir uma tarefa
    const deleteTask = (index) => {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
    };
  
    // Função para marcar/desmarcar tarefa como concluída
    const toggleComplete = (index) => {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks[index].completed = !tasks[index].completed;
      saveTasks(tasks);
      loadTasks();
    };
  
    // Event listener para o botão "Adicionar Tarefa"
    addTaskButton.addEventListener('click', addTask);
  
    // Permitir adicionar tarefa pressionando Enter
    taskInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  
    // Carregar tarefas ao carregar a página
    loadTasks();
  });