const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');  // Correct import path
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(express.json());  // Enable JSON body parsing

const mongoURI = 'mongodb://localhost:27017/comp3123_assignment1';

// MongoDB connection
mongoose.connect('mongodb+srv://Harshil:Harshil%409724@cluster0.if02m.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

  

// Start server
const PORT = 8084;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
