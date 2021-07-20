import { User } from "../../domain/user";
import { UserPassword } from "../../domain/userPassword";
import { FakeUserRepo } from "../../repos/test/fakeUserRepo"
import { LoginUserErrors } from "./LoginUserErrors";
import { LoginUserUseCase } from "./LoginUserUseCase";

let userRepo:FakeUserRepo;
let useCase :LoginUserUseCase
describe("LoginUserUseCase",()=>{

    beforeEach(async ()=>{
        userRepo=new FakeUserRepo();
        userRepo.addFakeItem(User.create({
            username:"admin",
            password:UserPassword.create(await UserPassword.hashPassword("12345678")).getValue(),
            roles:[]
        }).getValue())

        useCase=new LoginUserUseCase(userRepo);
    })

    it("should return not found user error",async ()=>{
        const result = await useCase.execute({
            username:"super-admin",
            password:"12345678"
        })

        expect(result.value.isFailure).toBeTruthy();
        expect(result.value.constructor).toBe(LoginUserErrors.UserNotFound)
    })

    it("should return error if password is empty",async ()=>{
        const result = await useCase.execute({
            username:"admin",
            password:null
        })
        
        expect(result.value.isFailure).toBeTruthy();
    })

    it("should return incorrect password",async ()=>{
        const result = await useCase.execute({
            username:"admin",
            password:"123"
        })

        expect(result.value.isFailure).toBeTruthy();
        expect(result.value.constructor).toBe(LoginUserErrors.IncorrectUserOrPassword)
    })

    it("should return token",async ()=>{
        const result = await useCase.execute({
            username:"admin",
            password:"12345678"
        })
        expect(result.value.isSuccess).toBeTruthy();
        expect(result.isRight()).toBeTruthy();
    })

});