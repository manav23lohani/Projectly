const express = require("express");
const {notFound,errorHandler} = require("./middlewares/errorHandler");
const DBconnect = require("./utils/dbConnection");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(express.json());
DBconnect();

app.use(cors());
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projectMember", require("./routes/requestRoutes"));

app.use(notFound);
app.use(errorHandler);

app.listen(5001, ()=>{
    console.log("Server is running");
});