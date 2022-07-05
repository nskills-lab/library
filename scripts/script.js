import { addBookToLibrary, renderBook, LIBRARY_CONTAINER } from "./library.js";
import {
  clearForm,
  clearErrors,
  showErrors,
  validateInputs,
  populateForm,
} from "./form.js";
const formContainer = document.querySelector("#form-container");
const overlay = document.querySelector("#overlay");
const form = document.querySelector("#new-book-form");
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
    LIBRARY_CONTAINER.removeChild(card);
  }
  if (e.target.matches("[data-btn-edit]")) {
    let card = e.target.closest(".card");
    populateForm(card, myLibrary, form);
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
    const book = addBookToLibrary(inputsObj, generator, myLibrary);
    overlay.classList.toggle("open");
    formContainer.classList.toggle("open");
    renderBook(book);
    clearForm();
  }
});

function* idGenerator() {
  let count = 2;
  while (true) {
    yield count++;
  }
}
