const { Router } = require('express');
const { createUser, getUser } = require('../queries/users');
const {verifyUser } = require('../queries/auth');
const { rateCheck } = require('../utils/helpers');

const router = Router();

router.post('/', rateCheck, createUser);
router.get('/', verifyUser, getUser)

module.exports = router;
