import { User } from "../../domain/user";
import { UserPassword } from "../../domain/userPassword";
import { FakeUserRepo } from "./fakeUserRepo"

let repo :FakeUserRepo;
let user :User
describe("FakeUserRepo",()=>{
    beforeEach(()=>{
        repo=null
    })

    it("should be able to find by username",async ()=>{
        repo=new FakeUserRepo();

        repo.addFakeItem(
            User.create({
                username:"admin",
                password:UserPassword.create("12345678").getValue(),
                roles:[]
            }).getValue()
        )

        user = await repo.findByUsername("admin");
        expect(user).toBeTruthy();
        expect(user.username).toEqual("admin")
    })
})