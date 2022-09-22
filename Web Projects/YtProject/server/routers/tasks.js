const express = require('express')
const routers = express.Router();
const { getAllTask, getOneTask, createTask, updatetask, deleteTask} = require('../controllers/functions')

routers.route('/').get(getAllTask).post(createTask);
routers.route('/:ID').get(getOneTask).delete(deleteTask).patch(updatetask);
// routers.route('/signup').post(createLogin);
// routers.route('/login/:email').get(Login);
module.exports = routers;