//selectors
const todoInput = document.querySelector('.todo-input'); //selects the class in the HTML
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//event listeners
document.addEventListener('DOMContentLoaded', getTodos); //load exising todos after the page is loaded
todoButton.addEventListener('click', addTodo); // on click, execute addTodo function below
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//functions

function addTodo(event){
    event.preventDefault(); //prevent form from submitting

    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item'); //classList JavaScript allows us to add, remove, replace, toggle or check whether the specified CSS class is present or not
    todoDiv.appendChild(newTodo); //newTodo is now within Todo Div

    //save todos to local storage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'; //adds HTML
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>'; //adds HTML
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
}


function deleteCheck(e){
    const item = e.target; //event.target property can be used in order to implement event delegation
    //Delete todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement; //to refer to the whole to do item of which the trash button is a child, and not just delete the trash button
        todo.classList.add('fall'); //to add animation in CSS
        removeLocalTodos(todo); //delete todo from local storage
        // transitionend listener is fired when a CSS transition ends, function is placed inside the event listener as an anonymous function
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    //Check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed"); //add a classList "completed" when clicked so that we can reference this in CSS and change the CSS to strikeout the todo item
    }
}

//filter
function filterTodo(e) {
    const todos = todoList.childNodes; //select all the todos
    todos.forEach(function(todo){ //loops over each todo
        switch (e.target.value) { //value refers to the HTML "all", "completed", "uncompleted"
            case "all":
                todo.style.display = 'flex'; //follow what we have with CSS
                break;
            case "completed":
                if(todo.classList.contains('completed')) { //check for todos that have the class of completed added to them
                    todo.style.display = 'flex';
                }   else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }   else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

//save todos

function saveLocalTodos(todo){
    //check if i already have todo in local storage
    let todos;
    if(localStorage.getItem('todos') === null) { //if no such item, then create an empty array
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //if todos exists already, parse the items in it into an array
    }
    todos.push(todo); //push todo into todos array
    localStorage.setItem('todos', JSON.stringify(todos)); //saving the array back into the local storage, JSON.stringify() static method converts a JavaScript value to a JSON string
}

//display todos that were in local storage

function getTodos(){
    // check if there's anything in local storage. if no, create array, if have get it back
    let todos;
    if(localStorage.getItem('todos') === null) { //if no such item, then create an empty array
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //if todos exists already, parse the items in it into an array
    }
    todos.forEach(function(todo) {
    
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo; //get from local storage
    newTodo.classList.add('todo-item'); //classList JavaScript allows us to add, remove, replace, toggle or check whether the specified CSS class is present or not
    todoDiv.appendChild(newTodo); //newTodo is now within Todo Div

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'; //adds HTML
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>'; //adds HTML
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null) { //if no such item, then create an empty array
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //if todos exists already, parse the items in it into an array
    }
    const todoIndex = todo.children[0].innerText; //get the index of the array of the deleted item
    todos.splice(todos.indexOf(todoIndex), 1); // first input is from what position to remove the element, second input is how many elements to remove
    localStorage.setItem('todos', JSON.stringify(todos))
}