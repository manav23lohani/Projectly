const mongoose = require("mongoose");
const DBconnect = async() => {
  try {
    await mongoose.connect(process.env.DB_LINK);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
module.exports = DBconnect;