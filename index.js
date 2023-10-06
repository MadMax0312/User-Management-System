const mongoose = require("mongoose");
const path = require("path")
const nocache = require("nocache");
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system");

const express = require("express")
const app = express();

app.use("/static",express.static(path.join(__dirname,'public')))

// app.use(nocache());

const disableBackButton = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store,must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '1');
    next();
};

//for user routes-----------------------///////////////

const userRoute = require("./routes/userRoute");
app.use('/',disableBackButton,userRoute);

//for admin routes-----------------------------///////////////////

const adminRoute = require("./routes/adminRoute");
app.use('/admin',disableBackButton,adminRoute);

app.use('*',(req,res)=>{res.send("haii")})

app.listen(process.env.PORT || 4001, () => {
  console.log("Server is running....");
})