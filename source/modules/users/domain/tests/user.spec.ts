import { User } from '../user';
import { UserPassword } from '../userPassword';

let password: UserPassword;

describe('User', () => {
    beforeEach(() => {
        password = UserPassword.create('12345678').getValue();
    });


    it('should create user', () => {
        const result = User.create({
            username: 'username',
            password: password,
            roles: []
        });

        expect(result.isSuccess).toBeTruthy();
    });

    it('should return error if username is null', () => {
        const result = User.create({
            username: null,
            password: password,
            roles: []
        });

        expect(result.isFailure).toBeTruthy();
    });

});
