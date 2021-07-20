import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { UserPassword } from './userPassword';
import jwt from 'jsonwebtoken';
import config from '../../../config/config';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';

interface UserProps {
    username: string;
    password: UserPassword;
    roles: [string?];
}

export class User extends AggregateRoot<UserProps> {
    get username(): string {
        return this.props.username;
    }

    get password(): UserPassword {
        return this.props.password;
    }

    get roles(): [string?] {
        return this.props.roles;
    }

    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
        const guardedProps = [
            { argument: props.username, argumentName: 'username' },
            { argument: props.password, argumentName: 'password' }
        ];

        const guardResult= Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!guardResult.succeeded){
            return Result.fail<User>(guardResult.message);
        }

        return Result.ok<User>(new User(
            {
                ...props
            },
            id
        ))
    }

    public signToken(payload: any) {
        return jwt.sign(payload, config.auth.secretKey, {
            expiresIn: '24h'
        });
    }
}
