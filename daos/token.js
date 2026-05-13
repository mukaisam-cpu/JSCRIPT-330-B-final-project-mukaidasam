import models from '../models';

export class BadDataError extends Error {}

export const createToken = async (tokenData) => models.Token.create(tokenData);

export const getToken = async (uuid) => models.Token.find({ uuid });

export const deleteToken = async (uuid) => models.Token.deleteMany({ uuid });

// Debug
export const getAllTokens = async () => models.Token.find();
