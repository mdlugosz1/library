const form = document.querySelector('form');
const addButton = document.querySelector('.new-book');
const tableBody = document.querySelector('tbody');
const submit = document.querySelector('.submit');

let myLibrary = [];

function Book(author, title, pages, read, buttons) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
    this.buttons = buttons
}

function addBookToLibrary() {
    let formAuthor = document.querySelector('#author').value;
    let formTitle = document.querySelector('#title').value;
    let formPages = document.querySelector('#pages').value;

    const addedBook = new Book(formAuthor, formTitle, formPages);

    myLibrary.push(addedBook);
    createTableRow();
    formAuthor.value = '';
}

function displayBooks(library) {

}

function createTableRow() {
    const newRow = document.createElement('tr');
    tableBody.appendChild(newRow);
    for (j = 0; j < 5; j++) {
        const newCell = document.createElement('td');
        newRow.appendChild(newCell);
    }
}

displayBooks(myLibrary);

addButton.addEventListener('click', () => {
    form.classList.add('display-form');
})

submit.addEventListener('click', () => {
    addBookToLibrary();
    displayBooks(myLibrary);
});
