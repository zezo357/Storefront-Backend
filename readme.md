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
5. all Authorization are the directly the token 
example using super test 
```
set({ Authorization: token_that_got_returned });
```

## scripts 
    "prettier": will run prettier on the code

    "lint": will run eslint on the code

    "jasmine": run tests functions

    "start": will listen to changes in ts and json file and then run prettier and start the server

    "build": build to js and then start

    "test": set env to test and migrate down and up the db then build to js and then test

    "testCont":will listen to changes in ts and json file and then build to js and then test 

features are in requirements.md














