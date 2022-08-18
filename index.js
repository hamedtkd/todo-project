const todoTitle = document.getElementById("todoTitel");
const todoDesc = document.getElementById("todoDesc");
const todoSubmit = document.getElementById("todoSubmit");
const mainTodo = document.getElementById("mainTodo");
const alertTodo = document.getElementById("alertTodo");

function getLsItems() {
   let savedLcTodo = localStorage.getItem("todolist");
   return JSON.parse(savedLcTodo)?.sort((a,b) => a.id - b.id) || [];
}

const savedTodo = [...getLsItems()];

const alertForNull = (massage, option) => {

   alertTodo.style.right = "0%"
   alertTodo.children[1].addEventListener('click', () => {
      alertTodo.style.right = "100%";
   });
   setTimeout(function () {
      alertTodo.style.right = "100%";
      alertTodo.children[0].innerHTML = massage;



   }, option.time | 3000);
}

const handelNewTodo = (event) => {
   event.preventDefault();
   if (!todoTitle.value) return alertForNull("enter a title", {
      type: "eror",
      time: 3000,
   })
   if (!todoDesc.value) return alertForNull("enter a discription ", {
      time: null
   })

   const newTodo = {
      id: Date.now(),
      todoTitleHead: todoTitle.value,
      todoDescpar: todoDesc.value,
      cheked: false,

   };
   savedTodo.push(newTodo);
   localStorage.setItem("todolist", JSON.stringify(savedTodo));


   creatNewTodo(newTodo.todoTitleHead, newTodo.todoDescpar, newTodo.id)


}
const creatNewTodo = (title, desc, id, cheked) => {
   const actionBtns = {
      edit: "Edit",
      delete: "Delete",
      chek: "Check"
   }
   const listItem = document.createElement("li");

   listItem.id = id;
   const headTitleTodo = document.createElement("h3");
   const inputTitle = document.createElement("input");
   inputTitle.disabled = true;
   inputTitle.className = 'INPUT-TITLE';
   headTitleTodo.appendChild(inputTitle);


   inputTitle.defaultValue = title;

   const pargraph = document.createElement("p");
   const inputParagraph = document.createElement("input");
   inputParagraph.disabled = true;
   inputParagraph.className = 'INPUT-TITLE';
   pargraph.appendChild(inputParagraph);
   inputParagraph.value = desc;


   const deleteBtn = document.createElement("button");
   deleteBtn.innerHTML = actionBtns.delete;

   const editBtn = document.createElement("button")
   editBtn.innerHTML = actionBtns.edit;

   const updateBtn = document.createElement("button")
   updateBtn.innerHTML = actionBtns.chek;
   if (cheked) {
      updateBtn.innerHTML = "Cheked"
      updateBtn.style.background = "green"
      updateBtn.style.color = "white"

   }

   const divisonOfHead = document.createElement("div")
   const divisonOfbtns = document.createElement("div")

   listItem.appendChild(divisonOfHead);
   listItem.appendChild(divisonOfbtns);
   divisonOfHead.appendChild(headTitleTodo);
   divisonOfHead.appendChild(pargraph);
   divisonOfbtns.appendChild(deleteBtn)
   divisonOfbtns.appendChild(editBtn)
   divisonOfbtns.appendChild(updateBtn)

   mainTodo.appendChild(listItem);
   listItem.className = "list-item-todo"
   divisonOfbtns.className = "action-btn"
   deleteBtn.className = "btn btn-outline-danger px-3"
   updateBtn.className = "btn btn-outline-success px-3"
   editBtn.className = "btn btn-outline-dark  px-3 "

}

function render() {
   getLsItems().forEach(todo => {
      creatNewTodo(todo.todoTitleHead, todo.todoDescpar, todo.id, todo.cheked)
   })
}
render()


todoSubmit.addEventListener("click", handelNewTodo)



mainTodo.addEventListener('click', (e) => {

   if (e.target.innerText === "Delete") {
      const parentEl = e.target.parentElement.parentElement.id;
      const filteredSaveTodo = getLsItems().filter((item) => item.id !== Number(parentEl));
      localStorage.setItem('todolist', JSON.stringify(filteredSaveTodo));
      mainTodo.innerHTML = ""
      render()
   } else if (e.target.innerText === "Check") {
      const parentEl = e.target.parentElement.parentElement.id;
      const filteredSaveTodo = getLsItems().filter((item) => item.id === Number(parentEl));
      const updateFilteredTodo = {
         ...filteredSaveTodo[0],
         cheked: true
      }
      const filteredSaveTodos = getLsItems().filter((item) => item.id !== Number(parentEl));
      const updateFilteredTodoSave = [...filteredSaveTodos, updateFilteredTodo]


      localStorage.setItem('todolist', JSON.stringify(updateFilteredTodoSave));
      mainTodo.innerHTML = ""
      render()


   } else if (e.target.innerText === "Edit") {
      const parentEl = e.target.parentElement.parentElement;

      parentEl.children[0].children[0].children[0].disabled = false;
      parentEl.children[0].children[1].children[0].disabled = false
      parentEl.children[0].children[0].children[0].style.width = "100%"
      parentEl.children[0].children[0].children[0].style.backgroundColor = "#e9ecef"
      parentEl.children[0].children[1].children[0].style.width = "100%"
      parentEl.children[0].children[1].children[0].style.backgroundColor = "#e9ecef"
      parentEl.children[0].children[0].children[0].select();


      e.target.innerText = "Save";
      e.target.style.backgroundColor = "green"
      e.target.style.color = "white"

      e.target.addEventListener("click", () => {
         const filtredTodo = getLsItems().filter(
            (item) => item.id === Number(parentEl.id)
         );
         const updateFiltredTodo = {
            ...filtredTodo[0],
            todoTitleHead: parentEl.children[0].children[0].children[0].value,
            todoDescpar: parentEl.children[0].children[1].children[0].value
         };

         const filtredTodos = getLsItems().filter(
            (item) => item.id !== Number(parentEl.id)
         );
         const updateFilteredTodoSave = [...filtredTodos, updateFiltredTodo];
         localStorage.setItem("todolist", JSON.stringify(updateFilteredTodoSave));
         mainTodo.innerHTML = ""
         render()
      })

   }
})