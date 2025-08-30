import { attachEventList, deleteProject } from "./project";
import { displayTodos } from "./todo";

export function displaySideBar(projects) {
    const existingSideBar = document.querySelector(".side-bar")
    const main = document.getElementById("main");
    if(existingSideBar) {
        main.removeChild(existingSideBar);
    } else {
        const sideBar = document.createElement("aside");
    sideBar.classList = "side-bar";

    main.prepend(sideBar)

    displayProjects(projects)
    
    

    }
}

export function displayProjects(projects) {
    const sideBar = document.querySelector(".side-bar")
    sideBar.innerHTML = ``
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
        projEl.dataset.id = `${project.id}`
        const title = document.createElement("span");
        title.classList = "project-title";
        title.dataset.id = `${project.id}`
        title.innerText = `${project.name}`
        projEl.appendChild(title);
        const actionsDiv = document.createElement("div")
        actionsDiv.classList = "actions";
        actionsDiv.innerHTML = `
                                <button class="edit-prj" data-id="${project.id}"><i class="fa-solid fa-pencil"></i></button>
                                <button class="delete-prj" data-id="${project.id}"><i class="fa-solid fa-trash"></i></button>
                                `

        projEl.appendChild(actionsDiv);

        ulProjects.appendChild(projEl);
        attachTodosListeners(projEl, projects)
    });

    projectsDiv.appendChild(ulProjects)

    sideBar.appendChild(projectsDiv);

    const addProjBtn = document.createElement("button");
    addProjBtn.id = "add-project";
    addProjBtn.innerText = "+ Add Project";
    sideBar.appendChild(addProjBtn);

    attachProjectListeners(projects)
}

function attachTodosListeners(projEl, projects) {
    projEl.addEventListener("click", () => {
            const id = projEl.dataset.id;
            const selProj = projects.find((projEl) => projEl.id === id);
            displayTodos(selProj);
        })
    }


function attachProjectListeners(projects) {
  const ulProjects = document.querySelector(".projects ul"); 

  ulProjects.addEventListener("click", (event) => {
    const target = event.target.closest("button"); 
    if (!target) return;

    if (target.classList.contains("delete-prj")) {
      const id = target.dataset.id;
      const index = projects.findIndex((project) => project.id === id);
      if (index !== -1) {
        deleteProject(index, projects);
        displayProjects(projects);
      }
    }

    if (target.classList.contains("edit-prj")) {
      const id = target.dataset.id;
      const title = document.querySelector(`.project-title[data-id="${id}"]`);
      const project = projects.find(project => project.id === id)
      title.innerText = ``;
      title.innerHTML = `
                            <input class="input-edit-pjr-name" value="${project.name}"></input>
                            <div class="edit-pjr-name-action">
                                <button class="confirm-edit-pjr-name">Confirm</button>
                                <button class="cancel-edit-pjr-name">Cancel</button>
                            </div>
                        `
        document.querySelectorAll(".edit-prj").forEach(btn => {
                if (btn !== target) btn.disabled = true;
            });
        
        const confirmEditPrj = document.querySelector(".confirm-edit-pjr-name");
        confirmEditPrj.addEventListener("click", () => {
           const newName = document.querySelector(".input-edit-pjr-name").value
            project.editProject(id, newName, projects)
            title.innerHTML = ``;
            displayProjects(projects)  
        })

        const cancelEditPrj = document.querySelector(".cancel-edit-pjr-name");
        cancelEditPrj.addEventListener("click", () => {
            title.innerHTML = ``;
            displayProjects(projects) 
        })
      
    }
  });
}


