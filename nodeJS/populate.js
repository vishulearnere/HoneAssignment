require('dotenv').config()

const userData = require('./users.json') // Data in users.json is wrapped in array
const userSchema = require('./models/user')
const connectDB = require('./db/connect')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('database is connected')
    await userSchema.deleteMany()
    await userSchema.create(userData)
    console.log('Sucess')
    process.exit(0) // to exit the file automatically  when our data is successfully populated
  } catch (error) {
    console.log(error)
    process.exit(1) // to exit the file automatically after consoling the error
  }
}
start()
