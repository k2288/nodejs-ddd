import { BaseFakeRepo } from '../../../../core/tests/BaseFakeRepo';
import { User } from '../../domain/user';
import { UserPassword } from '../../domain/userPassword';
import { IUserRepo } from '../userRepo';

export class FakeUserRepo extends BaseFakeRepo<User> implements IUserRepo {
    public async findByUsername(username: string): Promise<User> {
        const matches = this._items.filter((a) => a.username.toLowerCase() === username.toLowerCase());
        if (matches.length === 0) {
            return null;
        } else {
            return matches[0];
        }
    }


    public compareFakeItems(a: User, b: User): boolean {
        return a.id.equals(b.id);
    }
}
