const app = require('./app')
const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://ekv86:QLCbuBpvdZNsRoZp@cluster0.otscqne.mongodb.net/db-contacts";

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1)
  })

