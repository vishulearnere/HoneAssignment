const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
} = require('../controllers/users')

// router.get('/',(req, res)=>{
//     res.status(200).send('all the items')
// })
console.log("before create userin router");
router.route('/').get(getAllUsers).post(createUser)
console.log("after create userin router");
router.route('/:id').get(getSingleUser).patch(editUser).delete(deleteUser)

module.exports = router

//---------------------------------------------------------------------------
