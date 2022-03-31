import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { envConfig } from "./configs/env.config";
import { typeORMConfig } from "./configs/typeorm.config";

import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
