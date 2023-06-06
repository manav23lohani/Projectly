const express = require("express");
const errorHandler = require("./utils/errorHandler");
const app = express();

app.use(express.json());
app.use(errorHandler);

app.use("/api/projects", require("./routes/projectRoutes"));
// catch all other routes (invalid)
app.use((req, res) => {
    res.status(404).json({ reason: "Not Found", message: "Invalid URL" });
});
app.listen(5001, ()=>{
    console.log("Server is running");
});