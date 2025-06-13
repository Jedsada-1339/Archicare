import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { Repository } from 'typeorm';
import { Houses } from './houses.entity';

@Injectable()
export class HousesService {
    constructor(
        @InjectRepository(Houses)
        private housesRepository: Repository<Houses>,
    ) { }

    async createHouseDetail(createHouseDto: CreateHouseDto): Promise<Houses> {
        const {
            title,
            content,
            content2,
        } = createHouseDto

        const house = await this.housesRepository.create({
            title,
            content,
            content2,
        })

        await this.housesRepository.save(house)
        return house
    }

    async getHouseDetail(): Promise<Houses[]> {
        const house = await this.housesRepository.find()
        return house
    }

    async deleteHouseDetail(id: string): Promise<Houses> {
        const house = await this.housesRepository.findOne({ where: { id } });

        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        await this.housesRepository.delete(id);
        return house;
    }

    async deleteAllHouses(): Promise<void> {
        await this.housesRepository.clear(); // ลบทั้งหมด
    }
}
