const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');
const run = require('./DB/connectionDB');
const errorHandler = require('./middleware/errorHandler');

run();


app.use(express.json());
app.use(bodyParser.json());


app.use("/api/v1", router);


app.use(errorHandler);
 
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
