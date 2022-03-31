# nest-token-server

본 탬플릿은 _2022년 3월 31일_ 에 작성되었습니다.

## Stack

본 프로젝트는 다음과 같은 기술 스텍을 포함하고 있습니다.

1. Nest.JS
2. PostgreSQL, pgAdmin, TypeORM
3. dotenv, cross-env, @nest/dotenv
4. passport-jwt, @nest/passport-jwt, @nest/jwt
5. bcrypt
6. joi, class-validator, class-transformer
7. uuid

상세한 버전은 ## Version 혹은 **package.json** 을 참고해주세요.

## Version

```
node@14.17.3
npm@6.14.13

nest@8.0.0
postgreSQL@14.1.0
pgAdmin@4.0
typeorm@0.2.0
// ... pakcage.json
```

## Usage

본 Template 사용 가이드입니다.

### 1. Clone, Degit

```
git clone https://github.com/unchaptered/nest-token-server [my-app-name]
npx degit unchaptered/nest-token-server [my-app-name]
```

### 2. Set TypeORM

TypeORM 설정을 확인하고 개인 설정에 맞게 바꿔주세요.

```typescript
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 1111,
    username: "postgres",
    password: "password",
    database: "db-name",
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: true
};
```

Deploy 할 때는 synchronize 를 false 로 해주세요.

### 3. Set Config

@nest/dotenv 설정에 맞게 하기 2개의 파일을 작성해주세요.

```typescript
.env.dev
.env.test
```

아래 처럼 작성하면 되며, 주의할 점은 dotenv 에서는 모든 값이 **stirng 으로 출력** 된다는 것입니다.

```env
ORM_TYPE="postgres"
ORM_HOST="localhost"
ORM_PORT=1111
```
### 4. Set Token Scret

Token Secret 을 설정해주고 이를 꼭 **환경변수(@nest/dotenv)로 사용** 해주세요.

다음의 2개의 파일을 수정해주면 됩니다.

1. jwt.token.ts
2. auth.module.ts

#### 4.1. jwt.token.ts 

```typescript
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: "Secret1234",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    
    // ...
    
}
```

#### 4.2. auth.module.ts

```typescript
@Module({
  imports: [
    // ...
    JwtModule.register({ secret:"Secret1234", signOptions:{ expiresIn: "7 days" } }),
    // ...
  ],
  // ...
})
export class AuthModule {}
```



### References

본 문서는 [unchaptered / 22-03-nest-board](https://github.com/unchaptered/22-03-nestjs-board) 와 [jaewonhimnae / nestjs-board-app](https://github.com/jaewonhimnae/nestjs-board-app) 를 기반으로 만들어졌습니다.
