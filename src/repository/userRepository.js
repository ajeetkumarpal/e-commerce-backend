import user from "../schema/userSchema.js";

const createUser = async (userDetail) => {
  try {
    const newUser = await user.create(userDetail);
    return newUser;
  } catch (error) {
    console.log("error user repository in createUser", error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    const findUser = await user.findOne({ email });
    return findUser;
  } catch (error) {
    console.log("error user repository in findUserByEmail", error.message);
  }
};

export { createUser, findUserByEmail };
