const errorsContainer = document.querySelector(".errors");
const errorsList = document.querySelector(".errors-list");
const titleLable = document.querySelector("[data-form-book-id]");
const readToggle = document.querySelector("#switch-form");
const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#pages-input");
const formInputsArr = [title, author, pages];

export function showErrors(errorMessages) {
  for (const error in errorMessages) {
    const li = document.createElement("li");
    li.innerText = errorMessages[error];
    errorsList.appendChild(li);
  }
  errorsContainer.classList.add("show");
}

export function clearErrors() {
  while (errorsList.children[0] != null) {
    errorsList.removeChild(errorsList.children[0]);
  }
  errorsContainer.classList.remove("show");
}

export function clearForm() {
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

export function validateInputs(errorMessages, inputsObj) {
  formInputsArr.forEach((input) => {
    const inputName = input.getAttribute("name");
    const inputVal = input.value.trim();
    if (inputVal.length === 0 || inputVal === "0") {
      errorMessages[inputName] = `${inputName} cannot be empty`;
    } else if (inputName == "Pages" && inputVal <= 0) {
      errorMessages[inputName] = "Pages cannot be a negative number.";
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

export function populateForm(card, myLibrary, form) {
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
