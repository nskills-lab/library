import { v4 } from "uuid";
const formContainer = document.querySelector("#form-container");
const overlay = document.querySelector("#overlay");
const form = document.querySelector("#new-book-form");
const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#pages-input");
const hasRead = document.querySelector("#has-read");
const notes = document.querySelector("#notes");
const formSubmitBtn = document.querySelector("#form-btn");
const template = document.querySelector("#card-template");
let myLibrary = [];

//To-do:

// Add a way to remove the book card
// Add a way to update the book card

document.addEventListener("click", (e) => {
    if (e.target.matches("[data-btn='add']")) {
        formContainer.classList.toggle("open");
        overlay.classList.toggle("open");
    }
    if (e.target.matches("#form-close-btn")) {
        overlay.classList.toggle("open");
        formContainer.classList.toggle("open");
        return;
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary(e);
});

// Add a way to store the input values and add a card with the values

function Book(id, title, title, pages, hasRead, notes) {
    this.id = id;
    this.title = title;
    this.title = title;
    this.pages = pages;
    this.hasRead = hasRead;
    this.notes = notes;
}

function addBookToLibrary(e) {
    const titleVal = title.value;
    const authorVal = author.value;
    const pagesVal = pages.value;
    const notesVal = notes.value;

    const book = new Book(v4(), titleVal, authorVal, pagesVal, "Read", notesVal);
    myLibrary.push(book);
    console.log(myLibrary);
}