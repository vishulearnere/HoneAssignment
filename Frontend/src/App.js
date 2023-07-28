// src/App.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EditUserForm from './EditUserForm';

const App = () => {
  const [users, setUsers] = useState([])
  const [editingUserId, setEditingUserId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
    age: '',
  })

  const handleEdit = (userId) => {
    setEditingUserId(userId)
  }

  const handleCancelEdit = () => {
    setEditingUserId(null)
  }

  const handleUpdate = () => {
    fetchUsers() // Refresh the user list after successful update
    setEditingUserId(null)
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/users/')
      console.log(response.data, typeof(response.data),"resonse ka data ")
      console.log(response.data.Users, typeof(response.data.Users),"resonse ka data ")
      setUsers(response.data.Users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/v1/users/', formData)
      fetchUsers() // Refresh the user list after successful creation
      setFormData({
        name: '',
        gender: '',
        email: '',
        password: '',
        age: '',
      })
    } catch (error) {
      console.error('Error creating user:', error)
      alert( error?.response?.data?.altmessage)
    }
  }

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/users/${userId}`)
      fetchUsers() // Refresh the user list after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <div>
      <h1>User Management App</h1>

      {/* Display User List */}
      <h2>User List</h2>
      {console.log(users, typeof users, users.Users, 'ye jindagi')}
      <ul >
        {users.map((user) => {
          const { name, age, email, _id: id, createdAt } = user
          console.log(name, age, email, id, createdAt)

          return (
            <li className="container" key={user._id}>
              <h4>{name}</h4>
              <h5> Age: {user.age} </h5>
                <h5>Email: {user.email}</h5>
                <p>Created At: {createdAt}</p>
              <button className="btn" style={{margin:'0.5rem'}} onClick={() => handleEdit(user._id)}>
                Edit
              </button>
              <button className="btn" onClick={() => handleDelete(user._id)}>
                Delete
              </button>
              {editingUserId === user._id && (
                <EditUserForm
                  user={user}
                  onUpdate={handleUpdate}
                  onCancel={handleCancelEdit}
                />
              )}
            </li>
          )
        })}
      </ul>

      {/* Create User Form */}
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="title">Create New User</h4>

        {/* ... form fields here ... */}
        <div className="form-row">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="age">
            Age:
          </label>
          <input
            className="form-input"
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-block" type="submit">
          Create User
        </button>
      </form>
    </div>
  )
}

export default App
