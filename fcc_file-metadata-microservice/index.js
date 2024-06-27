const express = require('express')
const cors = require('cors')
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

/* BODY PARSER MIDDLEWARE */
app.use('/', bodyParser.urlencoded({ extended: false }))

/* LOGGER */
app.use('/', express.static(__dirname + '/'), function (req, res, next) {
  console.log(req.method + ' ' + req.originalUrl)
  next()
})

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

const port = process.env.PORT
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
  console.log('=========================================================')
})

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'Hello World!' })
})

// for 'upload.single(), it is expecting the name of the field "name" in the html file
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const name = req.file.originalname
  const type = req.file.mimetype
  const size = req.file.size

  console.log({ name, type, size })
  res.json({ name, type, size })
})
