# Notes on .env file

The .env file is a hidden file that is used to pass environment variables to your application. This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden. For example, you can store API keys from external services or your database URI. You can also use it to store configuration options. By setting configuration options, you can change the behavior of your application, without the need to rewrite some code.

> The environment variables are accessible from the app as `process.env.VAR_NAME`. 
> 
> The process.env object is a global Node object, and variables are passed as strings. 
> 
> VAR_NAME=value


