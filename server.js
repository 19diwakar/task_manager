const express = require("express");
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

//middleware
app.use(express.static('./public'))
app.use(express.json());

//routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App');
})

app.use('/api/v1/tasks', tasks)

const port = 3000;

const start = async () => {
    try {
        const uri = process.env.MONGO_URI;
        await connectDB(uri);
        app.listen(port, console.log(`Server is listening on http://localhost:${port}`))
    } catch(err) {
        console.log(err);
    }
}

start()




