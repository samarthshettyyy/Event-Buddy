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

// Update task status
app.patch("/update-task/:taskId", async (req, res) => {
    let result = await Task.findByIdAndUpdate(req.params.taskId, { status: req.body.status }, { new: true });
    if(result) {
        res.send(result);
    } else {
        res.send({ result: "Task not found" });
    }
});

// Delete task by ID
app.delete("/delete-task/:taskId", async (req, res) => {
    let result = await Task.findByIdAndDelete(req.params.taskId);
    if(result) {
        res.send({ result: "Task deleted" });
    } else {
        res.send({ result: "Task not found" });
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

console.log("Working");
app.listen(5000);
