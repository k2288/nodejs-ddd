import models from "../../../infra/sequelize/models";
import { UserRepo } from "./userRepo";

const userRepo=new UserRepo(models);

export {
    userRepo
}