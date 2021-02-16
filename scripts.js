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
    const formAuthor = document.querySelector('#author').value;
    const formTitle = document.querySelector('#title').value;
    const formPages = document.querySelector('#pages').value;

    const addedBook = new Book(formAuthor, formTitle, formPages);

    myLibrary.push(addedBook);

    tableBody.innerHTML = '';
}

function displayBooks(library) {   
    library.forEach(book => {
        const newRow = document.createElement('tr');
        tableBody.appendChild(newRow);
        
        for (let key in book) {
            const newCell = document.createElement('td');
            newRow.appendChild(newCell);
            newCell.textContent = book[key];
        }
    });
}


addButton.addEventListener('click', () => {
    form.classList.add('display-form');
})

submit.addEventListener('click', () => {
    addBookToLibrary();
    displayBooks(myLibrary);
});
