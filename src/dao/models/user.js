import mongoose from 'mongoose';
import config from '../../config/config.js';

const userCollection = config.USER_COLLECTION; // si no utilizo variables de entorno pondria el nombre de la collection de usuarios
// const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    password: String

});

export const userModel = mongoose.model(userCollection, userSchema);