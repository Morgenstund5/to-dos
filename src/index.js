import "./styles.css"
import { addProject, attachEventList, deleteProject, Project } from "./project";
import { displaySideBar, displayProjects } from "./sideBar";


export const projects = [];

addProject("Test", projects)
addProject("2nd Test", projects)
addProject("3rd Test", projects)

const toggleSideBar = document.getElementById("sidebar-toggle");
toggleSideBar.addEventListener("click", (e) => {
    e.preventDefault()
    displaySideBar(projects);
})




