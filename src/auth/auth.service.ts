import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserRepository } from "./user.repository";
import { AuthCredentialDTO } from "./dtos/auth-credential-dto";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialDTO: AuthCredentialDTO): Promise<void> {

        return this.userRepository.createUser(authCredentialDTO);

    }

    async singIn(authCredentialDTO: AuthCredentialDTO): Promise<{ accessToken: string }> {

        const { username, password:typedPassword } = authCredentialDTO;
        const user = await this.userRepository.findOne({ username });

        if (user && (await bcrypt.compare(typedPassword, user.password))) {

            const payload = { username };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };

        } else {

            throw new UnauthorizedException("login failed");

        }

    }
}

