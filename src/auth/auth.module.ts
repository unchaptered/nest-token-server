import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";

import { JwtStrategy } from "./middleware/jwt.token";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "./user.repository";


@Module({
  imports: [
    // 60 * 60 = 3600s = 1 hours 
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({ secret:"Secret1234", signOptions:{ expiresIn: "7 days" } }),
    TypeOrmModule.forFeature([ UserRepository ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}