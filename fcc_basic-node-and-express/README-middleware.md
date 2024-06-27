# Implementing Middleware 

Middleware functions are functions that take 3 arguments: 
- **the request object**, 
- **the response object**, and 
- **the next function in the application’s request-response cycle**.


These functions execute some code that can have side effects on the app, and usually add information to the request or response objects. They can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, next().


1. Simple logger created in myApp.js
2. Body Parser 


## A Simple Middleware Example 
```arm
const express = require('express');
const app = express();
const port = 3000;

// Middleware function
const loggingMiddleware = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next(); // Call next() to pass control to the next middleware in the chain
};

// Register middleware
app.use(loggingMiddleware);

// Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```