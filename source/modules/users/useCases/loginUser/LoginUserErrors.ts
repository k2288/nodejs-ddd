import i18n from "../../../../config/i18n";
import { Result } from "../../../../core/logic/Result";
import { UseCaseError } from "../../../../core/logic/UseCaseError";

export namespace LoginUserErrors{
    export class UserNotFound extends Result<UseCaseError>{
        constructor(){
            super(false,{
                message :i18n.__("User not found")
            }as UseCaseError);
        }
    }

    export class IncorrectUserOrPassword extends Result<UseCaseError>{
        constructor(){
            super(false,{
                message:i18n.__("Incorrect username or password")
            })
        }
    }
}