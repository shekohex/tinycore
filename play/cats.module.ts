import { Module } from '../src/core';
import { KittyService } from './kitty.service';
import { PlayerModule } from './player.module';

@Module({
  imports: [PlayerModule],
  providers: [KittyService]
})
export class CatsModule {}
