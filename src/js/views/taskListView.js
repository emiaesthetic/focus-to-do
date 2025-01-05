export class TaskListView {
  constructor() {
    this.wrapper = document.querySelector('.task-wrapper');
  }

  createTask({ id, name, counter, priority }) {
    const task = document.createElement('tr');
    task.className = 'task';
    task.dataset.id = id;
    task.innerHTML = `
      <td class="task__data task__complete">
          <label class="task__checkbox checkbox">
            <input class="checkbox__input" type="checkbox" name="checkbox">
          </label>
        </td>
        <td class="task__data task__start">
          <button
            class="task__button button"
            type="button"
            aria-label="Start focus"
          >
            <svg aria-hidden="true">
              <use href="img/sprite.svg#start"></use>
            </svg>
          </button>
        </td>
        <td class="task__data task__description">
          <p class="task__name">${name}</p>
          <div class="task__pomodoro">
            <svg class="task__pomodoro-priority ${priority}" aria-hidden="true">
              <use href="img/sprite.svg#priority"></use>
            </svg>
            <span class="task__pomodoro-done">0</span>
            <span class="task__pomodoro-divide">/</span>
            <div class="task__pomodoro-total">
              <svg aria-hidden="true">
                <use href="img/sprite.svg#alarm"></use>
              </svg>
              <span class="task__pomodoro-number">${counter}</span>
            </div>
          </div>
        </td>
        <td class="task__data task__delete">
          <button
            class="task__button button button--transparent"
            type="button"
            aria-label="Delete task"
          >
            <svg aria-hidden="true">
              <use href="img/sprite.svg#trash"></use>
            </svg>
          </button>
        </td>
    `;
    return task;
  }

  createTable() {
    const table = document.createElement('table');
    table.className = 'tasks';
    const body = document.createElement('tbody');
    body.className = 'tasks__rows';
    table.append(body);
    table.body = body;
    return table;
  }

  renderPicture() {
    const container = document.createElement('div');
    container.className = 'no-tasks';
    container.innerHTML = `
      <img
        class="no-tasks__image"
        src="img/no-tasks.svg"
        alt="Task list is empty"
      >
    `;
    this.wrapper.innerHTML = '';
    this.wrapper.append(container);
  }

  renderTask(taskData) {
    const body = this.wrapper.querySelector('.tasks__rows');
    if (body) {
      body.append(this.createTask(taskData));
      return;
    }

    const table = this.createTable();
    table.body.append(this.createTask(taskData));
    this.wrapper.innerHTML = '';
    this.wrapper.append(table);
  }

  renderTaskList(data) {
    const table = this.createTable();
    table.body.append(...data.map(item => this.createTask(item)));
    this.wrapper.innerHTML = '';
    this.wrapper.append(table);
  }

  bindRemoveTask(handler) {
    this.wrapper.addEventListener('click', ({ target }) => {
      if (target.closest('.task__delete > .task__button')) {
        const task = target.closest('.task');
        const taskID = task.dataset.id;
        task.remove();
        handler(taskID);
      }
    });
  }
}
