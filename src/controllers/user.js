const userDA = require('../dataaccess/user');
const { RESULT_CODES } = require('../utils');

const getUsers = async (req, res) => {
    try {
        return await userDA.getUsers();
    } catch (error) {
        throw new Error(error);
    }
}

const createUser = async ({ nombre, apellido, email, contrasenia }) => {
    try {
        if (await userDA.getUserByProps({ email })) {
            console.log('email already registered');
            return { code: RESULT_CODES.EMAIL_ALREADY_REGISTERED };
        }

        const user = await userDA.createUser({
            nombre,
            apellido,
            email,
            contrasenia,
        })

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
