import jwt from 'jsonwebtoken';
import config from '../config/config';

interface DecodedToken {
    userId: string;
}

interface DecodeTokenResult {
    isAuth: boolean;
    userId: string;
}

export const decodeToken = (authHeader: string | undefined): DecodeTokenResult => {
    if (!authHeader) {
        return { isAuth: false, userId: '' };
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        return { isAuth: false, userId: '' };
    }
    let decodedToken;
    try {
        decodedToken = <DecodedToken>jwt.verify(token, config.auth.secretKey);
    } catch (err) {
        return { isAuth: false, userId: '' };
    }
    if (!decodedToken) {
        return { isAuth: false, userId: '' };
    }

    return { isAuth: true, userId: decodedToken.userId };
};
