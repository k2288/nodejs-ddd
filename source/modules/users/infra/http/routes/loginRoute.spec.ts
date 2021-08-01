import { httpserver } from '../../../../../infra/http/app';
import request from 'supertest';
describe('/api/v1/user/login', () => {

    let username:string;
    let password:string;

    beforeEach(()=>{
        username="super-admin";
        password="123456"
    })

    afterEach(()=>{
        httpserver.close();
    })

    const exec = async () => {
        return await request(httpserver).post('/api/v1/user/login').send({ username: username,password:password });
    }

    it("should return token",async ()=>{
        const response=await exec();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    })


    it("should return 404 if username not exist",async ()=>{
        username="admin"
        const response=await exec();

        expect(response.status).toBe(404);
    })
    it("should return 400 if password incorrect",async ()=>{
        password="12345678"
        const response=await exec();

        expect(response.status).toBe(400);
    })

    it("should return 400 if password is null",async ()=>{
        password=null
        const response=await exec();

        expect(response.status).toBe(400);
    })
    it("should return 400 if username is null",async ()=>{
        username=null
        const response=await exec();

        expect(response.status).toBe(400);
    })
});
