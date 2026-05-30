import models from '../models';

export class BadDataError extends Error {}

export const createUser = async (userData) => {
  try {
    const created = await models.User.create(userData);
    return created;
  } catch (e) {
    if (e.message.includes('validation failed')) {
      throw new BadDataError(e.message);
    }
    throw e;
  }
};

export const getUserById = async (userId) =>
  models.User.findOne({ _id: userId });

export const getUserByEmail = async (email) => {
  try {
    const user = await models.User.findOne({ email });
    return user;
  } catch (e) {
    if (e.message.includes('validation failed')) {
      throw new BadDataError(e.message);
    }
    throw e;
  }
};

export const changeUserPassword = async (userId, hash) => {
  const oldData = await getUserById(userId);
  const newData = {
    password: hash,
    email: oldData.email,
    bookmarks: oldData.bookmarks
  };
  return models.User.updateOne({ _id: userId }, newData);
};

export const addBookmarkForUser = async (userId, gameId) => {
  const oldData = await getUserById(userId);
  let bookmarks = oldData.bookmarks;
  bookmarks.push(gameId);
  const newData = {
    password: oldData.password,
    email: oldData.email,
    bookmarks: bookmarks
  };
  return models.User.updateOne({ _id: userId }, newData);
}

// Debug
export const getAllUsers = () => models.User.find();