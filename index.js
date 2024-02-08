class MyLibrary {
  constructor() {
    this.myBooks = [];
  }
  get books() {
    return this.myBooks;
  }
  getIdx(book) {
    if (this.myBooks.includes(book)) {
      return this.myBooks.indexOf(book);
    }
  }
  addBook(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    this.myBooks.push(newBook);
    return newBook;
  }
  removeBook(event) {
    let target = event.target.parentNode.getAttribute("data-idx");
    this.myBooks.splice(target, 1);
    event.target.parentNode.remove();
    this.updateArr();
  }
  updateArr() {
    const currDOMBooks = document.querySelectorAll("ul");
    this.books.forEach((item, idx) => {
      currDOMBooks.item(idx).setAttribute("data-idx", idx);
    });
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  hasRead(event) {
    this.read = !this.read;
    if (event.target.textContent === "Read") {
      event.target.textContent = "Not Read";
      event.target.classList.remove("success-read");
      event.target.classList.add("failed-noread");
    } else {
      event.target.textContent = "Read";
      event.target.classList.add("success-read");
      event.target.classList.remove("failed-noread");
    }
  }
}

let myLibrary = new MyLibrary();

const cardsContain = document.querySelector(".card-container");
const addNewBookBttn = document.querySelector(".new-book-bttn");
const modal = document.querySelector(".modal");
const modalDiv = document.querySelector("#closing-div");
const cancelModal = document.querySelector("#cancel");
const form = document.querySelector("#bookForm");
const hiddenP = document.querySelector(".hidden");

function getFormData() {
  let formData = Object.fromEntries(new FormData(form));
  return formData;
}

function toggleModal() {
  if (modal.open) {
    modal.close();
  } else {
    modal.showModal();
  }
}

function toggleHiddenP(value) {
  if (value !== "remove") {
    hiddenP.classList.add("hidden");
  } else {
    hiddenP.classList.remove("hidden");
  }
}

function checkDuplicateTitleAndAddBook(event) {
  event.preventDefault();
  let data = getFormData();
  if (!myLibrary.myBooks.some((item) => item.title === data.title)) {
    displayToPage(
      myLibrary.addBook(data.title, data.author, data.pages, data.read)
    );
    toggleHiddenP();
    toggleModal();
    form.reset();
  } else {
    toggleHiddenP("remove");
  }
}

function displayToPage(book) {
  let idx = myLibrary.getIdx(book);
  let bookEntries = Object.entries(book);

  let ul = document.createElement("ul");
  let readBttn = document.createElement("button");
  readBttn.addEventListener("click", () => {
    book.hasRead(event);
  });
  let removeBttn = document.createElement("button");
  removeBttn.textContent = "Remove";
  removeBttn.setAttribute("id", "remove");
  removeBttn.addEventListener("click", () => {
    myLibrary.removeBook(event);
  });
  ul.classList.add("list-ul");
  ul.setAttribute("data-idx", idx);

  for (let [item, value] of bookEntries) {
    let li = document.createElement("li");
    if (item === "read") {
      readBttn.classList.add(`${value ? "success-read" : "failed-noread"}`);
      readBttn.setAttribute("id", "toggler");
      readBttn.textContent = `${
        value ? (value = "Read") : (value = "Not Read")
      }`;

      ul.append(readBttn);
      break;
    }
    li.classList.add("list-li");
    li.textContent = value;
    ul.append(li);
  }
  ul.append(removeBttn);
  cardsContain.append(ul);
}

//EVENTS
form.addEventListener("submit", checkDuplicateTitleAndAddBook);
addNewBookBttn.addEventListener("click", toggleModal);
cancelModal.addEventListener("click", toggleModal);
cancelModal.addEventListener("click", toggleHiddenP);
modal.addEventListener("click", toggleModal);
modalDiv.addEventListener("click", (e) => e.stopPropagation());
//EVENTS
