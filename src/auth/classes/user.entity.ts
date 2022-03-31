import { Entity, BaseEntity, Unique, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
    

}