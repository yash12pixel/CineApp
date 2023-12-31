const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose");
const cors = require("cors")

// const config = require("./config/key");

const MogoDBURI = process.env.MONGO_URI

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

app.use('/api/users', require('./routes/users'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/favorite', require('./routes/favorite'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {

//   // Set static folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 5000

mongoose.connect(MogoDBURI,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log("DB Connected")
}).catch((error)=>console.log(`${error} did not connect`))

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});