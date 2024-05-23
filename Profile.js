const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/Profile', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use(bodyParser.json());
// app.use(cors());


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }
});

const User = mongoose.model('Profile', UserSchema);


app.post('/api/profile', async (req, res) => {
  const { name, email, phone, department } = req.body;

  try {
    const updatedUser = new User({ name, email, phone, department });
    await updatedUser.save();
    console.log('User Profile Updated:', { name, email, phone, department });
    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
