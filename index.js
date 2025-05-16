const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// función para leer datos desde db.json
function readData() {
  const jsonData = fs.readFileSync('./db.json', 'utf-8');
  return JSON.parse(jsonData);
}

// se muestra el contenido de db.json en consola 
const data = readData();
console.log('Contenido de db.json:', data);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a mi primera API con Node JS');
});

app.get('/books', (req, res) => {
  const data = readData();
  res.json(data.books);
});

app.get('/books/:id', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const book = data.books.find(b => b.id === id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Libro no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
