import { Module } from '../src/core';
import { PlayerOne } from './player-one.service';
import { PlayerTwo } from './player-two.service';
import { CatsModule } from './cats.module';
@Module({
  providers: [PlayerOne, PlayerTwo],
  exports: [PlayerOne]
})
export class PlayerModule {}
