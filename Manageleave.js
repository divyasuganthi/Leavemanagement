const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/leaveManagement', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const leaveSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    managerComments: String,
});

const Leave = mongoose.model('Leave', leaveSchema);

// Create a new leave request
app.post('/api/manageleave', async (req, res) => {
    try {
        const newLeave = new Leave(req.body);
        const savedLeave = await newLeave.save();
        res.status(201).json(savedLeave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.get('/api/manageleave', async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/api/manageleave/:id', async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        res.json(leave);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.patch('/api/manageleave/:id', async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        if (req.body.status) {
            leave.status = req.body.status;
        }
        if (req.body.managerComments) {
            leave.managerComments = req.body.managerComments;
        }

        const updatedLeave = await leave.save();
        res.json(updatedLeave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.delete('/api/manageleave/:id', async (req, res) => {
    try {
        const leave = await Leave.findByIdAndDelete(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
