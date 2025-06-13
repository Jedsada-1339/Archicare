import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'house' })
export class Houses {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column('simple-array', { nullable: true })
    imageUrls: string[];

    @Column({ default: 0 })
    liked: number;

    @Column({ default: 0 })
    disliked: number;

    @Column({ default: 0 })
    bedrooms: number;

    @Column({ default: 0 })
    bathroom: number;

    @Column()
    categoryId: number;

    @Column({ default: false })
    livingRoom: boolean;

    @Column({ default: false })
    kitchen: boolean;

    @Column({ default: false })
    terrace: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}