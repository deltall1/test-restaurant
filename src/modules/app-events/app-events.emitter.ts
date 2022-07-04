import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EventName, EventPayload } from './app-events.types';

@Injectable()
export class AppEventsEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit(eventName: EventName, payload?: EventPayload[EventName]): void {
    this.eventEmitter.emit(eventName, payload);
  }
}
