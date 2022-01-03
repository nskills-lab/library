import { v4 } from "./node_modules/uuid/dist/esm-browser/index.js";
const formContainer = document.querySelector("#form-container");
const overlay = document.querySelector("#overlay");
const form = document.querySelector("#new-book-form");
const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#pages-input");
const readToggle = document.querySelector("#switch-form");
const notes = document.querySelector("#notes");
const formSubmitBtn = document.querySelector("#form-btn");
const template = document.querySelector("#card-template");
const libaryContainer = document.querySelector(".library");
const errorsContainer = document.querySelector(".errors");
const errorsList = document.querySelector(".errors-list");
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

    if (book === undefined) {
        return;
    }
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
    const errorMessages = [];
    clearErrors();
    const titleVal = title.value;
    if (titleVal.length < 1) {
        errorMessages.push("Book title cannot be empty.");
    } else {
        title.value = "";
    }

    const authorVal = author.value;
    if (authorVal.length < 1) {
        errorMessages.push("Author's name cannot be empty.");
    } else {
        author.value = "";
    }
    const pagesVal = pages.value;
    console.log(pagesVal);
    if (pagesVal === "0") {
        errorMessages.push("Pages cannot be zero.");
    } else {
        pages.value = "0";
    }

    const notesVal = notes.value;
    notes.value = "";
    let hasReadVal = "";
    if (readToggle.checked) {
        hasReadVal = true;
        readToggle.click();
    } else {
        hasReadVal = false;
    }

    if (errorMessages.length > 0) {
        showErrors(errorMessages);
        overlay.classList.toggle("open");
        formContainer.classList.toggle("open");

        e.preventDefault();
    } else {
        const book = new Book(
            v4(),
            titleVal,
            authorVal,
            pagesVal,
            hasReadVal,
            notesVal
        );
        myLibrary.push(book);
        return book;
    }
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
    const bookRead = bookToRender.querySelector(".switch");
    bookRead.setAttribute("id", bookRead.getAttribute("id") + book.id);
    bookRead.checked = book.hasRead;
    const label = bookToRender.querySelector("[data-label-switch]");
    label.setAttribute("for", label.getAttribute("for") + book.id);
    const bookNotes = bookToRender.querySelector("[data-notes]");
    bookNotes.innerText = `Notes:  ${book.notes}`;
    libaryContainer.appendChild(bookToRender);
}

function clearErrors() {
    while (errorsList.children[0] != null) {
        errorsList.removeChild(errorsList.children[0]);
        console.log(errorsList.children[0]);
    }
    errorsContainer.classList.remove("show");
}

function showErrors(errorMessages) {
    errorMessages.forEach((errorMessage) => {
        const li = document.createElement("li");
        li.innerText = errorMessage;
        errorsList.appendChild(li);
    });
    errorsContainer.classList.add("show");
}