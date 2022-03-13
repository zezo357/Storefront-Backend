# StoreFront backend
# setup needed 
1. `yarn install` to install needed packages
2. env is uploaded to make it easier to reviewer when testing
3. port is 5432
4. postgres commands to create database and users 
``` CREATE USER full_stack_user WITH PASSWORD 'password123';
CREATE DATABASE full_stack_dev;
\c full_stack_dev
GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;

\c postgres

CREATE USER test_user WITH PASSWORD 'password123';
CREATE DATABASE full_stack_test;
\c full_stack_test;
GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO test_user;

```

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
   
