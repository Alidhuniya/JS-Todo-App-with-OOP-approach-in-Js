// Book Class: Represents a Book
class Book {
    constructor(heading, desc, date, time) {
      this.heading = heading;
      this.desc = desc;
      this.date = date;
      this.time = time;
      
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#container__todoList');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.heading}</td>
        <td>${book.desc}</td>
        <td>${book.date}</td>
        <td>${book.time}</td>
       
        <td><a href="#" class="delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#container__bookForm');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#container__heading').value = '';
      document.querySelector('#container__desc').value = '';
      document.querySelector('#container__date').value = '';
      document.querySelector('#container__time').value = '';
     
    }
    }
  
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(time) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.time === time) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book
  document.querySelector('#container__bookForm').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const heading = document.querySelector('#container__heading').value;
    const desc = document.querySelector('#container__desc').value;
    const date = document.querySelector('#container__date').value;
    const time = document.querySelector('#container__time').value;
    
  
  
    // Validaate
    if(heading === '' || desc === '' || time === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate book
      const book = new Book(heading, desc, date, time);
  
      // Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // Show success message
      UI.showAlert('Book Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Book
  document.querySelector('#container__todoList').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
  });







