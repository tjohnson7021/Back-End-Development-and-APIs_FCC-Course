// index.js
// where your node app starts

// init project
require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.set('trust proxy', true)

app.get('/api/whoami', async (req, res) => {
  const userSoftware = req.get('user-agent')
  const userLanguage = req.get('accept-language')

  const response = await axios.get('http://ipinfo.io')

  const ipInfo = response.data
  const userIPAddress = ipInfo.ip

  res.json({
    ipaddress: userIPAddress,
    language: userLanguage,
    software: userSoftware
  })
}).on('error', (err) => {
  console.error('Error:', err.message)
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
