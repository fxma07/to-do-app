const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const tasks = require("./routes/taskroutes.js")
require('dotenv').config();

const port = process.env.PORT;
const app = express ();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", tasks);

mongoose.connect(process.env.DB_MONGODB_ATLAS,{
    useNewURLParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error!"));
db.on('open', () => console.log("Connected to DB"));



app.listen(port, () => console.log(`Server is listening to port ${port}`));