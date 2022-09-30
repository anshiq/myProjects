const express = require("express");
const router = require("./routes/notes");
const connectDB = require("./db/connect");
const jwt = require("jsonwebtoken");
const { StoreAuth } = require("./models/schema");
const bcrypt = require("bcryptjs");
const secret = "mysupersaiyansecret";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
/*


















*/

const tokenValidator = (req, res, next) => {
  // will use on the req at which auth is required.
  // console.log("called")
  // get the user from jwt token and add id to req object.
  const userToken = req.header("auth-token"); // receiving token in headers (more secure).
  if (!userToken) {
    res
      .status(401)
      .send({ error: "access denied please authenticate the token" });
  }
  try {
    const data = jwt.verify(userToken, secret);
    req.user = data.id; // modidied the req in all the req,res functions in which fetchUsr function is used
    next();
  } catch (error) {
    res.status(401);
  }
};

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const credentials = {
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    };
    const response = await StoreAuth.create(credentials);
    res.json({ signup: true });
  } catch (error) {
    if (error.code == "11000") {
      return res.json({
        duplicacyy: true,
        signup: false,
        error: error.code,
      });
    } else {
      res.json({
        signup: false,
        error: "serverError",
      });
    }
  }
});
app.post("/login", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const response = await StoreAuth.findOne({ email: userEmail });
    if (!response) {
      return res.json({
        user: "invalid",
      });
    }
    const match = await bcrypt.compare(userPassword, response.password);
    // res.send(match)
    if (!match) {
      return res.json({
        user: "invalid email or password",
      });
    }
    // means password and email are valid till now
    const payload = {
      email: response.email,
      id: response._id,
    };
    const token = jwt.sign(payload, secret);
    res.send(token);
  } catch (error) {
    res.json({
      error: "internal server error",
    });
  }
});
app.post("/loggedin", tokenValidator, async (req, res) => {
  // console.log('called 4')
  // console.log(req.user)
  try {
    console.log("called4");
    const userId = req.user;
    //  console.log(req.user)
    const user = await StoreAuth.findById(userId).select("-password");
    console.log(user);
    res.send(user);
  } catch (error) {
    res.send("errrrrrr");
  }
});
const start = async () => {
  try {
    await connectDB("mongodb://127.0.0.1:27017/notesapp");
    app.listen(80, () => {
      console.log(" app is running on port 80 and connected to db.");
    });
  } catch (error) {
    console.log(error, "unable to connect the db............................");
  }
};
start();
