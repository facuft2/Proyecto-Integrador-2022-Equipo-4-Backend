const userDA = require('../dataaccess/user');
const { RESULT_CODES } = require('../utils');

const getUsers = async (req, res) => {
  try {
    return await userDA.getUsers();
  } catch (error) {
    throw new Error(error);
  }
}

const createUser = async (props) => {
  try {
    if (await userDA.getUserByProps({ email: props.email })) {
      return { code: RESULT_CODES.EMAIL_ALREADY_REGISTERED };
    }

    if (await userDA.getUserByProps({ telefono: props.numero })) {
      return { code: RESULT_CODES.PHONE_ALREADY_REGISTERED };
    }

    const user = await userDA.createUser(props)

    return {
      user: {
        email: user.email,
        username: user.nombre,
        id: user.id,
      },
      code: RESULT_CODES.SUCCESS,
    };
  } catch (error) {
    throw new Error(error);
  }
}

const editUser = async (props) => {
  try {
    if (!await userDA.getUserByProps({ id: props.id })) {
      return { code: RESULT_CODES.USER_NOT_FOUND };
    }

    const user = await userDA.editUser({ ...props });
    return {
      user,
      code: RESULT_CODES.SUCCESS,
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getUsers,
  createUser,
  editUser,
}
