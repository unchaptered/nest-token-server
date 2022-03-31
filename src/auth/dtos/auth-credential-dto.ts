import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDTO {

    @IsString()
    // @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    // @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/,{
        message: `password only accepts englsih and number`
    })
    password: string;
    
}