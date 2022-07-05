import { Book } from "./book.js";
const template = document.querySelector("#card-template");
export const LIBRARY_CONTAINER = document.querySelector(".library");
const SWITCH_BOOK_ID = "switch-book-";

export function addBookToLibrary(inputsObj, generator, myLibrary) {
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

export function renderBook(book) {
  let elementExists = LIBRARY_CONTAINER.querySelector(
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
    LIBRARY_CONTAINER.appendChild(bookToRender);
  }
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
