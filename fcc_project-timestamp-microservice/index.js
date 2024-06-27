// index.js
// where your node app starts

// init project
const express = require('express')
const app = express()
require('dotenv').config()

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

app.get('/api/:date?', function (req, res) {
  const dateParam = req.params.date

  try {
    if (dateParam === undefined) {
      const currentDate = new Date()
      res.json({ unix: Number(currentDate), utc: currentDate.toUTCString() })
    } else {
      // Check that a valid date can be extracted
      if (typeof dateParam !== 'string') {
        throw new Error('Date cannot be extracted')
      } else {
        // Date is valid
        if (String(dateParam).includes('-') || String(dateParam).includes(',')) {
          try {
            const date = new Date(dateParam)
            if (isNaN(date.getTime())) {
              res.json({ error: 'Invalid date' })
            } else {
              res.json({ unix: date.getTime(), utc: date.toUTCString() })
            }
          } catch (error) {
            res.json({ error: 'Invalid date' })
          }
        } else {
          try {
            const date = new Date(Number(dateParam))
            res.json({ unix: Number(dateParam), utc: date.toUTCString() })
          } catch (error) {
            	res.json({ error: 'Invalid date' })
          }
        }
      }
    }
  } catch (error) {
    // Catch any errors during date creation
    console.error('Error:', error.message)
    res.json({ error: 'Invalid date bottom' })
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
