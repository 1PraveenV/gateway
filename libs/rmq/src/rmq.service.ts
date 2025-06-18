// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class RmqService {}

import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RmqService {
  constructor(
    @Inject('RMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  emit(pattern: string, data: any): void {
    this.client.emit(pattern, data);
  }

  async send<TResult = any, TInput = any>(
    pattern: string,
    data: TInput,
  ): Promise<TResult | undefined> {
    try {
      const result$ = this.client.send<TResult, TInput>(pattern, data);
      return await lastValueFrom(result$);
    } catch (error) {
      console.error('RMQ communication error:', error);
      return undefined;
    }
  }
}