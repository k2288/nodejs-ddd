import { userRepo } from "../../repos"
import { LoginController } from "./LoginController"
import { LoginUserUseCase } from "./LoginUserUseCase"

const loginUserUseCase = new LoginUserUseCase(userRepo)
const loginController = new LoginController(loginUserUseCase);

export {
    loginUserUseCase,
    loginController
}