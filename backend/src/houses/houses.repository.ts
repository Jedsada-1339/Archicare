import { Entity, EntityRepository, Repository } from "typeorm";
import { Houses } from "./houses.entity";

@EntityRepository(Houses)
export class HousesRepository extends Repository<Houses>{

}