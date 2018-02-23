import { LoggerService } from './logger.service';
import { Injectable } from '../src/di';
import { PlayerOne } from './player-one.service';
@Injectable()
export class KittyService {
  constructor(private logger: LoggerService, private playerOne: PlayerOne) {
    this.logger.log('Kitty SAYS: Meawo !');
    this.playerOne.sayHello();
  }
}
