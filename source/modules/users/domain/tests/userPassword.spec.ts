import { UserPassword } from "../userPassword"

describe("UserPassword",()=>{
    it("should create user password",()=>{
        const result = UserPassword.create("12345678")

        expect(result.isSuccess).toBeTruthy();
    })

    it("should return error if password is invalid",()=>{
        const result = UserPassword.create(null)

        expect(result.isFailure).toBeTruthy();
    })
})