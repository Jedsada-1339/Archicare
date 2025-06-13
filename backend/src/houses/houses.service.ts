import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { Like, Repository } from 'typeorm';
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
            categoryId,
            bedrooms,
            bathroom,
            livingRoom,
            kitchen,
            terrace,
            liked,
            disliked,
            imageUrls,
        } = createHouseDto

        const house = this.housesRepository.create({
            title,
            content,
            categoryId: parseInt(categoryId),
            liked: liked || 0,
            disliked: disliked || 0,
            bedrooms: bedrooms || 0,
            bathroom: bathroom || 0,
            livingRoom: livingRoom || false,
            kitchen: kitchen || false,
            terrace: terrace || false,
            imageUrls: imageUrls || [], 
        })

        return await this.housesRepository.save(house)
    }

    async getHouseDetail(): Promise<Houses[]> {
        return await this.housesRepository.find()
    }

    async getHouseById(id: string): Promise<Houses> {
        const house = await this.housesRepository.findOne({ 
            where: { id }
        });

        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        return house;
    }

    async deleteHouseDetail(id: string): Promise<Houses> {
        const house = await this.housesRepository.findOne({ 
            where: { id }
        });

        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        await this.housesRepository.delete(id);
        return house;
    }

    async deleteAllHouses(): Promise<void> {
        await this.housesRepository.clear();
    }

    async findByTitleContains(title: string): Promise<Houses[]> {
        return await this.housesRepository.find({
            where: { 
                title: Like(`%${title}%`) 
            }
        });
    }

    // เพิ่ม like
    async likeHouse(id: string): Promise<Houses> {
        const house = await this.housesRepository.findOne({ where: { id } });
        
        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        house.liked += 1;
        return await this.housesRepository.save(house);
    }

    // เพิ่ม dislike
    async dislikeHouse(id: string): Promise<Houses> {
        const house = await this.housesRepository.findOne({ where: { id } });
        
        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        house.disliked += 1;
        return await this.housesRepository.save(house);
    }

    // ลบ like
    async removeLike(id: string): Promise<Houses> {
        const house = await this.housesRepository.findOne({ where: { id } });
        
        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        if (house.liked > 0) {
            house.liked -= 1;
        }
        return await this.housesRepository.save(house);
    }

    // ลบ dislike
    async removeDislike(id: string): Promise<Houses> {
        const house = await this.housesRepository.findOne({ where: { id } });
        
        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        if (house.disliked > 0) {
            house.disliked -= 1;
        }
        return await this.housesRepository.save(house);
    }
}