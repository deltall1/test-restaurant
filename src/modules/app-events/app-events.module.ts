import { Module } from '@nestjs/common';

import { AppEventsEmitter } from './app-events.emitter';

@Module({
  imports: [],
  providers: [AppEventsEmitter],
  exports: [AppEventsEmitter],
})
export class AppEventsModule {}
