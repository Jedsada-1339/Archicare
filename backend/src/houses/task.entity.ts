import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'house'})
export class House{

    @PrimaryGeneratedColumn('uuid')
    id: number;
}