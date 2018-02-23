import { InvalidModuleConfigMessage } from '../messages';

export class InvalidModuleConfigException extends Error {
  constructor(property: string) {
    super(InvalidModuleConfigMessage(property));
  }
}
