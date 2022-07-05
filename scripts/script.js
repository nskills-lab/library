import { Book } from "./book.js";
const formContainer = document.querySelector("#form-container");
const overlay = document.querySelector("#overlay");
const form = document.querySelector("#new-book-form");
const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#pages-input");
const readToggle = document.querySelector("#switch-form");
const template = document.querySelector("#card-template");
const libaryContainer = document.querySelector(".library");
const errorsContainer = document.querySelector(".errors");
const errorsList = document.querySelector(".errors-list");
const titleLable = form.querySelector("[data-form-book-id]");
const formInputsArr = [title, author, pages];
const SWITCH_BOOK_ID = "switch-book-";
const generator = idGenerator();
let myLibrary = [];

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-btn='add']")) {
    formContainer.classList.toggle("open");
    overlay.classList.toggle("open");
  }
  if (e.target.matches("#form-close-btn")) {
    overlay.classList.toggle("open");
    formContainer.classList.toggle("open");
    clearForm();
    return;
  }
  if (e.target.matches("[data-btn-remove]")) {
    let card = e.target.closest(".card");
    let id = card.dataset.bookId;
    myLibrary = myLibrary.filter((book) => {
      return book.id !== id;
    });
    libaryContainer.removeChild(card);
  }
  if (e.target.matches("[data-btn-edit]")) {
    let card = e.target.closest(".card");
    populateForm(card);
    document.querySelector("[data-btn='add']").click();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();
  const errorMessages = {};
  const inputsObj = {};
  validateInputs(errorMessages, inputsObj);

  if (Object.keys(errorMessages).length > 0) {
    showErrors(errorMessages);
    e.preventDefault();
  } else {
    const book = addBookToLibrary(inputsObj);
    overlay.classList.toggle("open");
    formContainer.classList.toggle("open");
    renderBook(book);
    clearForm();
  }
});

function addBookToLibrary(inputsObj) {
  let bookToRender;
  if (inputsObj["id"] === undefined) {
    bookToRender = new Book(
      generator.next().value.toString(),
      inputsObj["Title"],
      inputsObj["Author"],
      inputsObj["Pages"],
      inputsObj["Read"]
    );
    myLibrary.push(bookToRender);
  } else {
    myLibrary.forEach((book) => {
      if (book.id === inputsObj["id"]) {
        for (let input in inputsObj) {
          book[input.toLocaleLowerCase()] = inputsObj[input];
        }
        bookToRender = book;
      }
    });
  }

  return bookToRender;
}

function renderBook(book) {
  let elementExists = libaryContainer.querySelector(
    `[data-book-id='${book.id}']`
  );
  let bookToRender;
  if (elementExists) {
    addOrUpdateBookToRender(elementExists, book);
  } else {
    bookToRender = template.content.cloneNode(true);

    const bookId = bookToRender.querySelector("[data-book-id]");
    bookId.dataset.bookId = book.id;
    addOrUpdateBookToRender(bookToRender, book);
    libaryContainer.appendChild(bookToRender);
  }
}

function clearErrors() {
  while (errorsList.children[0] != null) {
    errorsList.removeChild(errorsList.children[0]);
  }
  errorsContainer.classList.remove("show");
}

function showErrors(errorMessages) {
  for (const error in errorMessages) {
    const li = document.createElement("li");
    li.innerText = errorMessages[error];
    errorsList.appendChild(li);
  }
  errorsContainer.classList.add("show");
}

function clearForm() {
  errorsContainer.classList.toggle("show");
  title.value = "";
  author.value = "";
  pages.value = "0";
  if (readToggle.checked) {
    readToggle.click();
  }
  titleLable.dataset.formBookId = "";
  clearErrors();
}

function validateInputs(errorMessages, inputsObj) {
  formInputsArr.forEach((input) => {
    const inputName = input.getAttribute("name");
    const inputVal = input.value.trim();
    if (inputVal.length === 0 || inputVal === "0") {
      errorMessages[inputName] = `${inputName} cannot be empty`;
    } else {
      inputsObj[inputName] = inputVal;
    }
  });

  inputsObj["Read"] = false;
  if (readToggle.checked) {
    inputsObj["Read"] = true;
  }
  if (titleLable.dataset.formBookId !== "") {
    inputsObj["id"] = titleLable.dataset.formBookId;
  }
}

function populateForm(card) {
  let book = myLibrary.find((book) => {
    return book.id === card.dataset.bookId;
  });

  form.querySelectorAll("input").forEach((input) => {
    let attribute = input.getAttribute("name").toLocaleLowerCase();

    if (input.type == "checkbox") {
      input.checked = book[attribute];
    } else {
      input.value = book[attribute];
    }
  });
  titleLable.dataset.formBookId = book.id;
}

function addOrUpdateBookToRender(bookToRender, book) {
  const bookTitle = bookToRender.querySelector("[data-title]");

  bookTitle.innerText = `"${book.title}"`;

  const bookAuthor = bookToRender.querySelector("[data-author]");
  bookAuthor.innerText = `By: ${book.author}`;

  const bookPages = bookToRender.querySelector("[data-pages]");
  bookPages.innerText = `${book.pages} pages`;

  const bookRead = bookToRender.querySelector(".switch");
  bookRead.setAttribute("id", bookRead.getAttribute("id") + book.id);
  bookRead.disabled = true;
  bookRead.classList.add("switch-book-disabled");
  bookRead.checked = book.read;
  const label = bookToRender.querySelector("[data-label-switch]");
  label.setAttribute("for", SWITCH_BOOK_ID + book.id);
  label.classList.add("switch-book-disabled");
}

function* idGenerator() {
  let count = 2;
  while (true) {
    yield count++;
  }
}
