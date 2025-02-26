import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(
          `mongodb+srv://${config.get<string>('MONGODB_USERNAME')}:${config.get<string>('MONGODB_PASSWORD')}@${config.get<string>('MONGODB_CLUSTER_URL')}/?${config.get<string>('MONGODB_OPTIONS')}`,
        );
        return {
          uri: `mongodb+srv://${config.get<string>('MONGODB_USERNAME')}:${config.get<string>('MONGODB_PASSWORD')}@${config.get<string>('MONGODB_CLUSTER_URL')}/?${config.get<string>('MONGODB_OPTIONS')}`,
        };
      },
    }),
    /* MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}/?${process.env.MONGODB_OPTIONS}`,
      ), */
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
