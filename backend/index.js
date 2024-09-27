const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Event = require('./db/Event');
const Task = require('./db/Task'); // Import the Task model

const app = express();
app.use(express.json());
app.use(cors());

// Sign up a new user
app.post("/signup", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    res.send(result);
});

// Login user
app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body);
        if (user) {
            res.send(user);
        } else {
            res.send({ result: 'No User Found' });
        }
    } else {
        res.send({ result: 'No User Found' });
    }
});

// Create a new event
app.post("/create-event", async (req, res) => {
    let event = new Event(req.body);
    let result = await event.save();
    res.send(result);
});

// Get events created by user
app.get("/my-events/:id", async (req, res) => {
    let result = await Event.find({ createdBy: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No result found" });
    }
});

app.get("/my-event/:id", async (req, res) => {
    let result = await Event.findById({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No result found" });
    }
})

app.put("/my-event/:id", async (req, res) => {
    let result = await Event.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
})

app.get('/tasks/:eventId', async (req, res) => {
    try {
        const tasks = await Task.find({ eventId: req.params.eventId });
        res.send(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

app.post('/tasks', async (req, res) => {
    const { title, assignee, dueDate, eventId } = req.body;
    try {
        const task = new Task({ title, assignee, dueDate, eventId });
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
});

app.patch('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    const result = await Task.deleteOne({_id:req.params.id});
    res.send(result);
});

app.get("/search-email/:key", async (req, res) => {
    let result = await User.find({
        email: { $regex: req.params.key, $options: 'i' } // case-insensitive regex search
    });
    res.send(result);
});

console.log("Working");
app.listen(5000);
