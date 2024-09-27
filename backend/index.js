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

/*app.put("/my-event/:id", async (req, res) => {
    const { category, amount } = req.body;
    
    console.log("Updating Event:", req.params.id);  // Log event ID
    console.log("Received Category:", category, "Received Amount:", amount);  // Log incoming data
  
    try {
      // Fetch the event by ID
      const event = await Event.findById(req.params.id);
      
      if (!event) {
        console.log("Event not found");  // Log if event is not found
        return res.status(404).json({ message: "Event not found" });
      }
  
      // Log the existing expensesDone array
      console.log("Current expensesDone:", event.expensesDone);
  
      // Check if the category exists in the expensesDone array
      const expenseIndex = event.expensesDone.findIndex(exp => exp.category === category);
      
      if (expenseIndex !== -1) {
        // Update the amount for the existing category in expensesDone
        event.expensesDone[expenseIndex].amount = amount;
        console.log("Updated existing category:", event.expensesDone[expenseIndex]);
      } else {
        // Add new category if not found in expensesDone
        event.expensesDone.push({ category, amount });
        console.log("Added new category:", { category, amount });
      }
  
      // Save the updated event in the database
      const updatedEvent = await event.save();
  
      console.log("Event successfully updated:", updatedEvent);  // Log success
      res.status(200).json(updatedEvent); // Return the updated event
    } catch (error) {
      console.error("Server error:", error);  // Log error for troubleshooting
      res.status(500).json({ message: "Server error", error });
    }
  });*/




console.log("Working");
app.listen(5000);