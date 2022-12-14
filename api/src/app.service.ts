import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    return 'Welcome to Authobahn Dashboard API!';
  }
}
