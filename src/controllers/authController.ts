import { Request, Response } from 'express';
import { User } from '../models/user';
import { IUser } from '../types/models';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

// Handle user operations

const register = async (req: Request, res: Response) => {
};

const login = async (req: Request, res: Response) => {
   
};

const logout = async (req: Request, res: Response) => {
   
};


// Handle Tokens

type tTokens = {
    accessToken: string,
    refreshToken: string
}

const generateToken = (userId: string): tTokens | null => {
    if (!process.env.TOKEN_SECRET) {
        return null;
    }
    // generate token
    const random = Math.random().toString();
    const accessToken = jwt.sign({
        _id: userId,
        random: random
    },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRES });

    const refreshToken = jwt.sign({
        _id: userId,
        random: random
    },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};

const refresh = async (req: Request, res: Response) => {

};

type tUser = Document<unknown, {}, IUser> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}
const verifyRefreshToken = (refreshToken: string | undefined) => {

}



export {
    register,
    login,
    refresh,
    verifyRefreshToken,
    logout
};