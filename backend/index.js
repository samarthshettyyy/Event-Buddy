const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User'); 
const Event = require('./db/Event');


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
    if(req.body.password && req.body.email) {
        let user = await User.findOne(req.body);
        if(user) {
            res.send(user);
        } else {
            res.send({ result: 'No User Found'});
        }
    } else {
        res.send({ result: 'No User Found'});
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

// Create a new task
app.post("/create-task", async (req, res) => {
    let task = new Task(req.body);
    let result = await task.save();
    res.send(result);
});

// Get tasks for a specific event


console.log("Working");
app.listen(5000);
