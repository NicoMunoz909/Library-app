let myLibrary = [];

function Book(title,author,pages,read,coverUrl = "https://www.pasionfallera.com/images/no-image.jpg") {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.coverUrl = coverUrl,
  this.bookCard = createBookCard(this)
}

function createBookCard(book) {
  const element = document.createElement('div');
  element.classList.add('book-card');

  const infoDiv = document.createElement('div');
  infoDiv.id = 'book-info';

  const imgDiv = document.createElement('div');
  imgDiv.id = 'img-container';
  const cover = document.createElement('img');
  cover.src = book.coverUrl;
  imgDiv.appendChild(cover);
  element.appendChild(imgDiv)

  const title = document.createElement('h2');
  title.textContent = book.title;
  title.id = 'title';
  infoDiv.appendChild(title);

  const author = document.createElement('p');
  author.textContent = book.author;
  author.id = 'author';
  infoDiv.appendChild(author);

  const pages = document.createElement('p');
  pages.textContent = book.pages+" pages";
  pages.id = 'pages';
  infoDiv.appendChild(pages);

  const read = document.createElement('p');
  if (book.read) {
    read.textContent = "Read"
  } else {
    read.textContent = "Not Read"
  }
  read.id = 'read'
  infoDiv.appendChild(read);

  

  const buttonsDiv = document.createElement('div');

  const delete_btn = document.createElement("button");
  delete_btn.addEventListener("click",deleteBook.bind(book));
  delete_btn.id = 'delete-btn';
  const delete_icon = document.createElement('i');
  delete_icon.classList.add('fas');
  delete_icon.classList.add('fa-trash');
  delete_btn.appendChild(delete_icon);
  buttonsDiv.appendChild(delete_btn);

  const edit_btn = document.createElement("button");
  edit_btn.addEventListener("click",openEditBookForm.bind(book));
  edit_btn.id = 'edit-btn';
  const edit_icon = document.createElement('i');
  edit_icon.classList.add('fas');
  edit_icon.classList.add('fa-edit');
  edit_btn.appendChild(edit_icon);
  buttonsDiv.appendChild(edit_btn);

  buttonsDiv.classList.add('card-buttons')
  infoDiv.appendChild(buttonsDiv);
  element.appendChild(infoDiv);
  return element
}

function addBookToLibrary(title,author,pages,read,coverUrl = "https://www.pasionfallera.com/images/no-image.jpg" ) {
  myLibrary.push(new Book(title,author,pages,read,coverUrl))
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

function showBooks() {
  myLibrary.forEach(book => insertBookCard(book))
}

function insertBookCard(book) {
  const container = document.getElementById("book-list");
  container.appendChild(book.bookCard);
}

function deleteBook() {
  myLibrary.splice(myLibrary.indexOf(this),1)
  const bookList = document.getElementById("book-list")
  bookList.removeChild(this.bookCard)
  updateLibraryInfo();
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
  const pages = document.getElementById('add-pages').value
  const read = document.getElementById('add-read').checked
  if (read) {
    addBookToLibrary(title,author,pages,true)
  } else {
    addBookToLibrary(title,author,pages,false)
  }
  updateLibraryInfo();
  closeAddBookForm();
  insertBookCard(myLibrary[myLibrary.length-1]);
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
  const pages = document.getElementById('edit-pages');
  pages.value = book.pages;
  const read = book.read;
  if (read) {
    document.getElementById('edit-read').checked = true;
  } else {
    document.getElementById('edit-not-read').checked = true;
  }
  const editButton = document.getElementById('editform-btn');
  editButton.dataset.bookIndex = myLibrary.indexOf(this);
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

function editBookCallback() {
  const editButton = document.getElementById('editform-btn');
  const index = editButton.dataset.bookIndex;
  const book = myLibrary[index];
  const bookCard = book.bookCard;
  
  const title = document.getElementById('edit-title').value;
  bookCard.children[1].textContent = title;
  book.title = title;

  const author = document.getElementById('edit-author').value;
  bookCard.children[2].textContent  = author;
  book.author = author;

  const pages = document.getElementById('edit-pages').value;
  bookCard.children[3].textContent  = pages + " pages";
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

const addBookBtn = document.getElementById("add-book-btn")
addBookBtn.addEventListener('click',openAddBookForm)

addBookToLibrary("Narnia","CS Lewis",256,true,"https://images-na.ssl-images-amazon.com/images/I/51WbmTRk-4L._SX331_BO1,204,203,200_.jpg")
addBookToLibrary("Harry Potter","JK Rowling",543,false,"https://prodimage.images-bn.com/pimages/9780590353427_p0_v2_s550x406.jpg")
addBookToLibrary("Harry Potasdater","JK Rowling",543,true)

showBooks();
updateLibraryInfo();