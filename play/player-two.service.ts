import { LoggerService } from './logger.service';
import { Injectable } from '../src/di';
import { PlayerOne } from './player-one.service';
@Injectable()
export class PlayerTwo {
  constructor(private logger: LoggerService, private playerOne: PlayerOne) {
    this.logger.log('PlayerTwo SAYS: HI !');
    playerOne.sayHello();
    this.sayHello();
  }
  sayHello() {
    this.logger.log('PlayerTwo SAYS: Hello !');
  }
}
