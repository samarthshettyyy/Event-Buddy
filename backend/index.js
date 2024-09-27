const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Event = require('./db/Event');

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    res.send(result);
})

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
})

app.post("/create-event", async (req, res) => {
    let event = new Event(req.body);
    let result = await event.save();
    res.send(result);
})

app.get("/my-events/:id", async (req, res) => {
    let result = await Event.find({ createdBy: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No result found" });
    }
})

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