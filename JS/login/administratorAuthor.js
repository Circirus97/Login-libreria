//Selectores

const formAddAuthor = document.getElementById("formAddAuthor");
const nameAuthor = document.getElementById("name");
const authorAge = document.getElementById("age");
const formBooks = document.getElementById("formBooks");
const nameBook = document.getElementById("nameBook");
const dateBooks = document.getElementById("dateBooks");
const authorBooks = document.getElementById("authorBook");
const URLAuthors = "http://localhost:3000/authors";
const URLBooks = "http://localhost:3000/books";
const listBooks = document.getElementById("listBooks")

//------ Como activar el JSON Web Server:
// cd para buscar la carpeta y con clink derecho encima de la carpeta se busca la ruta
//json-server --watch database.json
//npx json-server --watch database.json

//Eventos

document.addEventListener("DOMContentLoaded", () => {
  loadSelectAuthor();

  getBooks();

});

formAddAuthor.addEventListener("submit", (event) => {
  event.preventDefault();

  addAuthor();
});


formBooks.addEventListener("submit", (event)=>{
    event.preventDefault();

    createBook()
})

//Funciones

async function getBooks(){
    const response = await fetch(`${URLBooks}?_embed=author`)
    const data = await response.json()
    console.log(data);

    data.forEach(books => {
        listBooks.innerHTML += `
        <li>
            Name: ${books.name}, 
            Date: ${books.date}, 
            Author: ${books.author.name} 
        </li>
        `
    })

}

function createBook(){
console.log("dsss");
    const newBook = {
        name: nameBook.value,
        date: dateBooks.value,
        authorId : authorBooks.value
    }

    fetch(URLBooks, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(newBook)
    })
}

async function loadSelectAuthor() {
  // 1- Obtener todos lo autores => GET

  const response = await fetch(URLAuthors);
  const data = await response.json();
    console.log(authorBooks);
  // 2- Recorrer la lista de autores y por cada autor crear una etiqueta option,
  //llenar el value y el titulo y agregarlo dentro centro del select

  await data.forEach((author) => {
    const optionAuthor = document.createElement("option");
    optionAuthor.textContent = author.name
    optionAuthor.value = author.id
    authorBooks.appendChild(optionAuthor)
    
  });

}

async function addAuthor() {
  try {
    await fetch(URLAuthors, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nameAuthor.value, age: authorAge.value }),
    });

  } catch (error) {
    console.log("Ocurrio un error al crear el autor");
  }
}
