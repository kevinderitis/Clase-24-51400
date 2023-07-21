import mongoose from 'mongoose';
import { userModel } from './models/user.js';
import config from '../config/config.js';

const MONGO_CONNECTION_STRING = config.MONGO_CONNECTION_STRING;

mongoose.connect(MONGO_CONNECTION_STRING) // si no utilizo variables de entorno pondria el string de conexion a la bd

export const getByEmail = async email => {
    let result;
    try {
        result = await userModel.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const createUser = async user => {
    let result;
    try {
        result = await userModel.create(user)
    } catch (error) {
        console.log(error)
    }
    return result;
}

export const getById = async id => {
    let result;
    try {
        result = await userModel.findOne({ _id: id })
    } catch (error) {
        console.log(error)
    }

    return result;
}