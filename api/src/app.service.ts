import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): { message: string } {
    return {
      message: 'BeSitter API ' + process.env.APP_VERSION,
    };
  }
}
