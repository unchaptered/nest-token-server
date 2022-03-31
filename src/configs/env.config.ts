import { ConfigModuleOptions } from "@nestjs/config";
import Joi from "joi";

/**
 * @use **Joi npm** : https://www.npmjs.com/package/joi
 * @references **kor:nest** : https://darrengwon.tistory.com/965 nest 방식으로 호출하기
 * @references **kor** : https://darrengwon.tistory.com/965 nest 방식으로 설정하기
 * @references **docs** : https://docs.nestjs.com/techniques/configuration
 */
export const envConfig: ConfigModuleOptions = {
    // 모듈 외에서도 사용할 수 있게 설정
    isGlobal: true, 

    // prod 할 때는, heroku 등에 별도로 변수 지정
    envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",
    ignoreEnvFile: process.env.NODE_ENV === "prod",

    // NODE_ENV 로 유효성 검사하기 : https://www.npmjs.com/package/joi
    // validationSchema: Joi.object({
    //     NODE_ENV: Joi.string().valid("dev", "prod", "test").required(),
    //     ORM_TYPE: Joi.string().required(),
    //     ORM_HOST: Joi.string().required(),
    //     ORM_PORT: Joi.string().required(),
    //     ORM_USERNAME: Joi.string().required(),
    //     ORM_PASSWORD: Joi.string().required(),
    //     ORM_DATABASE: Joi.string().required(),
    // })
};