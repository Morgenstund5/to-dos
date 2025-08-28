import { Todo } from "./todo";

export class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }

    addTodo(index, title, desc, dueDate, priority, done = false) { // change INDEX for ID later !!!
        const todo = new Todo(title, desc, dueDate, priority, done);
        this.todos.push(todo)
    }

    editProject(id, name, array) {
    const selectedProject = array[id]
    selectedProject.name = name
    }
}


export function addProject(name, array) {
    const newProject = new Project(name)
    array.push(newProject)
}

export function deleteProject(index, array) {
    array.splice(index, 1);
}



 