
const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");


const TODOS_KEY = "todos";
const CHECKTODOS_CLASSNAME = "line-through";

let toDos = [];

function checkToDo(event){
  const li = event.target.parentElement;
  const child = li.children[2];
  let checkBox =  li.children[0];
  checkBox.value === "unchecked" ? checkBox.value = "checked" : checkBox.value = "unchecked";

  saveToDos();
  child.classList.toggle(CHECKTODOS_CLASSNAME);
  console.log(li.children[0].value);
}

function saveToDos(){
  //localStorage.setItem("todos",toDos);
  localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function deleteToDo(event){
    const li = event.target.closest("li");
    console.dir(li);
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newToDo){
  const li = document.createElement("li");
  li.id = newToDo.id;
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.id = newToDo.id;
  checkBox.value = newToDo.value;
  checkBox.addEventListener("click", checkToDo);
  const label = document.createElement("label");
  label.htmlFor = newToDo.id;
  const span = document.createElement("span");
  span.innerText = newToDo.text;
  const button = document.createElement("button");
  button.innerHTML = "<i class='fas fa-window-close fa-lg'></i>";
  button.addEventListener("click", deleteToDo);
  li.appendChild(checkBox);
  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event){
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value="";
  const newToDoObj = {
    text:newToDo,
    id: Date.now(),
    value: "unchecked"
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}
toDoForm.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null){
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
