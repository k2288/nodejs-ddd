import { ValueObject } from '../../../core/domain/ValueObject';
import bcrypt from 'bcryptjs';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import i18n from '../../../config/i18n';
interface UserPasswordProps {
    value: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
    get value(): string {
        return this.props.value;
    }

    constructor(props) {
        super(props);
    }

    public static create(password: string): Result<UserPassword> {
        const guardResult = Guard.againstNullOrUndefined(password, i18n.__('password'));

        if (!guardResult.succeeded) {
            return Result.fail<UserPassword>(guardResult.message);
        } else {
            return Result.ok<UserPassword>(new UserPassword({ value: password }));
        }
    }

    public async comparePassword(password: string) {
        return await bcrypt.compare(this.value, password);
    }

    public static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12)
    }
}
