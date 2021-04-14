let myLibrary = [];
let bookCardList = []

function Book(title,author,genre,pages,read) {
  this.title = title,
  this.author = author,
  this.genre = genre,
  this.pages = pages,
  this.read = read
}

function addBookToLibrary(title,author,genre,pages,read) {
  myLibrary.push(new Book(title,author,genre,pages,read))
}

function createBookCard(book) {
  const element = document.createElement('div');
  element.classList.add('book-card');
  element.id = book.title;
  
  const title = document.createElement('h2');
  title.textContent = book.title;
  title.id = 'title';
  element.appendChild(title);

  const author = document.createElement('p');
  author.textContent = book.author;
  author.id = 'author';
  element.appendChild(author);

  const genre = document.createElement('p');
  genre.textContent = book.genre;
  genre.id = 'genre';
  element.appendChild(genre);

  const pages = document.createElement('p');
  pages.textContent = "Pages: "+book.pages;
  pages.id = 'pages';
  element.appendChild(pages);

  const read = document.createElement('p');
  if (book.read) {
    read.textContent = "Read"
  } else {
    read.textContent = "Not Read"
  }
  read.id = 'read'
  element.appendChild(read);

  const delete_btn = document.createElement("button")
  delete_btn.textContent = "Delete"
  delete_btn.addEventListener("click",deleteBook.bind(book))
  element.appendChild(delete_btn)

  const edit_btn = document.createElement("button")
  edit_btn.textContent = "Edit"
  edit_btn.addEventListener("click",openEditBookForm.bind(book))
  element.appendChild(edit_btn)

  return element
}

function updateLibraryInfo() {
  const booksNumber = document.getElementById('books-number');
  booksNumber.textContent = 'Number of Books: ' + myLibrary.length
  const booksRead = document.getElementById('books-read');
  const reads = myLibrary.reduce((read,book) => {
    if (book.read) {
      read++;
      return read;
    } else {
      return read;
    }
  },0)
  booksRead.textContent = 'Books read: '+reads;
}


function insertBook(book) {
  const bookCard = createBookCard(book);
  bookCardList.push(bookCard)
  const container = document.getElementById("book-list");
  const addBookBtn = document.getElementById("add-book-btn")
  container.appendChild(bookCard);
}

function editBook() {
  let id = document.getElementById('identification').textContent;
  const bookCard = document.getElementById(id);
  const book = myLibrary[myLibrary.findIndex(book => book.title == id)];
  
  const title = document.getElementById('edit-title').value;
  bookCard.children[0].textContent = title;
  book.title = title;
  bookCard.id = title;
  id = title;

  const author = document.getElementById('edit-author').value;
  bookCard.children[1].textContent  = author;
  book.author = author;

  const genre = document.getElementById('edit-genre').value;
  bookCard.children[2].textContent  = genre;
  book.genre = genre;

  const pages = document.getElementById('edit-pages').value;
  bookCard.children[3].textContent  = "Pages: "+pages;
  book.pages = parseInt(pages);

  if (document.getElementById('edit-read').checked) {
    bookCard.children[4].textContent  = 'Read';
    book.read = true;
  } else {
    bookCard.children[4].textContent  = 'Not Read';
    book.read = false;
  }
  updateLibraryInfo();
  closeEditBookForm();
  
}

function deleteBook() {
  myLibrary.splice(myLibrary.indexOf(this),1)
  const bookList = document.getElementById("book-list")
  bookList.removeChild(document.getElementById(this.title))
  updateLibraryInfo();
}

function showBooks() {
  myLibrary.forEach(book => insertBook(book))
}

function openAddBookForm() {
  const form = document.getElementById("add-book-form");
  const opaque = document.getElementById('opaque')
  opaque.style.display = "block"
  form.reset();
  form.style.opacity = 1
  form.style.display = "block"
}

function closeAddBookForm() {
  const form = document.getElementById("add-book-form");
  const opaque = document.getElementById('opaque')
  opaque.style.display = "none"
  form.reset();
  form.style.opacity = 0
  form.style.display = "none"
}

function addBookCallback() {
  const title = document.getElementById('add-title').value
  const author = document.getElementById('add-author').value
  const genre = document.getElementById('add-genre').value
  const pages = document.getElementById('add-pages').value
  const read = document.getElementById('add-read').checked
  if (read) {
    addBookToLibrary(title,author,genre,pages,true)
  } else {
    addBookToLibrary(title,author,genre,pages,false)
  }
  updateLibraryInfo();
  closeAddBookForm();
  insertBook(myLibrary[myLibrary.length-1]);
}

function openEditBookForm() {
  const form = document.getElementById("edit-book-form");
  form.reset();
  const opaque = document.getElementById('opaque')
  opaque.style.display = "block"
  let book = this;
  const id = document.getElementById('identification');
  id.textContent = book.title;
  const title = document.getElementById('edit-title');
  title.value = book.title;
  const author = document.getElementById('edit-author');
  author.value = book.author;
  const genre = document.getElementById('edit-genre');
  genre.value = book.genre;
  const pages = document.getElementById('edit-pages');
  pages.value = book.pages;
  const read = book.read;
  if (read) {
    document.getElementById('edit-read').checked = true;
  } else {
    document.getElementById('edit-not-read').checked = true;
  }
  form.style.opacity = 1
  form.style.display = "block"
}

function closeEditBookForm() {
  const form = document.getElementById("edit-book-form");
  const opaque = document.getElementById('opaque')
  opaque.style.display = "none"
  form.reset();
  form.style.opacity = 0
  form.style.display = "none"
}



const addBookBtn = document.getElementById("add-book-btn")
addBookBtn.addEventListener('click',openAddBookForm)

addBookToLibrary("Narnia","Unknown","Fiction",256,true)
addBookToLibrary("Harry Potter","JK Rowling","Fiction",543,false)
addBookToLibrary("Harry Potasdater","JK Rowling","Fiction",543,true)

showBooks();
updateLibraryInfo();