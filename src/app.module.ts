
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { UserModule } from './user/user.module';
import { BlockModule } from './block/block.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    UserModule,
    BlockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
