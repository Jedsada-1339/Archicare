import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'house' })
export class Houses {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    content2: string;

    @CreateDateColumn()
    create: Date;
}