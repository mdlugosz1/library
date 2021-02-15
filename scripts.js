const shelf = document.querySelector('.shelf');

let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    myLibrary.push(book1);
    myLibrary.push(book2);
    myLibrary.push(book3);
}

const book1 = new Book('King', 'Cos tam', 150, false);
const book2 = new Book('Tolkien', 'Lord of the Rings', 1000, true);
const book3 = new Book('Tolkien', 'Hobbit', 1000, true);

addBookToLibrary();

function displayBooks(arr) {
    
}

displayBooks(myLibrary);


