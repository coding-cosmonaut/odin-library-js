const cardsContain = document.querySelector(".card-container");
const addNewBookBttn = document.querySelector(".new-book-bttn");
const modal = document.querySelector(".modal");
const modalDiv = document.querySelector("#closing-div");
const cancelModal = document.querySelector("#cancel");
const submitForm = document.querySelector("#bookForm");

let myLibrary = [];

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

Book.prototype.hasRead = function () {
  if (this.read === "true" || this.read === true) {
    return (this.read = false);
  } else {
    return (this.read = true);
  }
};

function addBookToLibrary(inputTitle, inputAuthor, inputPages, inputRead) {
  const newBook = new Book(
    inputTitle,
    inputAuthor,
    inputPages,
    `${inputRead ? true : false}`
  );
  myLibrary.push(newBook);
  displayToPage(newBook);
}

function removeInstance(event) {
  let getTitle = event.target.parentNode.firstElementChild.innerText;
  let dataIndex = event.target.parentNode.getAttribute("data-index");
  document.querySelector(`[data-index="${dataIndex}"]`).remove();
  myLibrary = myLibrary.filter((item) => item.title !== getTitle);
}

function toggle(event) {
  let getIdx = myLibrary.findIndex(
    (item) =>
      item.title ===
      event.target.parentNode.parentNode.firstElementChild.textContent
  );
  if (myLibrary[getIdx].hasRead()) {
    event.target.textContent = "Read";
  } else {
    event.target.textContent = "Not Read";
  }
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
            <li class="list-li">
                <button id='toggler' onclick='toggle(event)'>${
                  book.read == "true" ? "Read" : "Not Read"
                }</button>
            </li>
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
