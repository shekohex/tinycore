import { Module } from '../src/core';
import { LoggerService } from './logger.service';
import { PlayerModule } from './player.module';
import { CatsModule } from './cats.module';

@Module({
  imports: [CatsModule],
  providers: [LoggerService]
})
export class AppModule {}
