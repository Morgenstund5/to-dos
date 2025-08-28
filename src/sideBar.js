
export function displaySideBar(projects) {
    const existingSideBar = document.querySelector(".side-bar")
    const main = document.getElementById("main");
    if(existingSideBar) {
        main.removeChild(existingSideBar);
    } else {
        const sideBar = document.createElement("aside");
    sideBar.classList = "side-bar";

    displayProjects(projects, sideBar)

    main.prepend(sideBar)
    }
}

function displayProjects(projects, sideBar) {
    const defaultSections = document.createElement("div");
    defaultSections.classList = "default-sections"
    defaultSections.innerHTML = `
                                <p>All To-Do's</p>
                                <p>Today's</p>
                                <p>Important</p>
                                                `
    sideBar.appendChild(defaultSections);

    const projectsDiv = document.createElement("div");
    projectsDiv.classList = "projects";
    projectsDiv.innerHTML = `
                            <h2>Projects</h2>
                            `

    const ulProjects = document.createElement("ul");
    projects.forEach(project => {
        const projEl = document.createElement("li");
        const title = document.createElement("span");
        title.classList = "project-title";
        title.innerText = `${project.name}`
        projEl.appendChild(title);
        const actionsDiv = document.createElement("div")
        actionsDiv.classList = "actions";
        actionsDiv.innerHTML = `
                                <button><i class="fa-solid fa-pencil"></i></button>
                                <button><i class="fa-solid fa-trash"></i></button>
                                `

        projEl.appendChild(actionsDiv);

        ulProjects.appendChild(projEl)
    });

    projectsDiv.appendChild(ulProjects)

    sideBar.appendChild(projectsDiv);

    const addProjBtn = document.createElement("button");
    addProjBtn.id = "add-project";
    addProjBtn.innerText = "+ Add Project";
    sideBar.appendChild(addProjBtn);

}
