import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.ORM_HOST ? process.env.ORM_HOST : "localhost",
    port: process.env.ORM_PORT ? +process.env.ORM_PORT : 5432,
    username: process.env.ORM_USERNAME ? process.env.ORM_USERNAME : "postgres",
    password: process.env.ORM_PASSWORD ? process.env.ORM_PASSWORD : "password",
    database: process.env.ORM_DATABASE ? process.env.ORM_DATABASE : "db-name",
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: true
};