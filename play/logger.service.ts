import { Injectable } from '../src/di';

@Injectable()
export class LoggerService {
  log(msg: any) {
    console.log(msg);
  }
}
