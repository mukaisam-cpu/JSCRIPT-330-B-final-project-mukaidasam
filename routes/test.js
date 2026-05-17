import { Router } from 'express';
import * as User from '../daos/user';

const router = Router();

router.get('/', async (req, res) => {
    await User.createUser({ password: 'notapassword', email: 'test' });
    return res.status(200).send("This is text.");
})

export default router;