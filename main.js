window.addEventListener('load',() => {
    
const form = document.getElementById('new-task-form');
const input = document.getElementById('new-task-input');
const list_el = document.getElementById('tasks'); 

LoadValuesFromLocalStorage();

form.addEventListener('submit', (e) =>{
    e.preventDefault(); 
    const task = input.value;

    if(!task) {
        alert('fill out the task'); 
        return;
    }

    var allTasks = [];
	
	if(localStorage.tasks != undefined){
		allTasks = JSON.parse(localStorage.getItem("tasks"));
	}

	allTasks.push(task);
	
   	localStorage.setItem("tasks", JSON.stringify(allTasks));


    GenerateNewTask(task);
    input.value = "";    
})


})

function LoadValuesFromLocalStorage() {
	if(localStorage.tasks != undefined)
	{
		var allTasks = JSON.parse(localStorage.getItem("tasks"));

		for (let i = 0; i < allTasks.length; i++) {
  			GenerateNewTask(allTasks[i]);
		}
	}
}

function GenerateNewTask(task){
    const list_el = document.getElementById('tasks'); 
	const task_el = document.createElement('div') 
    task_el.classList.add('task');


    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');
    

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = task;
    task_input_el.setAttribute('readonly', 'readonly');

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);
	var oldValue = "";

    task_edit_el.addEventListener('click', ()=>{
	
        if (task_edit_el.innerText.toLowerCase() == "edit") {
            task_input_el.removeAttribute("readonly");
            task_input_el.focus();
            task_edit_el.innerText = "Save";

	    oldValue = task_input_el.value;
        } else {
           task_input_el.setAttribute("readonly" , "readonly");
           task_edit_el.innerText = "Edit";

		var allTasks = JSON.parse(localStorage.getItem("tasks"));
		const indexToEdit = allTasks.indexOf(oldValue);

		if (indexToEdit !== -1) {
  			allTasks[indexToEdit] = task_input_el.value;
			localStorage.setItem("tasks", JSON.stringify(allTasks));
		}
		
	oldValue = "";
        }
    });

    task_delete_el.addEventListener('click' , () => {
        list_el.removeChild(task_el);
	
	var allTasks = JSON.parse(localStorage.getItem("tasks"));
	var indexToRemove = -1;
	if(oldValue != "")
	{
		indexToRemove = allTasks.indexOf(oldValue);
	}
	else{
		indexToRemove = allTasks.indexOf(task_input_el.value);
	}
	
	if (indexToRemove !== -1) {
		allTasks.splice(indexToRemove, 1);

		localStorage.setItem("tasks", JSON.stringify(allTasks));
	}
	

    });
}