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
    const formIsRead = radioButtonsCheck(form, 'is-read');

    const addedBook = new Book(formAuthor, formTitle, formPages, formIsRead);
    
    myLibrary.push(addedBook);

    tableBody.innerHTML = '';
}

//Function checks if button is checked and then returns it's value
function radioButtonsCheck(form, name) {
    const radioButtons = form.elements[name];
    let radioValue;

    for (let i = 0; i < name.length; i++) {
        if (radioButtons[i].checked) {
            radioValue = radioButtons[i].value;
            break;
        }
    }
    return radioValue;
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
