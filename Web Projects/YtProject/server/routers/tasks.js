const express = require('express')
const cors = require('cors')
const routers = express.Router();
const { getAllTask, getOneTask, createTask, updatetask, deleteTask,Login,Signup} = require('../controllers/functions')

routers.route('/').get(getAllTask).post(createTask);
routers.route('/:ID').get(getOneTask).delete(deleteTask).patch(updatetask);
routers.route('/Login').post(Login)
routers.route('/Signup').post(Signup)
module.exports = routers;