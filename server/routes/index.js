const express = require('express');
const validator = require('express-validation');
const validateUsers = require('../middleware/validators/users');

const userController = require('./contollers/users');
const techTipsContoller = require('./contollers/techTips');

const router = express.Router();

const baseURL = '/api/v1'

/** user routes */
router.post(`${baseURL}/users/signup`, validator(validateUsers.create), userController.create);
router.post(`${baseURL}/users/login`, validator(validateUsers.login), userController.login);

/** tips routes */
router.post(`${baseURL}/tips`, techTipsContoller.create);
router.get(`${baseURL}/tips`, techTipsContoller.list);
router.get(`${baseURL}/tips/:id`, techTipsContoller.get);
router.put(`${baseURL}/tips/:id`, techTipsContoller.update);
router.delete(`${baseURL}/tips/:id`, techTipsContoller.delete);

router.use((err, req, res, next) => {
  res.status(400).json(err);
  return next();
});

module.exports = router;
