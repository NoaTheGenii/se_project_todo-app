import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const handleModalEscape = (evt) => {
  if (evt.key === "Escape" || evt.key === 27) {
    const openedModal = document.querySelector(".popup_visible");
    closeModal(openedModal);
  }
};

function exitModal(evt) {
  if (evt.target === addTodoPopup) {
    closeModal(addTodoPopup);
  }
}

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleModalEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleModalEscape);
};

const generateTodo = (data) => {
  const todoData = {
    ...data,
    id: uuidv4(),
  };
  const todo = new Todo(todoData, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  newFormValidator.resetValidation();
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoPopup.addEventListener("click", exitModal);

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();
