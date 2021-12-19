require('dotenv').config()
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT

app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Joan Gavelán',
    titulo: 'Curso de Node.js',
  })
})

app.get('/generic', (req, res) => {
  res.render('generic', {
    nombre: 'Joan Gavelán',
    titulo: 'Curso de Node.js',
  })
})

app.get('/elements', (req, res) => {
  res.render('elements', {
    nombre: 'Joan Gavelán',
    titulo: 'Curso de Node.js',
  })
})

//servir contenido estático
app.use(
  express.static('public', {
    extensions: ['html', 'htm'],
  })
)

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => console.log('App listening at port', port))
