const { Router } = require('express');
const { createUser } = require('../queries/users');
const { rateCheck } = require('../utils/helpers');

const router = Router();

router.post('/', rateCheck, createUser);

module.exports = router;
