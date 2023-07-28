// src/EditUserForm.js
import React, { useState } from 'react'
import axios from 'axios'

const EditUserForm = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    age: user.age,
  })

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
      await axios.patch(
        `http://localhost:5000/api/v1/users/${user._id}`,
        formData
      )
      onUpdate()
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h4 className="title">Update {user.name} Data</h4>
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
          required
        />
      </div>
      <button className="btn" style={{ margin: '0.5rem' }} type="submit">
        Update
      </button>
      <button className="btn" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm
