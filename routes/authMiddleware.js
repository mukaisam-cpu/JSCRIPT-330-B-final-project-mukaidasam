import jwt from 'jsonwebtoken';
import * as Token from '../daos/token';
import { getUserById } from '../daos/user';

const secret = 'notsosecret';

/** Authorize user */
export const isAuthorized = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.replace('Bearer ', '');
  }

  let matchingToken = null;
  try {
    const decoded = jwt.verify(token, secret);
    matchingToken = await Token.getToken(decoded.uuid);
    req.userId = matchingToken[0].userId;
    req.token = token;
    req.roles = decoded.roles;
  } catch (e) {
    return res.sendStatus(401);
  }
  return next();
};

/** Check and authorize admin privalages */
export const isAdmin = async (req, res, next) => {
  // Anti-spoof protection, compare JWT role to database role
  const user = await getUserById(req.userId);
  if (
    user.roles.sort().toString() === req.roles.sort().toString() &&
    req.roles.includes('admin')
  ) {
    return next();
  }
  return res.sendStatus(403);
};

/** Same as the previous function, but return admin privalege level */
export const adminPrivalages = async (req, res, next) => {
  // Anti-spoof protection, compare JWT ro sle to database role
  const user = await getUserById(req.userId);
  // I don't know if this is secure
  req.isAdmin = false;
  if (
    user.roles.sort().toString() === req.roles.sort().toString() &&
    req.roles.includes('admin')
  ) {
    req.isAdmin = true;
  }
  return next();
};
