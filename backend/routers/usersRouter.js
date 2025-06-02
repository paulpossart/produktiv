import {Router} from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../queries/users.js';
import { verifyUser } from '../queries/auth.js';
import { rateCheck } from '../queries/helperFunctions.js';

const router = Router();

router.post('/', rateCheck, createUser);
router.get('/', verifyUser, getUser);
router.put('/', verifyUser, updateUser);
router.delete('/', verifyUser, deleteUser);

export default router;
