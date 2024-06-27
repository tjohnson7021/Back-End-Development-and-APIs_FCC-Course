const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const bodyParser = require('body-parser')

app.use(cors())

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

/* BODY PARSER MIDDLEWARE */
app.use('/', bodyParser.urlencoded({ extended: false }))

/* LOGGER */
app.use('/', express.static(__dirname + '/'), function (req, res, next) {
  console.log(req.method + ' ' + req.originalUrl)
  next()
})
// function for generating unique IDs
function generateRandomId () {
  return uuidv4()
}

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'Hello World!' })
})

const allUsers = new Map()

function findUserById (_id) {
  return allUsers.get(_id)
}

// special method for setting current date to pass FCC test module
const checkDate = (date) => {
  if (!date) {
    return new Date()
      .toLocaleDateString('en-US', {
        timeZone: 'UTC',
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })
      .replaceAll(',', '')
  } else {
    const parts = date.split('-')
    const year = parseInt(parts[0])
    const month = parseInt(parts[1]) - 1
    const day = parseInt(parts[2])

    const utcDate = new Date(Date.UTC(year, month, day))
    return new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    ).toDateString()
  }
}

app.post('/api/users', (req, res) => {
  const name = req.body.username

  // create new user from body data
  const user = {}
  user._id = generateRandomId()
  user.username = name

  // add user to in-memory storage
  allUsers.set(user._id, user)
  // return json blob
  res.json(user)
})

app.get('/api/users', (req, res) => {
  // create array to add users to from Map
  const usersToDisplay = []
  function loadUsersFromMapToArray (value, map) {
    usersToDisplay.push(value)
  }
  // add each user from the map to the array for display
  allUsers.forEach(loadUsersFromMapToArray)

  res.json(usersToDisplay)
})

app.post('/api/users/:_id/exercises', (req, res) => {
  const _id = req.params._id
  const description = req.body.description
  const duration = req.body.duration
  let date = req.body.date

  // set date based on conditional
  date = checkDate(date)

  // find corresponding User with the given _id
  const exerciseUser = findUserById(_id)

  // create new array to hold exercise session
  const exerciseSession = {}

  // add entered values to the session
  exerciseSession.description = description
  exerciseSession.duration = Number(duration)
  exerciseSession.date = date

  // create new array from object to hold session entries
  const log = [exerciseSession]

  // if the user has already started a log...
  if (exerciseUser.hasOwnProperty('log')) {
    // ...add to that user log
    exerciseUser.log.push(exerciseSession)
  } else {
    // ...create a log
    exerciseUser.log = log
  }

  // send the response in the appropriate structure
  res.json({
    username: exerciseUser.username,
    description,
    duration: Number(duration),
    date,
    _id
  })
})

app
  .route('/api/users/:_id/logs?')
  .get((req, res, next) => {
    const _id = req.params._id
    req._id = _id
    const exerciseUserLog = findUserById(_id)

    const count = exerciseUserLog.log.length
    exerciseUserLog.count = count
    // pass the userLog to the l
    req.exerciseUserLog = exerciseUserLog

    if (req.query.limit) {
      // only return logs between the given dates

      req.from = req.query.from
      req.to = req.query.to

      let fromDate = req.from
      let toDate = req.to

      // isolate the dates entered from the query
      fromDate = checkDate(fromDate)
      toDate = checkDate(toDate)

      // return logs between the given dates up to the limit
      req.limit = req.query.limit
      const limit = parseInt(req.limit)

      // loop through dates in log array
      for (let i = 0; i < req.exerciseUserLog.log.length; i++) {
        // if the log date is between the given range
        if (
          req.exerciseUserLog.log[i].date >= fromDate &&
            req.exerciseUserLog.log[i].date <= toDate
        ) {
          // add it to the array
          req.exerciseUserLog.log = req.exerciseUserLog.log[i]
        }
      }

      req.exerciseUserLog.log.splice(0, req.exerciseUserLog.log.length, req.exerciseUserLog.log[limit - 1])
    }

    req.exerciseUserLog.count = exerciseUserLog.log.length
    res.json(req.exerciseUserLog)
  })

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
  console.log('=========================================================')
})
