const express = require("express");
const errorHandler = require("./utils/errorHandler");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(errorHandler);

mongoose.connect(process.env.DB_LINK)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use("/api/projects", require("./routes/projectRoutes"));
// catch all other routes (invalid)
app.use((req, res) => {
    res.status(404).json({ reason: "Not Found", message: "Invalid URL" });
});
app.listen(5001, ()=>{
    console.log("Server is running");
});