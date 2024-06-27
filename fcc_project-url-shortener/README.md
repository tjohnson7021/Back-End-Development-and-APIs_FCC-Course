# Project: URL-shortener microservice

This small project application is part of the completion criteria for the [Freecodecamp.org](https://www.freecodecamp.org/learn) _Back End Development and APIs_ [certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/)


## Application I/O Expectations:

At completion, the application is expected to do the following:

- User can POST a URL to `/api/shorturl` and get a JSON response with `original_url` and `short_url` properties. Here's an example: `{ original_url : 'https://freeCodeCamp.org', short_url : 1} `

- When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL. 

- If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain `{ error: 'invalid url' }`