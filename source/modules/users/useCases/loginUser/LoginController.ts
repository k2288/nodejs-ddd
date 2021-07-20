import { BaseController } from '../../../../core/infra/BaseController';
import { LoginUserDto } from './LoginUserDto';
import { LoginUserErrors } from './LoginUserErrors';
import { LoginUserUseCase } from './LoginUserUseCase';

export class LoginController extends BaseController {
    private loginUserUseCase: LoginUserUseCase;

    constructor(loginUserUseCase: LoginUserUseCase) {
        super();
        this.loginUserUseCase = loginUserUseCase;
    }

    protected async executeImpl(): Promise<any> {
        const dto: LoginUserDto = this.req.body as LoginUserDto;
        try {
            const result=await this.loginUserUseCase.execute(dto);

            if(result.isRight()){
                return this.ok(this.res,result.value.getValue())
            }else if(result.isLeft()){
                const error = result.value;
                switch(error.constructor){
                    case LoginUserErrors.UserNotFound:
                        return this.notFound(error.getValue().message)
                    case LoginUserErrors.IncorrectUserOrPassword:
                        return this.clientError(error.getValue().message)
                    default:
                        return this.fail(error.getValue().message);
                }
            }

        } catch (err) {
            return this.fail(err);
        }
    }
}
