import { rolesModel } from './models/roles.js';

export const getRoleByEmail = async email => {
    let result;
    try {
        result = await userModel.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    return result;
}

