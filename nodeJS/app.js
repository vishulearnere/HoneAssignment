// const express = require('express')
// const app = express()
// const tasks = require('./routes/tasks')
// const mongoDB = require('./db/connect')


// require('dotenv').config()
// // console.log(process.env)
// console.log(process.env.MONGO_URI,'ye jindgi hum nhi chodege')

// //middleware
// app.use(express.json())

// // app.use(mongoDB(process.env.URI))
// app.use('/api/v1/tasks', tasks)



// //routes
// app.get('/hello', (req, res) => {

//     res.status(200).json({
//         sucess: true,
//         data: 'getrequest'
//     })

// })

// // app.get('/api/v1/tasks') - get all the tasks
// // app.post('/api/v1/tasks')  - Create a new task
// // app.get('/api/v1/taska/:id') - get single task
// // app.patch('/api/v1/tasks/:id') - update task
// // app.delete('api/v1/tasks/:id') - delete task

// // TASK MANAGER API
// // R 1. GET -get all the tasks - req.url
// // R 2. GET - get a specific or single task - /:id  req.params
// // C 3. POST -  create a task  -  req.body
// // U 4. PUT/PATCH - update or EDIT a task - /:id req.params + req.body
// // D 5. DELETE - delete a task - /:id  req.params



// //   SCHEMA 
// //   ID- INbuilt by Mongoose
// //   Task - String
// //   Completed -  [Tue or False]

// const PORT = 3000

// const start = async() =>{
//     try {
//         await mongoDB(process.env.MONGO_URI)
//         app.listen(PORT, () => {
//             console.log(`server is listening at ${PORT} Port  No. ...`)
//         })
//     } catch (error) {
//         console.log(error)

//     }
// }
// start()
// // console.log('Task Manager App')


//   app.js - Main file
//   .gitignore - Ignore files while uploading API on github
//   .env - confidential File (has MONGO_URI) password and username
//   node modules - modules which are installed
//    package.json - package and their versions
//    package-lock.json -  package version and their dependent other  package versions
//    routes - to route request type (POST/PUT/GET/DELETE) with their defined functions
//    controllers - control what to do  when a specific route is called (defination of function specified with each route)
//   public - For frontend
//   db - only to connect the data
//   models - to define the schema and model(to run queries)
//   errors - for defining the custom error by creating the class CustomAPIError whose super class is Error(Inbult defined by Express)
//             and return instance  of CustomAPIError, when called constructor is invoked 
//   middleware - req => Middleware => res=> next
//     async.js - wrapper for async function
//     not found - if any other URL is provided which is not handled here then returning not found 
//     error handler - returns which error we should return 
//     app -> controller(task.js) -> custom-error(error) [return instance of error in next if task is not found]->app.js( yaha par error handler use karo) -> error-handler.js
//    app -> controller(task.js) -> middleware (async) [agar try  catch wala error to] -> app.js -> error handler.js 

const express = require('express')
const users = require('./routes/users')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const app = express()
require('dotenv').config()

const cors = require('cors')
// ... (previous code)

app.use(cors())
// app.use(express.static('./public'))

const connectdb = require('./db/connect')

app.use(express.json())
app.use('/api/v1/users', users)

app.use(notFound)
app.use(errorHandlerMiddleware) // In order to use custom  middleware instaed of default express one  

const PORT = process.env.PORT || 5000
const start = async () => {
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`servers is listening at PORT NO.  ${PORT} ...`)
        })

    } catch (error) {
        console.log(error)

    }
}
start()