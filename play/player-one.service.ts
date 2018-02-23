import { LoggerService } from './logger.service';
import { Injectable } from '../src/di';
@Injectable()
export class PlayerOne {
  private readonly isLoadedOnce: number = 0;
  constructor(private logger: LoggerService) {
    this.isLoadedOnce++;
    this.logger.log(`PlayerOne Loaded ${this.isLoadedOnce} Times !`);
  }
  sayHello() {
    this.logger.log('PlayerOne SAYS: Hello !');
  }
}
