const { TaskSchemas, LoginSchemas } = require("../models/schema");
const Login = async (req, res) => {
  try {
    const cred = { email: req.body.email, password: req.body.password };
    const user = await LoginSchemas.findOne({
      email: cred.email,
      password: cred.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "d#ddkdkd244kkdkk#dk3kkd"
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (error) {
    res.status(500);
  }
};

const Signup = async (req, res) => {
   const data = {name: req.body.name,password: req.body.password,email: req.body.email}
  // console.log(req.body.name,req.body.password)
  // res.send('dfghjkhgfdsdfghj')
  try {
    // res.status(201).json({status:"OK"})
    const credentials = await LoginSchemas.create({
      name: data.name,
      email: data.email,
      password: data.password
      // name: "anki",
      // email: "anki@yahoo.com",
      // password: "12345678"
    });
    // console.log(credentials,data)
    res.status(201).json({  success: true });
  } catch (error) {
    res.status(500);
  }
};

const getAllTask = async (req, res) => {
  try {
    const tasks = await TaskSchemas.find({});
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "Content-Type",
    //   "Authorization"
    // );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getOneTask = async (req, res) => {
  try {
    const { ID: taskID } = req.params;
    const task = await TaskSchemas.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).send("if: no task found");
    }
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "Content-Type",
    //   "Authorization"
    // );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send("no error task found");
  }
};
const createTask = async (req, res) => {
  try {
    // try this if not successful then run catch
    const task = await TaskSchemas.create(req.body);
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "Content-Type",
    //   "Authorization"
    // );
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { ID: taskID } = req.params;
    const task = await TaskSchemas.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).send("if: no task found and unable to delete");
    }
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "Content-Type",
    //   "Authorization"
    // );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send("no error task found");
  }
};
const updatetask = async (req, res) => {
  try {
    const { ID: taskID } = req.params;
    const task = await TaskSchemas.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, // new true means task will store new updated value
      runValidators: true, // schema validators apply for this function.
    });
    if (!task) {
      return res.status(404).json({ msg: `NO task with id: ${taskID}` });
    }
    res.status(404).json({ task });
  } catch (error) {
    res.status(200).json({ msg: error });
  }
};

module.exports = {
  getAllTask,
  getOneTask,
  createTask,
  updatetask,
  deleteTask,
  Signup,
  Login,
};

// const createLogin = async (req, res) => {
//   try {
//     // try this if not successful then run catch
//     const task = await LoginSchemas.create(req.body);
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "Content-Type",
//       "Authorization"
//     );
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// const Login = async (req, res) => {
//   try {
//     const { email: taskID } = req.params;
//     const task = await LoginSchemas.findOne({ email: taskID });
//     if (!task) {
//       return res
//         .status(404)
//         .send("if: no task found")
//         .setHeader("Access-Control-Allow-Origin", "*")
//         .setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
//         .setHeader(
//           "Access-Control-Allow-Methods",
//           "Content-Type",
//           "Authorization"
//         );
//     }
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "Content-Type",
//       "Authorization"
//     );
//     res.status(200).json(task);
//   } catch (error) {
//     res.status(500).send("no error task found");
//   }
// };
