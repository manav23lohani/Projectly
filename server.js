const express = require("express");
const errorHandler = require("./utils/errorHandler");
const DBconnect = require("./utils/dbConnection");
require("dotenv").config();
const app = express();

app.use(express.json());
DBconnect();
app.use("/api/projects", require("./routes/projectRoutes"));

// catch all other routes (invalid)
app.use((req, res) => {
    res.status(404);
    throw new Error("Invalid URL! Please try again");
});

app.use(errorHandler);

app.listen(5001, ()=>{
    console.log("Server is running");
});