const form = document.querySelector('.form');
const input = form.querySelector('.input');
const list = document.querySelector('.list');

if (localStorage.getItem('todo list')) readLocalStorage();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  if (!text) return;

  const status = form.querySelector('.input-radio:checked').value;
  createTodoItem(text, status);
  saveTodo();
  clearInput();
});

function createTodoItem(text, status) {
  const listItem = createElement(
    'li',
    'list-item',
    `status-${status}`,
    text,
    status
  );
  insertIntoDoom(list, listItem);
}

function createElement(element, class1, class2, text, status) {
  const e = document.createElement(element);
  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-delete');
  btn.title = 'remover';
  e.classList.add(class1, class2);
  e.dataset.status = status;
  e.textContent = text;
  e.append(btn);
  return e;
}

function insertIntoDoom(parent, element) {
  parent.append(element);
}

function clearInput() {
  input.value = '';
}

function saveTodo() {
  const listItems = list.querySelectorAll('.list-item');
  const listTodo = [];

  for (let item of listItems) {
    const list = {};

    const text = item.innerText;
    const data = item.getAttribute('data-status');

    list.text = text;
    list.status = data;

    listTodo.push(list);
  }

  const todoJSON = JSON.stringify(listTodo);
  localStorage.setItem('todo list', todoJSON);
}

function readLocalStorage() {
  const todo = localStorage.getItem('todo list');
  const listTodo = JSON.parse(todo);

  for (let item of listTodo) {
    const { text, status } = item;
    createTodoItem(text, status);
  }
}

document.addEventListener('click', (e) => {
  const element = e.target;
  if (element.classList.contains('btn-delete')) removeTodo(element);
});

function removeTodo(element) {
  const parent = element.parentElement;
  parent.remove();
  saveTodo();
}
