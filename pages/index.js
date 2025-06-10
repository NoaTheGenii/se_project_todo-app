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

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoData = {
      ...item,
      id: uuidv4(),
    };
    Object.assign(item, todoData);
    const todo = new Todo(todoData, "#todo-template", {
      onDelete: (todoData) => {
        const index = initialTodos.findIndex((todo) => todo.id === todoData.id);
        if (index !== -1) {
          initialTodos.splice(index, 1);
          todoCounter.updateCompleted(initialTodos);
          todoCounter.updateTotal();
        }
      },
      onComplete: (todoData) => {
        const todo = initialTodos.find((todo) => todo.id === todoData.id);
        if (todo) {
          todo.completed = todoData.completed;
          todoCounter.updateCompleted(initialTodos);
        }
      },
    });
    const todoElement = todo.getView();

    section.addItem(todoElement);
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
    const todo = new Todo(todoData, "#todo-template", {
      onDelete: (todoData) => {
        const index = initialTodos.findIndex((todo) => todo.id === todoData.id);
        if (index !== -1) {
          initialTodos.splice(index, 1);
          todoCounter.updateCompleted(initialTodos);
          todoCounter.updateTotal();
        }
      },
      onComplete: (todoData) => {
        const todo = initialTodos.find((todo) => todo.id === todoData.id);
        if (todo) {
          todo.completed = todoData.completed;
          todoCounter.updateCompleted(initialTodos);
        }
      },
    });
    const todoElement = todo.getView();

    section.addItem(todoElement);

    initialTodos.push(todoData);

    todoCounter.updateTotal();

    newFormValidator.resetValidation();

    addTodoPopupEl.close();
  },
});

addTodoPopupEl._getInputValues();
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
