const express = require("express");
const {notFound,errorHandler} = require("./middlewares/errorHandler");
const DBconnect = require("./utils/dbConnection");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5001;

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projectMember", require("./routes/requestRoutes"));

app.use(notFound);
app.use(errorHandler);

DBconnect().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})