class TodoCounter {
  constructor({ todos, selector }) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._todos = todos;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted(todosArray) {
    this._completed = todosArray.filter((todo) => todo.completed).length;
    this._updateText();
  }

  updateTotal() {
    this._total = this._todos.length;
    this._updateText();
  }

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
