import { app } from '../../../../../infra/http/app';
import request from 'supertest';
describe('/api/v1/user/login', () => {

    let username:string;
    let password:string;

    beforeEach(()=>{
        username="admin";
        password="12345678"
    })

    const exec = async () => {
        return await request(app).post('/api/v1/user/login').send({ username: username,password:password });
    };
});
