# StoreFront backend
# setup needed 
1. `yarn install` to install needed packages
2. database port is 5432
3. postgres commands to create database and users 
``` 
CREATE USER full_stack_user WITH PASSWORD 'password123';
CREATE DATABASE full_stack_dev;
\c full_stack_dev
GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;

\c postgres

CREATE USER test_user WITH PASSWORD 'password123';
CREATE DATABASE full_stack_test;
\c full_stack_test;
GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO test_user;

```
4. .env file contents
```
POSTGRES_HOST=localhost
POSTGRES_DB=full_stack_dev
POSTGRES_DB_test=full_stack_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=trialAndError
POSTGRES_PORT=5432
SALT_ROUNDS=10
TOKEN_SECRET=errorMeansLearning
ENV=dev
```

# note
all Authorization are directly the token, 
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

# Features are in requirements.md



## Droping database and users 
```
DROP DATABASE IF EXISTS full_stack_dev;
DROP DATABASE IF EXISTS full_stack_test;
DROP USER IF EXISTS full_stack_user;
DROP USER IF EXISTS test_user;
```














