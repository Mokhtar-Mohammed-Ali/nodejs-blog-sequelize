// import {users} from '../../DB/model/index.js'
// export const profile   = (id)=>{
//     const user = users.find(ele => ele.id == id)
//     return user
// // }


import { SALT_ROUND } from '../../../config/config.service.js';
import { user } from '../../DB/model/index.js';
import bcrypt from 'bcrypt';

export const createUser = async (data) => {
    const { name, email, password, role } = data;

    
    const existing = await user.findOne({ where: { email} });
    if (existing) throw new Error("Email already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

   
    const newUser = user.build({ name, email, password: hashedPassword, role });
    await newUser.save();

    return newUser;
};


//Create or update based on PK (skip validation)
export const updateUser = async (id, data) => {
    const existingUser = await user.findByPk(id);
    if (!existingUser) throw new Error("User not found");

    
    await existingUser.update(data, { validate: false });

    return existingUser;
};

// find by email
export const getUserByEmail = async (email) => {
    const result = await user.findOne({ where: { email } });
    return result;
};

//Get user by PK excluding role
export const getUserByIdExcludingRole = async (id) => {
    const result = await user.findByPk(id, { attributes: { exclude: ["role"] } });
    return result;
};



