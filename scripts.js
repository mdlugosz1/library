const formContainer = document.querySelector('.form-background');
const form = document.querySelector('form');
const addButton = document.querySelector('.new-book');
const tableBody = document.querySelector('tbody');
const submit = document.querySelector('.submit');
const closeButton = document.querySelector('.close');

let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    const formAuthor = document.querySelector('#author');
    const formTitle = document.querySelector('#title');
    const formPages = document.querySelector('#pages');
    const formIsRead = radioButtonsCheck(form, 'is-read');

    if ((formAuthor.value === '') || (formTitle.value === '') || (formPages.value === '')) {
        alert('Every form field must be filled!');
        return;
    } else {
        const addedBook = new Book(formAuthor.value, formTitle.value, formPages.value, formIsRead);
        myLibrary.push(addedBook);
        formContainer.classList.remove('form-background-visible');
    }

    clearForm(formAuthor, formTitle, formPages);
}

function displayBooks(library) {
    tableBody.innerHTML = '';

    library.forEach(book => {
        const newRow = document.createElement('tr');
        tableBody.appendChild(newRow);
        newRow.setAttribute('data', library.indexOf(book));

        for (let key in book) {
            const newCell = document.createElement('td');
            newRow.appendChild(newCell);
            newCell.textContent = book[key];
            newCell.setAttribute('class', key);
            newCell.setAttribute('data', library.indexOf(book));

            if (newCell.classList.contains('read')) {
                if (book[key] === true) {
                    newCell.style.color = 'green';
                    newCell.textContent = 'yes';
                } else {
                    newCell.style.color = 'red';
                    newCell.textContent = 'no';
                }
            }
        }

        addRemoveButton();
    });

    changeReadStatus();
    storeLibrary();
}

function clearForm(authorValue, titleValue, pagesValue) {
    authorValue.textContent = '';
    authorValue.value = '';
    titleValue.textContent = '';
    titleValue.value = '';
    pagesValue.textContent = '';
    pagesValue.value = '';
}

//Function checks if button is checked and then converts it' value to true/false
function radioButtonsCheck(form, name) {
    const radioButtons = form.elements[name];
    let radioValue;

    for (let i = 0; i < name.length; i++) {
        if (radioButtons[i].checked) {
            radioValue = radioButtons[i].value;

            if (radioValue === 'yes') {
                return true;
            } else {
                return false;
            }
        }
    }

    return radioValue;
}

function changeReadStatus() {
    const isReadCells = tableBody.querySelectorAll('.read');

    isReadCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellAtt = cell.getAttribute('data');
            const parAtt = cell.parentElement.getAttribute('data');

            if (cellAtt === parAtt) {
                myLibrary[cellAtt].read = !myLibrary[cellAtt].read;
                displayBooks(myLibrary);
            }
        })
    })
}

function removeBook(e) {
    const buttonValue = e.target.value;
    const rowToRemove = tableBody.querySelectorAll('tr');

    for (let i = 0; i <= rowToRemove.length; i++) {
        if (rowToRemove[i].getAttribute('data') === buttonValue) {
            myLibrary.splice(i, 1);
            break;
        }
    }

    displayBooks(myLibrary);
}

function addRemoveButton() {
    const selectRow = tableBody.querySelectorAll('tr');
    const removeButton = document.createElement('button');
    const cellForButtons = document.createElement('td');

    cellForButtons.appendChild(removeButton);
    removeButton.textContent = 'remove';

    for (let i = 0; i < selectRow.length; i++) {
        removeButton.value = selectRow[i].getAttribute('data');
        selectRow[i].appendChild(cellForButtons);
        removeButton.addEventListener('click', removeBook);
    }
}

function closeForm() {
    formContainer.classList.remove('form-background-visible');
}

addButton.addEventListener('click', () => {
    formContainer.classList.add('form-background-visible');
});

closeButton.addEventListener('click', closeForm);

submit.addEventListener('click', () => {
    addBookToLibrary();
    displayBooks(myLibrary);
});

//Code for local storage

function storeLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function getLibrary() {
    const library = localStorage.getItem('myLibrary');
    myLibrary = JSON.parse(library);
}

window.onload = () => {
    myLibrary !== null ? getLibrary() : myLibrary = [new Book('Cormac McCarthy', 'The Road', 287, true), new Book('Stephen King', 'Dark Tower', 554, false)];
    displayBooks(myLibrary);
}
