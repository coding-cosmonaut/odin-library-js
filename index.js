const cardsContain = document.querySelector(".card-container");
const addNewBookBttn = document.querySelector(".new-book-bttn");

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

addNewBookBttn.addEventListener("click", () => {});

// addBookToLibrary('Hobbit','J.R.R.', 234, 'read')
// addBookToLibrary('Fascist','Uknown', 294, 'not read')

displayToPage();