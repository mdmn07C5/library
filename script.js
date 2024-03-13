// class Book {
//     constructor(title, author, pages, read) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.read = read;
//     }

//     info() {
//         return [this.title, this.author, this.pages, this.read].join(', ');
//     };
// }

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return [this.title, this.author, this.pages, this.read];    
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function newDomElmnt(type) {
    return document.createElement(type);
}

function createBookCard(book, index) {
    const bookCard = newDomElmnt('div');
        
    bookCard.classList.add('card');

    const bookImage = newDomElmnt('div');
    bookImage.classList.add('image');
    bookImage.style.backgroundColor = 'gray';
    bookCard.appendChild(bookImage);

    const bookInfo = newDomElmnt('div');
    bookInfo.classList.add('info');
    book.info().forEach((e) => {
        const p = newDomElmnt('p');
        p.innerHTML = e;
        bookInfo.appendChild(p);
    })
    bookCard.appendChild(bookInfo);

    const removeButton = document.createElement('button');
    
    return bookCard;
}


function showLibrary() {
    const libraryContainer = document.querySelector('#library');

    myLibrary.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        libraryContainer.appendChild(bookCard);
    })
}


addBookToLibrary('The Black Company', 'Cook, Glenn', 320, true);
addBookToLibrary('Gardens of the Moon', 'Erikson, Steven', 666, true);
addBookToLibrary('Silmarillion', 'Tolkien, J.R.R.', 432, false);


showLibrary()


const newBookDialog = document.querySelector('#newBook');
const showButton = document.querySelector('#showDialog');
showButton.addEventListener('click', () => {
    newBookDialog.showModal();
})

const addNewBookButton = document.querySelector('#addNewBookBtn');
const outputBox = document.querySelector('output');


function addNewBookFromDialog() {
    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    let pagesInput = document.querySelector('#pages').value;
    const readInput = document.querySelector('#read').value;

    pagesInput = isNaN(pagesInput) ? 0 : pagesInput;
    addBookToLibrary(titleInput, authorInput, pagesInput, readInput);

    // create new book card to display on page
    const newBook = createBookCard(myLibrary.at(-1));
    document.querySelector('#library').appendChild(newBook);


    newBookDialog.close();
}

addNewBookButton.addEventListener('click', () => {
    addNewBookFromDialog();
})



myLibrary.forEach((book, i) => {
    console.log(book.info() + ': ' + i);
})
myLibrary.splice(1, 1);
myLibrary.forEach((book, i) => {
    console.log(book.info() + ': ' + i);
})