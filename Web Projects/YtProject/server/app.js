const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const tasks = require("./routers/tasks");
const bodyParser = require("body-parser");
const { LoginSchemas } = require("./models/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { use } = require("./routers/tasks");
const JWT_Secret = "asj#jsdf";

const app = express();
require("dotenv").config();
app.use(express.json({ extended: true }));
app.use("/api/v1", tasks);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const fetchUser = (req,res,next)=>{ // will use on the req at which auth is required.
  console.log("called")
  // get the user from jwt token and add id to req object.
  const token =  req.header('auth-token');
  if (!token){
    res.status(401).send({error: "access denied please authenticate the token"})
  }
  try {
     console.log("called2")
    
       const data = jwt.verify(token,JWT_Secret)
       req.user = data.id // modidied the req in all the req,res functions in which fetchUsr function is used 
    
        next()
   } catch (error) {
    res.status(401);
   }
}

app.post("/login", async (req, res) => {
  try {
    // console.log(req.body)
    const user = await LoginSchemas.findOne({ email: req.body.email });
    // res.send(user)
    if (!user) {
      return res.status(400).json({ error: "sorry invalid creds" });
    } else {
      const check = bcrypt.compare(req.body.password, user.password);
      // console.log(body.req.password,user.password)
      if (!check) {
        return res.status(400).json({ error: "sorry invalid creds." });
      }
      const payload = {
        id: user._id,
        email: user.email,
      };
      const authToken = jwt.sign(payload, JWT_Secret);
      res.send({authToken});
    }
  } catch (error) {
    res.status(500).json({server: "internal server error"});
  }
});



app.post('/getUser',fetchUser,async(req,res)=>{
  console.log("called3")
  try {
    console.log("called4")
   const userId = req.user;
  //  console.log(req.user)
    const user = await LoginSchemas.findById(userId).select("-password")
    console.log(user)
    res.send(user)
  } catch (error) {
    res.send("errrrrrr")
  }
})





app.post("/signup", async (req, res) => {
  // res.send("cvbcvbcvbnvbnm")
  console.log(req.body);
  const hashPaswd = await bcrypt.hash(req.body.password, 10);
  const data = {
    name: req.body.name,
    password: hashPaswd,
    email: req.body.email,
  };
  try {
    // res.status(201).json({status:"OK"})
    const credentials = await LoginSchemas.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    res.status(201).json({ success: true });
    console.log(data, credentials);
  } catch (error) {
    if (error.code === 11000) {
      // status code for duplicacy
      return res.json({ status: "error", error: "duplicate" });
    } else {
      res.status(502);
    }
  }
});

const start = async () => {
  try {
    await connectDB(process.env.db_url);
    app.listen(
      80,
      console.log("server up n running on 80 and connected to db....")
    );
  } catch (error) {
    console.log(error);
    console.log("server did not started because of error in db connection...");
  }
};
start();
