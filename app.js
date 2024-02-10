const express= require("express");
const app = express();
const {PORT= 3001} = process.env;
//process.env allos u to vary port depending of what .env file to specify
//port as something diff when u use a diff port
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
});

console.log("sup");