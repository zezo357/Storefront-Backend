# StoreFront backend
# setup needed `yarn install`
## scripts 
    "prettier": will run prettier on the code

    "lint": will run eslint on the code

    "jasmine": run tests functions

    "start": will listen to changes in ts and json file and then run prettier and start the server

    "build": build to js and then start

    "test": set env to test and migrate down and up the db then build to js and then test

    "testCont":will listen to changes in ts and json file and then build to js and then test 

## Features
1. Users
   1. get '/users' will return all users
   2. get '/users/:id' will return one user
   3. post '/users/register' will create a new user based on the body value
   4. post '/users/signIn' will signIn to user  based on user name and password in the body
   5. put '/users/' will update one user based on the data in body
   6. delete '/users' will delete user based on id based in body
   
2. Orders
   1. 
   
