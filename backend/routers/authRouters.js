const { Router } = require('express');
const { signIn, signOut } = require('../queries/auth');
const { rateCheck } = require('../utils/helpers');

const router = Router();

router.post('/sign-in', rateCheck, signIn);
router.post('/sign-out', signOut);

module.exports = router;
