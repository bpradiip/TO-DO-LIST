//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const FilterOption = document.querySelector('.filter');

//eventListeners
document.addEventListener('DOMContentLoaded', Get_Todos_From_Localstorage)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
FilterOption.addEventListener('click', Filter_Todo);

//functions
function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    Saving_DATA(todoInput.value);
    const completed_Button = document.createElement('button');
    completed_Button.innerHTML = "<i class='fas fa-check'></i>";
    completed_Button.classList.add('complete_btn');
    todoDiv.appendChild(completed_Button);
    const delete_Button = document.createElement('button');
    delete_Button.innerHTML = "<i class='fas fa-trash'></i>";
    delete_Button.classList.add('trash');
    todoDiv.appendChild(delete_Button);
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}


function deleteTodo(e) {
    const item = e.target;
    if (item.classList[0] === "trash") {
        const todo = item.parentElement;
        todo.classList.add("animate_fall");

        todo.addEventListener('transitionend', function () {
            todo.remove();
            RemoveLocalTodo(todo);
        })
    }

    if (item.classList[0] === "complete_btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function Filter_Todo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "pending":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}


function Saving_DATA(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}
function Get_Todos_From_Localstorage() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        const completed_Button = document.createElement('button');
        completed_Button.innerHTML = "<i class='fas fa-check'></i>";
        completed_Button.classList.add('complete_btn');
        todoDiv.appendChild(completed_Button);
        const delete_Button = document.createElement('button');
        delete_Button.innerHTML = "<i class='fas fa-trash'></i>";
        delete_Button.classList.add('trash');
        todoDiv.appendChild(delete_Button);
        todoList.appendChild(todoDiv);
    });

}
function RemoveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const TodoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(TodoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
