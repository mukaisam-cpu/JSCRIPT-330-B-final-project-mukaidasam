import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { createToken } from '../daos/token';

import * as User from '../daos/user';
import { isAuthorized } from './authMiddleware';

const router = Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;
const secret = 'notsosecret';

router.post('/', async (req, res) => res.sendStatus(401));

router.post('/signup', async (req, res) => {
  const user = req.body;

  // Duplicate user validation
  const duplicateUsers = await User.getUserByEmail(user.email);
  if (duplicateUsers) {
    return res.sendStatus(409);
  }

  if (user.password) {
    const hash = await bcrypt.hash(user.password, saltRounds);
    await User.createUser({ password: hash, email: user.email, roles: 'user' });
    return res.sendStatus(200);
  }

  return res.sendStatus(400);
});

router.post('/login', async (req, res) => {
  try {
    const user = req.body;
    if (!user.password) {
      return res.sendStatus(400);
    }

    const storedUser = await User.getUserByEmail(user.email);
    if (!storedUser) {
      return res.sendStatus(401);
    }

    const passwordsMatch = await bcrypt.compare(
      user.password,
      storedUser.password,
    );
    if (passwordsMatch) {
      // TODO: Replace this with a real JWT token
      const data = {
        uuid: uuidv4(),
        _id: storedUser._id,
        email: storedUser.email,
        roles: storedUser.roles,
      };
      const token = jwt.sign(data, secret);
      await createToken({ uuid: data.uuid, userId: storedUser._id });
      return res.status(200).send({ token });
    }
    return res.sendStatus(401);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.post('/logout', async (req, res) => res.sendStatus(404));

router.put('/password', isAuthorized, async (req, res) => {
  try {
    const { userId } = req;
    const { password } = req.body;
    if (!password || password === '') {
      return res.sendStatus(400);
    }
    const hash = await bcrypt.hash(password, saltRounds);

    await User.changeUserPassword(userId, hash);

    // const put_response = User.changeUserPassword(req.body)
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default router;
