The Assignment is divided inot two parts :-
- Fronted (React)
- Backend API (NODEJS, EXPRESSJS, MONGODB)

## Backend part

- Created a MongoDB database and set up a connection using Mongoose.
- Designed and implemented  a RESTful API using Express.js to perform CRUD operations on a
"users" collection in the MongoDB database.
The API  has the following endpoints:
- GET /users: Get all users
- GET /users/:id : Get Specific user
- POST /users: Create a new user
- PATCH  /users:   Update user Data
- DELETE /users:   Delete user 
- Implemented input validation and error handling for the API endpoints.
- Added pagination and sorting functionality to the user listing page.
- Implemented search functionality to filter users based on specific criteria.

### The Backend API runs on the port 5000

## Frontend  part
Created a user interface to interact with the API endpoints.
Implemented all  the following features:
Display a list of users retrieved from the backend API:
Implement a form to create a new user and send the data to the backend API.
Allow updating and deleting users from the frontend interface.
Implement client-side input validation and error handling.



## How to run the source code 
- After cloning the repo
- go to node JS Folder by running command 
  - cd nodeJS 
- install all the node modules
  - npm install
-  connect to database [By your own MONGODB Account]
  - populate the  database using users.json DATA and running pouplate.js script 
- once data is populated 
- Run the code by commmand 
  - npm start
-   yehhhh Backend API is running on machine
-    ackend wiil be  running on port 5000

- NOW let's run Frontend 
-   go to frontend folder 
  - cd Frontend
- install all the node modules
  - npm install
- Run the server
  - npm start
### the Frontend will be running on port 3000
- Fontend and Backend is connected by axios

- Thanks a lot 
