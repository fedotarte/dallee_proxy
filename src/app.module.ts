import { Module, CacheModule, CacheStore } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ImageGenModule } from './image_gen/image_gen.module';
import { MailSenderModule } from './mail_sender/mail_sender.module';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store: redisStore,
      url: 'redis://localhost:6379',
    }),
    ScheduleModule.forRoot(),
    DictionaryModule,
    ImageGenModule,
    MailSenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
