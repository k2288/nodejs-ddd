import i18n from "../../../../config/i18n";
import { Result } from "../../../../core/logic/Result";
import { UseCaseError } from "../../../../core/logic/UseCaseError";

export namespace LoginUserErrors{
    export class UserNotFound extends Result<UseCaseError>{
        constructor(){
            console.log(i18n.getLocale())
            super(false,{
                text :"User not found"
            }as UseCaseError);
        }
    }

    export class IncorrectUserOrPassword extends Result<UseCaseError>{
        constructor(){
            super(false,{
                text:"Incorrect username or password"
            })
        }
    }
}