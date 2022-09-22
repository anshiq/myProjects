const express = require("express");
const connectDB = require("./db/connect");
const cors = require('cors')
const tasks = require("./routers/tasks");
const bodyParser = require('body-parser');
const { LoginSchemas } = require("./models/schema");
const app = express();
require("dotenv").config();
app.use(express.json({ extended: true }));
app.use("/api/v1", tasks);
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/login/:email", async (req, res) => {
  try {
    const { email: taskID } = req.params;
    const task = await LoginSchemas.findOne({ email: taskID });
    if (!task) {     
      res.status(404)
        .setHeader("Access-Control-Allow-Origin", "*")
        .setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
        .setHeader(
          "Access-Control-Allow-Methods",
          "Content-Type",
          "Authorization"
        )
        .send("request successfull but unable to find id given");
        return;
    }

    res.status(200).setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
    .setHeader(
      "Access-Control-Allow-Methods",
      "Content-Type",
      "Authorization"
    ).json(task);
  } catch (error) {
    res.status(500);
  }
});

app.post("/signup", async (req, res) => {
  // app.use(bodyParser.json());
  console.log(req.body)
  // res.json({success:true})
  try {
    res.status(201).setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE").setHeader("Access-Control-Allow-Origin", "*").setHeader(
        "Access-Control-Allow-Methods",
        "Content-Type",
        "Authorization"
      );
      const credentials = await LoginSchemas.create(req.body);
      res.json({ credentials,succes: true });
    } catch (error) {
    res.status(500).setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE").setHeader("Access-Control-Allow-Origin", "*").setHeader(
        "Access-Control-Allow-Methods",
        "Content-Type",
        "Authorization"
      ).send('ena mena dika');
    
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
