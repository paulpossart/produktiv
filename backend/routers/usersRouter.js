const { Router } = require('express');
const {
    createUser,
    getUser,
    updateUsername,
    updatePasword
} = require('../queries/users');
const { verifyUser } = require('../queries/auth');
const { rateCheck } = require('../utils/helpers');

const router = Router();

router.post('/', rateCheck, createUser);
router.get('/', verifyUser, getUser);
router.patch('/update-username', verifyUser, updateUsername);
router.patch('/update-password', verifyUser, updatePasword);

module.exports = router;
