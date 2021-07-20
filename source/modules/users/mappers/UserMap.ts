import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Mapper } from "../../../core/infra/Mapper";
import { User } from "../domain/user";
import { UserPassword } from "../domain/userPassword";

export class UserMap extends Mapper<User>{
    public static toDomain(raw:any):User{
        const userOrError=User.create({
            username:raw.username,
            password:UserPassword.create(raw.password).getValue(),
            roles:[]
        },new UniqueEntityID(raw.id))

        return userOrError.isSuccess?userOrError.getValue():null;
    }
}