import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");

function onComplete(completed) {
  todoCounter.updateCompleted(completed);
}

function onDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const renderTodo = (todoData) => {
  const todo = new Todo(todoData, "#todo-template", {
    onDelete: (todoData) => {
      onDelete(todoData.completed);
    },
    onComplete: (todoData) => {
      onComplete(todoData.completed);
    },
  });
  const todoElement = todo.getView();
  section.addItem(todoElement);
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoData = {
      ...item,
      id: uuidv4(),
    };
    Object.assign(item, todoData);

    renderTodo(todoData);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoPopupEl = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const date = new Date(formData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const todoData = {
      name: formData.name,
      date: date,
      id: uuidv4(),
      completed: false,
    };
    renderTodo(todoData);

    initialTodos.push(todoData);

    todoCounter.updateTotal(true);

    newFormValidator.resetValidation();

    addTodoPopupEl.close();
  },
});

addTodoPopupEl.setEventListeners();

const todoCounter = new TodoCounter({
  todos: initialTodos,
  selector: ".counter__text",
});

addTodoButton.addEventListener("click", () => {
  addTodoPopupEl.open();
});

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();
