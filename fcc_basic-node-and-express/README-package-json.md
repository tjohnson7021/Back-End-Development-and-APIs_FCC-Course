# Notes for package.json 
Because this is a learning project, this Readme serves as a place for me to take notes as I cannot make comments in the package.json itself.



 > ⚠️ NOTE: ALWAYS commit `package-lock.json`
> 
> package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates. This file is intended to be committed into source repositories, and serves various purposes



```
{
  "name": "fcc-learn-node-with-express",
  "version": "0.1.0",
  "author": "tiffinij21",
  "description": "This is a sandbox for me to experiment in and better understand APIs and backend development.",
  "keywords": ["freecodecamp","npm","node"],
  "license": "UNLICENSED",
  "dependencies": {
    "body-parser": "^1.15.2",
    "cookie-parser": "^1.4.3",
    "dotenv": "^16.0.1",
    "express": "^4.14.0",
    "fcc-express-bground": "https://github.com/freeCodeCamp/fcc-express-bground-pkg.git"
  },
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev-start": "nodemon server.js"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

## Adding some fields to package.json

We added:
 - author
 - description
 - keywords
 - license

> NOTE: These fields were optional and we added them to the package.json after setup. 

## Semantic Versioning (SemVer)
https://semver.org/

> Example: `"version": "0.1.0"`

> "package": "MAJOR.MINOR.PATCH"

- The **MAJOR** version should increment when you make incompatible API changes.


- The **MINOR** version should increment when you add functionality in a backwards-compatible manner. 


- The **PATCH** version should increment when you make backwards-compatible bug fixes.

> NOTE: This means that PATCHes are bug fixes and MINORs add new features but neither of them break what worked before. Finally, MAJORs add changes that won’t work with earlier versions.

___

## Manage npm Dependencies By Understanding Semantic Versioning

### Allow dependencies to update to next **PATCH**

To allow an npm dependency to update to the latest PATCH version, you can prefix the dependency’s version with the tilde (~) character. Here's an example of how to allow updates to any 1.3.x version.

`"version": "~1.3.8"`

> This allows for the system to update to 1.3.x 


___
### Allow dependencies to update to next **MINOR** release 

To allow an npm dependency to update to the latest MINOR release version, you can prefix the dependency’s version with the tilde (^) character. Here's an example of how to allow updates to any 1.x.x version.

`"version": "^1.3.8"`

> This allows for the system to update to 1.x.x 