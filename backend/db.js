const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://mern-vercel:likEeo6kFwwGTZR0@mern-vercal-2.fvno8.mongodb.net/?retryWrites=true&w=majority&appName=mern-vercal-2";
const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected"))
    .catch((e) => console.log(e.message));
};
module.exports = connectToMongo;
