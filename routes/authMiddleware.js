import jwt from 'jsonwebtoken';
import * as Token from '../daos/token';
import { getUserById } from '../daos/user';
import { buildAuthorization } from '@retroachievements/api';
require('dotenv').config();

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

/** Get the user's RetroAchievements web API key to authorize the RetroAchievements API */
export const authorizeRA = async (req, res, next) => {
  // On a time crunch here- For testing purposes, I'm just gonna toss my own username and
  // and key here
  const username = process.env.RA_USERNAME;
  const apiKey = process.env.RA_API_KEY;
  const auth = buildAuthorization({username:username, webApiKey:apiKey});
  // This only builds an object containing the username and api key
  // This does NOT actually validate any of the data, that's handled in the API calls
  // Maybe I could do a simple call to validate, but I'd rather not add extra API bandwidth
  req.raAuth = auth;
  
  return next();
}
