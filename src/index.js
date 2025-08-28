import "./styles.css"
import { addProject, deleteProject, Project } from "./project";
import { displaySideBar } from "./sideBar";


const projects = [];

addProject("Test", projects)
addProject("2nd Test", projects)

const toggleSideBar = document.getElementById("sidebar-toggle");
toggleSideBar.addEventListener("click", () => {
    displaySideBar(projects);
})



