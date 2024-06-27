# MongoDB and Mongoose connection setup

Full tutorial [here](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)


1. Create a [MongoDB Atlas](https://account.mongodb.com/account/register) account (if you don't already have one)

2. Create a new cluster; no need to change any of the default configurations (except for price)
3. Create a user for the database (under 'SECURITY' tab; 'Database Access'): 
   - Auth method is 'password'
   - Read and write access to any database
4. Allow access from all IP addresses (under 'SECURITY' tab; 'Network Access'):
   - 'Add IP Address'
   - 'Allow access from anywhere'
   - Confirm `0.0.0.0/0`
5. Connect to cluster (under 'DEPLOYMENT' tab; 'Database'):
   - 'Connect', 'Connect Application'
   - Get URI string; fill in missing `<password>` and a table name can be entered/created before the query string `?retryWrites=true&w=majority`