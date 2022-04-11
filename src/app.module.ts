import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telegraf } from 'telegraf';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "admin",
    password: "password",
    database: "bot",
    entities: [User],
    synchronize: true,
    logging: true
  }),
  ConfigModule.forRoot(),
    UsersModule,
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    include: [UsersModule],
    autoSchemaFile: true,
  })
  ],
  providers: [AppService, Telegraf, UsersService],
})
export class AppModule {
  constructor(private readonly appService: AppService) {
    this.appService.runBot();
  }
}
