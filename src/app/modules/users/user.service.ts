import { IUser } from './user.interface';
import { User } from './user.modal';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};
const getAllUser = async (): Promise<IUser[] | null> => {
  const result = await User.find({});
  return result;
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById({ _id: id });
  return result;
};
const updateUser = async (user: IUser, id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id: id }, user, {
    new: true,
  });
  return result;
};
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(
    { _id: id },
    {
      new: true,
    }
  );
  return result;
};

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
