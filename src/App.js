import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ramesh tim', email: 'john@yahoo.com' },
    { id: 2, name: 'kalu aderson', email: 'kalu@gmail.com' },
    { id: 3, name: 'Mark patel', email: 'jane@xyz.com' },
    { id: 4, name: 'jany june', email: 'jane@example.com' },
    { id: 5, name: 'Silly popat', email: 'popat@example.com' },
    { id: 6, name: 'khali triump', email: 'khali@example.com' },
    { id: 7, name: 'joe dhobi', email: 'dhobi@example.com' },
    { id: 8, name: 'tim cook lal', email: 'cook@example.com' },
    { id: 9, name: 'Ram bahadur', email: 'bahadur@example.com' },
    { id: 10, name: 'Jane Doe', email: 'jane@example.com' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      // Update existing user
      const updatedUsers = users.map((user) =>
        user.id === editId ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      setEditing(false);
      setEditId(null);
    } else {
      // Add new user
      setUsers([...users, { id: Date.now(), ...formData }]);
    }

    // Clear the form
    setFormData({ name: '', email: '' });
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setFormData({
      name: userToEdit.name,
      email: userToEdit.email,
    });
    setEditing(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="App">
      <h1 className='m-4 p-4' >React CRUD Operation </h1>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row">
          <div className="col-md-4">
            <TextField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <div className="col-md-4">
            <Button variant="contained" type="submit" fullWidth>
              {editing ? 'Update' : 'Add'}
            </Button>
          </div>
        </div>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user.id)} variant="contained" color="primary" size="small" className="me-2">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(user.id)} variant="contained" color="secondary" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
