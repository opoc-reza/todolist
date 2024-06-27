let formClose = document.querySelector(".form__close");
let modal = document.querySelector(".modal");
let addTodo = document.querySelector(".addTodo");
let formTitle = document.querySelector(".form__title");
let formInput = document.querySelector(".form__input");
let descInput = document.querySelector("#form__description");
let submitTitle = document.querySelector(".form-end__submit");
let wrapper = document.querySelector(".wrappers");
let setting = document.querySelector(".setting");
let getId = 0;
let month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let isFlag = false;

setting.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.className.includes("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  if (isFlag) {
    isFlag = false;
    setting.innerHTML = `🌑`;
  } else {
    isFlag = true;
    setting.innerHTML = `🌕`;
  }
});



descInput.addEventListener("keydown", (event) => {
  descInput.style.height = "auto";

  descInput.style.height = descInput.scrollHeight + "px";
});

let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let isUpdate = false;
let note = [];

function showModal(title, desc) {
  if (isUpdate) {
    formTitle.innerHTML = "update your todo💫";
    submitTitle.innerHTML = "update todo💫";

    formInput.value = title;
    descInput.value = desc;
    formClose.addEventListener("click", () => {
      isUpdate = false;
    });
  } else {
    formTitle.innerHTML = "Add a new Todo😶‍🌫️";
    submitTitle.innerHTML = "Add Todo😶‍🌫️";
  }
  modal.classList.add("modal--active");
}
submitTitle.addEventListener("click", makeData);
addTodo.addEventListener("click", showModal);

function makeData() {
  if (isUpdate) {
    note.some((item, index) => {
      if (index == getId) {
        (item.title = formInput.value),
          (item.desc = descInput.value),
          (item.date = backTime() + "edited");
      }
    });
    todosGenerator(note);
    setToLocal(note);
    isUpdate = false;
  } else {
    let newObj = {
      title: formInput.value,
      desc: descInput.value,
      date: backTime(),
    };
    note.push(newObj);
    setToLocal(note);
    todosGenerator(note);
  }
}

function setToLocal(item) {
  localStorage.setItem("todos", JSON.stringify(item));
}

formClose.addEventListener("click", () => {
  modal.classList.remove("modal--active");
});

function removeAllTodo() {
  if (wrapper.querySelectorAll(".todo")) {
    wrapper.querySelectorAll(".todo").forEach((item) => item.remove());
  }
}

function todosGenerator(items) {
  removeAllTodo();
  items.forEach((item, index) => {
    wrapper.insertAdjacentHTML(
      "beforeend",
      `
              <div class="todo">
          <div class="todo-top">
            <h1 class="todo__title">${item.title}</h1>

            <p class="todo__caption">${item.desc}</p>
          </div>
          <div class="todo-bottom">
            <p class="todo__date">${item.date}</p>
            <div class="todo__option" onclick="todoOption(this)">|+_+|
              <ul class="todo__option-menu">
                <li class="todo__option-menu-item" onclick="editHandler(${index}, '${item.title}', '${item.desc}')">Edit</li>
                <li class="todo__option-menu-item" onclick="deleteHandler(this, ${index})">delete</li>
              </ul>
            </div>
          </div>
        </div>
      `
    );
  });
}

function editHandler(index, title, desc) {
  console.log(index, title, desc);
  //   console.log(event.parentElement)
  // event.parentElement.classList.remove('modal--active')
  getId = index;
  isUpdate = true;
  showModal(title, desc);
}

function deleteHandler(item, index) {
  note.splice(index, 1);
  todosGenerator(note);
  setToLocal(note);
}

window.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target.className !== "todo__option") {
    if (event.target.querySelector(".todo__option-menu")) {
      event.target
        .querySelector(".todo__option-menu")
        .classList.remove("option--active");
    }
  }
});

function todoOption(item) {
  item.querySelector(".todo__option-menu").classList.add("option--active");
}

function getTodoFromLocal() {
  let getAll = localStorage.getItem("todos");
  if (getAll) {
    note = JSON.parse(getAll);
  } else {
    note = [];
  }
  return note;
}

window.addEventListener("load", () => {
  let getAllData = getTodoFromLocal();
  todosGenerator(getAllData);
  let getTheme = localStorage.getItem('theme')
  console.log(getTheme)
  if (getTheme === 'dark') {
    document.body.classList.add('dark')
  }else {
    document.body.classList.remove('dark')
  }
});

function backTime() {
  let nowTime = new Date();
  let getHours = nowTime.getHours();
  let getMonth = nowTime.getMonth();
  let getYear = nowTime.getFullYear();
  let getDay = nowTime.getDay();
  let getMinute = nowTime.getMinutes();

  return `${getYear},${month[getMonth]},${day[getDay]}(${getHours}:${getMinute})`;
}
console.log(backTime());
