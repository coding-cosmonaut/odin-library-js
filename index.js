const cardsContain = document.querySelector(".card-container");
const addNewBookBttn = document.querySelector(".new-book-bttn");
const modal = document.querySelector(".modal");
const modalDiv = document.querySelector("#closing-div");
const cancelModal = document.querySelector("#cancel");

const myLibrary = [];

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

function addBookToLibrary(inputTitle, inputAuthor, inputPages, inputRead) {
  const newBook = new Book(inputTitle, inputAuthor, inputPages, inputRead);
  myLibrary.push(newBook);
}

function displayToPage() {
  for (let book of myLibrary) {
    cardsContain.innerHTML += `
        <ul class="list-ul">
            <li class="list-li">${book.title}</li>
            <li class="list-li">${book.author}</li>
            <li class="list-li">${book.pages}</li>
            <li class="list-li">${book.read}</li>
        </ul>`;
  }
}

addNewBookBttn.addEventListener("click", () => {
  modal.showModal();
});

modal.addEventListener("click", () => modal.close());

modalDiv.addEventListener("click", (event) => event.stopPropagation());

cancelModal.addEventListener("click", () => modal.close());

// addBookToLibrary('Hobbit','J.R.R.', 234, 'read')
// addBookToLibrary('Fascist','Uknown', 294, 'not read')

displayToPage();
