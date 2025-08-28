import { Project } from "./project";

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

export function CreateTodo(title, desc, dueDate, priority, done) {

    Project.prototype.addTodo(title, desc, dueDate, priority, done);
}