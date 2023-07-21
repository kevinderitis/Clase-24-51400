import mongoose from 'mongoose';
import config from '../../config/config.js';

const rolesCollection = config.ROLES_COLLECTION; // si no utilizo variables de entorno pondria el nombre de la collection de usuarios
// const userCollection = 'users';

const rolesSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    role: String

});

export const rolesModel = mongoose.model(rolesCollection, rolesSchema);