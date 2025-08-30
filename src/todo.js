

export class Todo {
    constructor(title, desc, dueDate, priority, done = false) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
        this.id = crypto.randomUUID();
    }
}


export function displayTodos(project) {
    const main = document.getElementById("main");
    let mainContent = document.querySelector(".main-content");
    if (!mainContent) {
        mainContent = document.createElement("div");
        mainContent.classList = "main-content";
        main.appendChild(mainContent);
    } else {
        mainContent.innerHTML = ""; 
    }
    
    const todosDiv = document.createElement("div")
    todosDiv.classList = "todos";
    const projectTodos = project.todos
    if(projectTodos.length < 1) {
        todosDiv.innerHTML = `<p class="no-todos">Nothing to do here!</p>`
    } else {
        projectTodos.forEach(todo => {
        const todoCard = document.createElement("div");
        todoCard.classList = "todo-card";

        const titleTodo = document.createElement("span");
        titleTodo.classList = "todo-todo";
        titleTodo.innerText = `${todo.title}`;
        todoCard.appendChild(titleTodo);

        const todoDesc = document.createElement("p");
        todoDesc.classList = "todo-description";
        todoDesc.innerText = `${todo.desc}`;
        todoCard.appendChild(todoDesc);

        const dueDateTodo = document.createElement("span");
        dueDateTodo.classList = "todo-date";
        dueDateTodo.innerText = `Due: ${todo.dueDate}`;
        todoCard.appendChild(dueDateTodo);

        const priorTodo = document.createElement("span");
        priorTodo.classList = `${todo.priority === "important" ? "priority important" : "priority not-important"}`;
        priorTodo.innerText = `${todo.priority === "important" ? "Important" : " Not important"}`
        todoCard.appendChild(priorTodo);

        const todoActions = document.createElement("div");
        todoActions.classList = "todo-actions";
        todoActions.innerHTML = `
                                    <button class="${todo.done ? "done-btn" : "not-done-btn"}">${todo.done ? "Done" : "Not Done"}</button>
                                    <button class="edit-btn">Edit</button>
                                    <button class="delete-btn">Delete</button>  
                                `
        todoCard.appendChild(todoActions)
        

        
        todosDiv.appendChild(todoCard);
    });}
    
    const addTodoBtn = document.createElement("button");
    addTodoBtn.id = "add-todo-btn";
    addTodoBtn.innerText = "+ Add To-do";

    mainContent.appendChild(todosDiv)

    mainContent.appendChild(addTodoBtn);

    addTodoBtn.addEventListener("click", () => {
        displayTodoForm(mainContent, project)
    })
}

// title, desc, dueDate, priority, done = false

    function displayTodoForm(parent, project) {
        const addTodoForm = document.createElement("form")
        addTodoForm.id = "add-todo-form";
        addTodoForm.innerHTML = `<h3>Add To-Do</h3>

                                <label for="todo-title">Title:</label>
                                <input type="text" id="todo-title" name="title" required>

                                <label for="todo-description">Description:</label>
                                <textarea id="todo-description" name="description" rows="3" required></textarea>

                                <label for="todo-priority">Priority:</label>
                                <select id="todo-priority" name="priority" required>
                                    <option value="important">Important</option>
                                    <option value="not-important">Not Important</option>
                                </select>

                                <label for="todo-date">Due date:</label>
                                <input type="date" id="todo-date" name="date" required>

                                <label for="todo-done">Status:</label>
                                <select id="todo-done" name="done" required>
                                    <option value="false">Not Done</option>
                                    <option value="true">Done</option>
                                </select>

                                <button type="submit" id="submit-todo-btn">Add To-Do</button>
                                <button type="button" id="cancel-add-todo">Cancel</button>
                                

        `

        
        const backDrop = document.createElement("div");
        backDrop.id = "add-todo-backdrop";

        backDrop.appendChild(addTodoForm)
        parent.appendChild(backDrop)

        const cancelAddTodo = document.getElementById("cancel-add-todo");
        cancelAddTodo.addEventListener("click", () => {
            parent.removeChild(backDrop);
        })

        const confirmAddTodoBtn = document.getElementById("submit-todo-btn");
        confirmAddTodoBtn.addEventListener("click", (e) => {
         
           e.preventDefault()

          const titleVal = addTodoForm.title.value;
          const descVal = addTodoForm.description.value;
          const dueDateVal = addTodoForm.date.value;
          const priorityVal = addTodoForm.priority.value;
          const doneVal = addTodoForm.done.value;


          project.addTodo(titleVal, descVal, dueDateVal, priorityVal, doneVal);
          parent.removeChild(backDrop)
          displayTodos(project)
        })
    }
/* 

<div class="main-content">
        <h2>Todos</h2>
        <div class="todos">
        <div class="todo-card">
          <span class="todo-title">Sample Todo 1</span>
          <p class="todo-description">Description for sample todo</p>
          <span class="todo-date">Due: 2025-08-30</span>
          <span class="priority important">Important</span>
          <div class="todo-actions">
            <button class="not-done-btn">Not Done</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>

        <div class="todo-card">
          <span class="todo-title">Sample Todo 2</span>
          <p class="todo-description">Another description</p>
          <span class="todo-date">Due: 2025-09-02</span>
          <span class="priority not-important">Not Important</span>
          <div class="todo-actions">
            <button class="done-btn">Done</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
        <div class="todo-card">
          <span class="todo-title">Sample Todo 1</span>
          <p class="todo-description">Description for sample todo</p>
          <span class="todo-date">Due: 2025-08-30</span>
          <span class="priority important">Important</span>
          <div class="todo-actions">
            <button class="not-done-btn">Not Done</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
        <div class="todo-card">
          <span class="todo-title">Sample Todo 1</span>
          <p class="todo-description">Description for sample todo</p>
          <span class="todo-date">Due: 2025-08-30</span>
          <span class="priority important">Important</span>
          <div class="todo-actions">
            <button class="not-done-btn">Not Done</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
        <div class="todo-card">
          <span class="todo-title">Sample Todo 1</span>
          <p class="todo-description">Description for sample todo</p>
          <span class="todo-date">Due: 2025-08-30</span>
          <span class="priority important">Important</span>
          <div class="todo-actions">
            <button class="not-done-btn">Not Done</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </main>

*/