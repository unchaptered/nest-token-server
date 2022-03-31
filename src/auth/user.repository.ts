import * as bcrypt from "bcryptjs";
import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import { User } from "./classes/user.entity";
import { AuthCredentialDTO } from "./dtos/auth-credential-dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(authCredentialDTO: AuthCredentialDTO): Promise<void> {

        const { username, password } = authCredentialDTO;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword });

        try {
            await this.save(user);
        } catch(err) {
            if (err.code === "23505") throw new ConflictException("Existing Username");
            else {
                throw new InternalServerErrorException();
            }
        }
    }
}