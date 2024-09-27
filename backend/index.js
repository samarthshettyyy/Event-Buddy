const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User'); 

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
})

console.log("Working");
app.listen(5000);