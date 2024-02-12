const express= require("express");
const app = express();
const mongoose= require("mongoose");
const mainRouter= require("./routes/index");
const {PORT= 3001} = process.env;
//process.env allos u to vary port depending of what .env file to specify
//port as something diff when u use a diff port

//The app.use() function is used to mount the specified
//middleware function(s) at the path that is being specified.
// It is mostly used to set up middleware for your application.

mongoose
.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(()=>{
  console.log("Connected to DB");
})
.catch(console.error);

app.use(express.json());
app.use("/", mainRouter);
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
});

console.log("sup");

