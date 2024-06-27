const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

console.log('Hello Timestamp!!')

/*
EXPRESS ROUTING

NOTE: keep in mind that Express evaluates routes from top to bottom, and executes
the handler for the first match. You have to comment out the preceding solution, or
the server will keep responding with a string.
*/

/* Express routes use this structure
app.METHOD(PATH, HANDLER)

* app       = express object created above
* .METHOD   = the HTTP method in lowercase (get, post, update, etc)
* PATH      = the relative path on the server ("/" = root path; could be any relative path
              on the server "/home", "/dashboard", etc)
* HANDLER   = the function that you want Express to call when the above route
              is matched. The handler has its own format:
              function(req, res) {...}
*/

/* ROOT PATH Handler that returns a file */
app.get('/',
  function (req, res) {
    // __dirname = Node global variable to help calculate directory path
    const absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath)
  }
)

/// * Another ROOT PATH Handler*/
// app.get("/",
// function(req, res) {
//  res.send('Hello Express');
// })

/* Simple Logger using middleware triggered on all requests  */
app.use('/', express.static(__dirname + '/'),
  function (req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip)
    next()
  }
)

/* BODY PARSER MIDDLEWARE */
app.use('/', bodyParser.urlencoded({ extended: false }))

/*
 SERVING STATIC ASSETS - this is serving CSS stylesheets for index.html

 In Express, you can put in place this functionality using
 the middleware express.static(path), where the path parameter
 is the absolute path of the folder containing the assets.

 Basically, middleware are functions that intercept route handlers,
 adding some kind of information. A middleware needs to be mounted
 using the method app.use(path, middlewareFunction). The first path
 argument is optional. If you don’t pass it, the middleware will be
 executed for all requests.

 EXAMPLE: app.use(path, middlewareFunction)
*/

/* Route serving style pages  */
app.use('/public', express.static(__dirname + '/public'))

/* Get Query Parameter Input from the Client
 * Input comes from values in the url
*/

app.post('/name', function (req, res) {
    res.json({ name: req.body.first + ' ' + req.body.last })
  }
)

// app.post ('/name',
//    function (req, res) {
//    res.json({"name": req.query.first + " " + req.query.last})
// })

/* Chaining middleware requests to create time server */
app.get('/now',
  function (req, res, next) {
    req.time = new Date().toString()
    next()
    // final handler
  },
  function (req, res) {
    res.json({ time: req.time })
  }
)

/* Get Route Parameter Input from the Client */
app.get('/:word/echo', function (req, res) {
    res.json({ echo: req.params.word })
  }
)

/* JSON PATH Handler
 * process.env.MESSAGE_STYLE is configured in the .env file
*/
app.get('/json',
  function (req, res) {
    let message = 'Hello json'
    if (process.env.MESSAGE_STYLE === 'uppercase') {
      message = message.toUpperCase()
    }
    res.json({ message })
  }
)

module.exports = app
