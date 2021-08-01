import { UseCase } from '../../../../core/domain/UseCase';
import { Either, left, Result, right } from '../../../../core/logic/Result';
import { User } from '../../domain/user';
import { UserPassword } from '../../domain/userPassword';
import { IUserRepo } from '../../repos/userRepo';
import { LoginUserDto, LoginUserResponseDto } from './LoginUserDto';
import { LoginUserErrors } from './LoginUserErrors';


type Response = Either<LoginUserErrors.UserNotFound | LoginUserErrors.IncorrectUserOrPassword | Result<any>, Result<LoginUserResponseDto>>;

export class LoginUserUseCase implements UseCase<LoginUserDto, Promise<any>> {
    private userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async execute(request: LoginUserDto): Promise<Response> {


        const passwordOrError = UserPassword.create(request.password);
        if (passwordOrError.isFailure) {
            return left(Result.fail<void>(passwordOrError.error)) as Response;
        }

        const userOrError = User.create({
            username: request.username,
            password: passwordOrError.getValue(),
            roles: []
        });

        if(userOrError.isFailure){
            return left(Result.fail<void>(userOrError.error)) as Response
        }

        const user = userOrError.getValue()

        const existUser = await this.userRepo.findByUsername(request.username);

        if (!existUser) {
            return left(new LoginUserErrors.UserNotFound()) as Response;
        }

        const isEqual = await user.password.comparePassword(existUser.password.value);

        if (!isEqual) {
            return left(new LoginUserErrors.IncorrectUserOrPassword()) as Response
        }

        const token = user.signToken({
            username: existUser.username,
            id: existUser.id
        });

        return right(Result.ok<LoginUserResponseDto>({token:token,user:{username:user.username}})) as Response
    }
}
