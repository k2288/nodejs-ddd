import { User } from '../domain/user';
import { UserMap } from '../mappers/UserMap';

export interface IUserRepo {
    findByUsername(usename: string): Promise<User>;
}

export class UserRepo implements IUserRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }
    async findByUsername(username: string): Promise<User> {
        const user = await this.models.User.findOne({ where: { username: username } });
        if (user) return UserMap.toDomain(user);
        return null;
    }
}
