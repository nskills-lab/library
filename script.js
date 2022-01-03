import { v4 } from "./node_modules/uuid/dist/esm-browser/index.js";
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
const libaryContainer = document.querySelector(".library");
const myLibrary = [];

//To-do:

// Add a way to remove the book card
// Add a way to update the book card
// add input validation: if the inputs are zero no card is added

document.addEventListener("click", (e) => {
    if (e.target.matches("[data-btn='add']")) {
        formContainer.classList.toggle("open");
        overlay.classList.toggle("open");
    }
    if (e.target.matches("#form-close-btn") || e.target.matches("#form-btn")) {
        overlay.classList.toggle("open");
        formContainer.classList.toggle("open");
        return;
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const book = addBookToLibrary(e);
    renderBook(book);
});

function Book(id, title, author, pages, hasRead, notes) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.notes = notes;
}

function addBookToLibrary(e) {
    const titleVal = title.value;
    title.value = "";
    const authorVal = author.value;
    author.value = "";
    const pagesVal = pages.value;
    pages.value = "";
    const notesVal = notes.value;
    notes.value = "";
    // let hasReadVal = "";
    // if (hasRead.checked) {
    //     hasReadVal = "Read";
    //     hasRead.click();
    // } else {
    //     hasReadVal = "Unread";
    // }

    const book = new Book(v4(), titleVal, authorVal, pagesVal, "Read", notesVal);
    myLibrary.push(book);
    return book;
}

function renderBook(book) {
    const bookToRender = template.content.cloneNode(true);
    const bookId = bookToRender.querySelector("[data-book-id");
    bookId.dataset.bookId = book.id;
    const bookTitle = bookToRender.querySelector("[data-title]");
    bookTitle.innerText = `"${book.title}"`;
    const bookAuthor = bookToRender.querySelector("[data-author]");
    bookAuthor.innerText = `By ${book.author}`;
    const bookPages = bookToRender.querySelector("[data-pages]");
    bookPages.innerText = `${book.pages} pages`;
    const bookRead = bookToRender.querySelector("[data-status]");
    // bookRead.innerText = book.hasRead;
    const bookNotes = bookToRender.querySelector("[data-notes]");
    bookNotes.innerText = `Notes:  ${book.notes}`;
    libaryContainer.appendChild(bookToRender);
}

//create a function that can toggle on/off read status