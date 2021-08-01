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
                        return this.notFound(error.errorValue())
                    case LoginUserErrors.IncorrectUserOrPassword:
                        return this.clientError(error.errorValue())
                    default:
                        return this.fail(error.errorValue());
                }
            }

        } catch (err) {
            return this.fail(err);
        }
    }
}
