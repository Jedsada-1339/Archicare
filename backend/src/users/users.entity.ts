import { Houses } from "src/houses/houses.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:string

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column('simple-array', { nullable: true })
    favHouse: string[];

    @Column('simple-array', { nullable: true })
    favBlog: string[];

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    createdUpdate: Date

    @OneToMany(type => Houses,houses => houses.user)
    houses: Houses
}