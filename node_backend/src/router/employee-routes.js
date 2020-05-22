const express = require('express');
const router = express.Router();

const controller = require('../controller/employee-controller');

router.get('/list', controller.list);

router.post('/create', controller.create);

router.get('/get/:id', controller.get);
router.post('/update/:id', controller.update);

router.post('/delete', controller.delete);

module.exports=router;