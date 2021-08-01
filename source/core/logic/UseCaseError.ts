import { Replacements } from "i18n";

interface IUseCaseErrorError {
  text: string;
  variables?:Replacements
}

export abstract class UseCaseError implements IUseCaseErrorError {
  public readonly text: string;
  public readonly variables?:Replacements
  
  constructor (message: string,variables:Replacements) {
    this.text = message;
  }
}
