const form = document.querySelector('form');
const addButton = document.querySelector('.new-book');
const tableBody = document.querySelector('tbody');
const submit = document.querySelector('.submit');

let myLibrary = [new Book('Cormac McCarthy', 'The Road', 287, true), new Book('Cormac McCarthy', 'No Country for Old men', 287, false)];

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
        alert('Fill all info');
        return;
    } else {
        const addedBook = new Book(formAuthor.value, formTitle.value, formPages.value, formIsRead);
        myLibrary.push(addedBook);
        form.classList.remove('display-form');
    }

    clearForm(formAuthor, formTitle, formPages);
}

function clearForm(authorValue, titleValue, pagesValue) {
    authorValue.textContent = '';
    authorValue.value = '';
    titleValue.textContent = '';
    titleValue.value = '';
    pagesValue.textContent = '';
    pagesValue.value = '';
}

//Function checks if button is checked and then returns it's value
function radioButtonsCheck(form, name) {
    const radioButtons = form.elements[name];
    let radioValue;

    for (let i = 0; i < name.length; i++) {
        if (radioButtons[i].checked) {
            radioValue = radioButtons[i].value;
            radioButtons[i].checked = false;

            if (radioValue === 'yes') {
                return true;
            } else {
                return false;
            }
        }
    }

    return radioValue;
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
        
        addEditButtons();
    });
    
    changeReadStatus();
}

function changeReadStatus() {
    const isReadCells = tableBody.querySelectorAll('.read');
    
    isReadCells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.getAttribute('data') === cell.parentElement.getAttribute('data')) {
                myLibrary[cell.getAttribute('data')].read = !myLibrary[cell.getAttribute('data')].read;
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

function addEditButtons() {
    const selectRow = tableBody.querySelectorAll('tr');
    const removeButton = document.createElement('button');
    const cellForButtons = document.createElement('td');
    
    cellForButtons.appendChild(removeButton);
    removeButton.textContent = 'remove';
    
    for (let i = 0; i < selectRow.length; i++) {
        removeButton.value = selectRow[i].getAttribute('data');
        selectRow[i].appendChild(cellForButtons);
        removeButton.addEventListener('click', removeBook)
    }
}

addButton.addEventListener('click', () => {
    form.classList.add('display-form');
})

submit.addEventListener('click', () => {
    addBookToLibrary();
    displayBooks(myLibrary);
});

displayBooks(myLibrary);