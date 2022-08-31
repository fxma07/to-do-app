const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
require('dotenv').config();

const port = process.env.PORT;
const app = express ();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_MONGODB_ATLAS,{
    useNewURLParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error!"));
db.on('open', () => console.log("Connected to DB"));

const Task = require('./models/tasks.js');



app.get('/tasks', async (req, res) =>{
    const tasks = await Task.find();

    res.json(tasks);
});

app.post('/new/tasks', (req, res) => {
    const task = new Task({
        text: req.body.text
    })

    task.save();

    res.json(task);
});



app.listen(port, () => console.log(`Server is listening to port ${port}`));