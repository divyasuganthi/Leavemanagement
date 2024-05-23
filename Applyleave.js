const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/Applyleave', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use(bodyParser.json());
// app.use(cors());


const LeaveSchema = new mongoose.Schema({
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  }
});


const Leave = mongoose.model('Applyleave', LeaveSchema);


app.post('/api/Applyleave', async (req, res) => {
  const { startDate, endDate, reason } = req.body;

  const newLeave = new Leave({ startDate, endDate, reason });
  try {
    await newLeave.save();
    console.log('Leave Application Received:', { startDate, endDate, reason });
    res.status(200).json({ message: 'Leave application submitted successfully!' });
  } catch (error) {
    console.error('Error submitting leave application:', error);
    res.status(500).json({ message: 'Error submitting leave application' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
