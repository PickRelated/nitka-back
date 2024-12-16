const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const multer = require('multer')

app.use(express.static('uploads'))

const books = [
  {
    id: '1',
    title: 'Seed book',
    description: 'Seed description',
    coverPath: '',
  }
]

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
)

const upload = multer({ dest: 'uploads' })

app.use(bodyParser.json())

app.get('/books', async (req, res, next) => {
  return res.send(books.map(({ id, title }) => ({ id, title })))
})

app.post('/books', upload.single('file'), async (req, res, next) => {
  const { title, description } = req.body
  const newBook = { id: (books.length + 1).toString(), title: title || 'New Book', description, coverPath: req.file.filename }
  books.push(newBook)
  res.send(newBook)
})

app.get('/books/:id', async (req, res, next) => {
  const book = books.find(({ id }) => id === req.params.id)
  if (!book) {
    return res.sendStatus(404)
  }
  res.send(book)
})

app.listen(7788, () => console.info('App listening on port 7788'))
