const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/login', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const LeaveSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
},
})


const Leave = mongoose.model('Leave', LeaveSchema);


app.post('/api/leave', async (req, res) => {
    try {
        const newLeave = new Leave(req.body);
        const savedLeave = await newLeave.save();
        res.status(201).json(savedLeave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.get('/api/leave', async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/leave/:id', getLeave, (req, res) => {
    res.json(res.leave);
});

async function getLeave(req, res, next) {
    let leave;
    try {
        leave = await Leave.findById(req.params.id);
        if (leave == null) {
            return res.status(404).json({ message: 'Leave request not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.leave = leave;
    next();
}


app.patch('/api/leave/:id', getLeave, async (req, res) => {
    if (req.body.status != null) {
        res.leave.status = req.body.status;
    }
    if (req.body.managerComments != null) {
        res.leave.managerComments = req.body.managerComments;
    }
    try {
        const updatedLeave = await res.leave.save();
        res.json(updatedLeave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.delete('/api/leave/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Leave.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
