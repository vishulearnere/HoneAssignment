//this file has two types of  Error one when _id is validated and we don't get any data from provided id this one needs createCustomError
// the second one is try and catch wala error which includes validation and others

const User = require('../models/user')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custome-error')

console.log(User)

const getAllUsers = asyncWrapper(async (req, res) => {

// Searching user on the basis of name, email, age
  const { name, email, age, sort, fields } = req.query
  queryObject = {}
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' } // i for Upperase or lowercase
  }
  if (age) {
    queryObject.age = age // i for Upperase or lowercase
  }
  if (email) {
    queryObject.email = email
  }

  let result = User.find(queryObject)
  
  // sort by name, age else created at 
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  // PAGINATION
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  // 23
  // 4 7 7 7 2

  const allUsers = await result
  res.status(200).json({
    Users: allUsers,
  })
})

const getSingleUser = asyncWrapper(async (req, res, next) => {
  const { id: UserID } = req.params
  const newUser = await User.findOne({
    _id: UserID,
  })

  if (!newUser) {
    // if User has nothing then
    return next(createCustomError(`No User is found with ID ${UserID}`, 404)) // here we are returning instance of customAPIError in next
    // which has properties of error (super class) and createCustomAPI both
  }
  return res.status(200).json({
    newUser,
  })
})
const createUser = asyncWrapper(async (req, res, next) => {
  console.log(User, req.body)
  const newUser = await User.create(req.body)
  // console.log(User, req.body)
  res.status(201).json({
    newUser,
  })
})
const editUser = asyncWrapper(async (req, res, next) => {
  userID = req.params.id
  console.log(userID, req.body, 'kuch nhi mila')
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: userID,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  if (!updatedUser) {
    return next(createCustomError(`No User is found with ID ${userID}`, 404))
  }
  console.log(updatedUser)
  return res.status(200).json({
    sucess: true,
    User: updatedUser,
  })
})
const deleteUser = asyncWrapper(async (req, res, next) => {
  UserID = req.params.id
  // body = req.body
  console.log(UserID)
  const deletedUser = await User.findOneAndDelete({
    _id: UserID,
  })
  console.log(UserID, deletedUser)
  if (!deletedUser) {
    return next(createCustomError(`No User is found with ID ${UserID}`, 404))
  }
  return res.status(200).json({
    sucess: true,
    User: deletedUser,
  })
})
module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
}
