import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'house' })
export class Houses {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    content: string;

    @Column('simple-array', { nullable: true })
    imageUrls: string[];

    // Area information
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalArea: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    usableArea: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    terraceArea: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    gardenArea: number;

    // Rooms information
    @Column({ default: 0 })
    bedrooms: number;

    @Column({ default: 0 })
    bathrooms: number;

    @Column({ default: false })
    livingRoom: boolean;

    @Column({ default: false })
    kitchen: boolean;

    @Column({ default: false })
    terrace: boolean;

    // House type tags
    @Column({ default: false })
    onestoryhouse: boolean;

    @Column({ default: false })
    twostoryhouse: boolean;

    @Column({ default: false })
    apartment: boolean;

    @Column({ default: false })
    townhouse: boolean;

    // Like system
    @Column({ default: 0 })
    likecount: number;

    @Column({ default: 0 })
    dislikecount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}