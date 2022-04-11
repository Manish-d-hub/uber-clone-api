import { getAll, updateOne } from './services/factorycontroller.js';
import User from './userModel.js';

export const getUsers = getAll(User);

export const updateUser = updateOne(User);
