// T-O-D-O  Class: Represents a Todo
class Todo {
  constructor(heading, desc, date, time) {
    this.heading = heading;
    this.desc = desc;
    this.date = date;
    this.time = time;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayTodos() {
    const lists = Store.getTodos();

    lists.forEach((list) => UI.addListtoTodo(list));
  }

  static addListtoTodo(list) {
    const listitem = document.querySelector("#container__todoList");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${list.heading}</td>
        <td>${list.desc}</td>
        <td>${list.date}</td>
        <td>${list.time}</td>
       
        <td><a href="#" class="delete">X</a></td>
      `;

    listitem.appendChild(row);
  }

  static deleteTodo(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#container__bookForm");
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#container__heading").value = "";
    document.querySelector("#container__desc").value = "";
    document.querySelector("#container__date").value = "";
    document.querySelector("#container__time").value = "";
  }
}

// Store Class: Handles Storage
class Store {
  static getTodos() {
    let lists;
    if (localStorage.getItem("lists") === null) {
      lists = [];
    } else {
      lists = JSON.parse(localStorage.getItem("lists"));
    }

    return lists;
  }

  static addTodo(list) {
    const lists = Store.getTodos();
    lists.push(list);
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  static removeTodo(time) {
    const lists = Store.getTodos();

    lists.forEach((list, index) => {
      if (list.time === time) {
        lists.splice(index, 1);
      }
    });

    localStorage.setItem("lists", JSON.stringify(lists));
  }
}

// Event: Display Todos
document.addEventListener("DOMContentLoaded", UI.displayTodos);

// Event: Add a Todo
document
  .querySelector("#container__bookForm")
  .addEventListener("submit", (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const heading = document.querySelector("#container__heading").value;
    const desc = document.querySelector("#container__desc").value;
    const date = document.querySelector("#container__date").value;
    const time = document.querySelector("#container__time").value;

    // Validate
    if (heading === "" || desc === "" || date === "" || time === "") {
      UI.showAlert("Please fill in all fields", "danger");
    } else {
      // Instatiate book
      const list = new Todo(heading, desc, date, time);

      // Add todo to UI
      UI.addListtoTodo(list);

      // Add todo to store
      Store.addTodo(list);

      // Show success message
      UI.showAlert("Book Added", "success");

      // Clear fields
      UI.clearFields();
    }
  });

// Event: Remove a Todo
document
  .querySelector("#container__todoList")
  .addEventListener("click", (e) => {
    // Remove todo from UI
    UI.deleteTodo(e.target);

    // Remove todo from store
    Store.removeTodo(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlert("Book Removed", "remove");
  });
