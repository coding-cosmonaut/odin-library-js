const cardsContain = document.querySelector(".card-container");
const addNewBookBttn = document.querySelector(".new-book-bttn");
const modal = document.querySelector(".modal");
const modalDiv = document.querySelector("#closing-div");
const cancelModal = document.querySelector("#cancel");
const submitForm = document.querySelector("#bookForm");

const myLibrary = [];

submitForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(submitForm);
  let parsedData = Object.fromEntries(formData);

  if (!myLibrary.some((item) => item.title === parsedData.title)) {
    addBookToLibrary(
      parsedData.title,
      parsedData.author,
      parsedData.pages,
      parsedData.read
    );
    modal.close();
    submitForm.reset();
  }
});

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

function addBookToLibrary(inputTitle, inputAuthor, inputPages, inputRead) {
  const newBook = new Book(inputTitle, inputAuthor, inputPages, inputRead);
  myLibrary.push(newBook);
  displayToPage(newBook);
}

function removeInstance(event) {
  let dataIndex = event.target.parentNode.getAttribute("data-index");
  document.querySelector(`[data-index="${dataIndex}"]`).remove();
  myLibrary.splice(dataIndex, 1);
}

function displayToPage(addedObj) {
  let idx = myLibrary.findIndex((item) => item.title === addedObj.title);
  let newArr = [addedObj];
  for (let book of newArr) {
    cardsContain.innerHTML += `
        <ul data-index=${idx} class="list-ul">
            <li class="list-li">${book.title}</li>
            <li class="list-li">${book.author}</li>
            <li class="list-li">${book.pages}</li>
            <li class="list-li">${book.read}</li>
            <button onclick='removeInstance(event)' id='remove' >Remove</button>
        </ul>`;
  }
}

addNewBookBttn.addEventListener("click", () => {
  modal.showModal();
});

modal.addEventListener("click", () => modal.close());

modalDiv.addEventListener("click", (event) => event.stopPropagation());

cancelModal.addEventListener("click", () => modal.close());
