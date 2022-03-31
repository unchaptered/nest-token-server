import { Body, Controller, Param, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AuthService } from "./auth.service";

import { AuthCredentialDTO } from "./dtos/auth-credential-dto";
import { User } from "./classes/user.entity";
import { GetUser } from "./middleware/user.middleware";

@Controller("auth")
export class AuthController {

    constructor( private authService: AuthService ) {}

    /* Body 에 ValidationPipe 를 적용함에 따라서,
     * user.entity.ts 에 있는 class-validator 가 적용되었다.
     */ 

    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO): Promise<void> {
        
        return this.authService.signUp(authCredentialDTO);
        
    }

    @Post("/signin")
    singIn(@Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO): Promise<{ accessToken: string }> {

        return this.authService.singIn(authCredentialDTO);
        
    }
    
    @Post("/test")
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log("user", user);
    }
}