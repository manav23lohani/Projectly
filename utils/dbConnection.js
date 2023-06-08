const mongoose = require("mongoose");
const DBconnect = ()=>mongoose.connect(process.env.DB_LINK)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
module.exports = DBconnect;