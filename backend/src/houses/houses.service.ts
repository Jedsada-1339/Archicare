import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { Like, Repository } from 'typeorm';
import { Houses } from './houses.entity';
import { Users } from 'src/users/users.entity';

@Injectable()
export class HousesService {
    constructor(
        @InjectRepository(Houses)
        private housesRepository: Repository<Houses>,
    ) { }

    async createHouseDetail(createHouseDto: CreateHouseDto, user: Users): Promise<Houses> {
        const {
            title,
            content,
            area,
            rooms,
            tag,
            like,
            imageUrls,
        } = createHouseDto;

        const house = this.housesRepository.create({
            title,
            content: content || '',

            bedrooms: createHouseDto.bedrooms,
            bathrooms: createHouseDto.bathrooms,
            
            // Area information
            totalArea: area.total,
            usableArea: area.usable,
            terraceArea: area.terrace,
            gardenArea: area.garden,
            
            // Rooms information
            livingRoom: rooms.livingRoom,
            kitchen: rooms.kitchen,
            balcony: rooms.balcony,
            
            // Tags
            onestoryhouse: tag.onestoryhouse,
            twostoryhouse: tag.twostoryhouse,
            apartment: tag.apartment,
            townhouse: tag.townhouse,
            
            // Like system
            likecount: like.likecount,
            dislikecount: like.dislikecount,
            
            imageUrls: imageUrls || [],

            user,
        });

        return await this.housesRepository.save(house);
    }

    async getHouseDetail(user: Users): Promise<any[]> {
        const houses = await this.housesRepository.find({
            relations: ['user']
        });
        
        // Transform data to match the desired structure
        return houses.map(house => ({
            id: house.id,
            title: house.title,
            content: house.content,
            area: {
                total: house.totalArea,
                usable: house.usableArea,
                terrace: house.terraceArea,
                garden: house.gardenArea
            },
            rooms: {
                bedrooms: house.bedrooms,
                bathrooms: house.bathrooms,
                livingRoom: house.livingRoom,
                kitchen: house.kitchen,
                balcony: house.balcony
            },
            tag: {
                onestoryhouse: house.onestoryhouse,
                twostoryhouse: house.twostoryhouse,
                apartment: house.apartment,
                townhouse: house.townhouse
            },
            like: {
                likecount: house.likecount,
                dislikecount: house.dislikecount
            },
            imageUrls: house.imageUrls,
            createdAt: house.createdAt,
            updatedAt: house.updatedAt,
            creator: {
                id: house.user?.id,
                username: house.user?.username,
            }
        }));
    }

    // ✨ ฟังก์ชันใหม่: ดึงเฉพาะ house ของ user ที่ login อยู่
    async getMyHouses(user: Users): Promise<any[]> {
        const houses = await this.housesRepository.find({
            where: { user: { id: user.id } },
            relations: ['user']
        });
        
        return houses.map(house => ({
            id: house.id,
            title: house.title,
            content: house.content,
            area: {
                total: house.totalArea,
                usable: house.usableArea,
                terrace: house.terraceArea,
                garden: house.gardenArea
            },
            rooms: {
                bedrooms: house.bedrooms,
                bathrooms: house.bathrooms,
                livingRoom: house.livingRoom,
                kitchen: house.kitchen,
                balcony: house.balcony
            },
            tag: {
                onestoryhouse: house.onestoryhouse,
                twostoryhouse: house.twostoryhouse,
                apartment: house.apartment,
                townhouse: house.townhouse
            },
            like: {
                likecount: house.likecount,
                dislikecount: house.dislikecount
            },
            imageUrls: house.imageUrls,
            createdAt: house.createdAt,
            updatedAt: house.updatedAt,
            creator: {
                id: house.user.id,
                username: house.user.username,
            }
        }));
    }

    async getHouseById(id: string): Promise<any> {
        const house = await this.housesRepository.findOne({ 
            where: { id }
        });

        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        // Transform data to match the desired structure
        return {
            id: house.id,
            title: house.title,
            content: house.content,
            area: {
                total: house.totalArea,
                usable: house.usableArea,
                terrace: house.terraceArea,
                garden: house.gardenArea
            },
            rooms: {
                bedrooms: house.bedrooms,
                bathrooms: house.bathrooms,
                livingRoom: house.livingRoom,
                kitchen: house.kitchen,
                balcony: house.balcony
            },
            tag: {
                onestoryhouse: house.onestoryhouse,
                twostoryhouse: house.twostoryhouse,
                apartment: house.apartment,
                townhouse: house.townhouse
            },
            like: {
                likecount: house.likecount,
                dislikecount: house.dislikecount
            },
            imageUrls: house.imageUrls,
            createdAt: house.createdAt,
            updatedAt: house.updatedAt
        };
    }

    // ✨ ฟังก์ชันใหม่: ดึงข้อมูล house พร้อมข้อมูลผู้สร้าง
    async getHouseByIdWithCreator(id: string): Promise<any> {
        const house = await this.housesRepository.findOne({ 
            where: { id },
            relations: ['user']
        });

        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        return {
            id: house.id,
            title: house.title,
            content: house.content,
            area: {
                total: house.totalArea,
                usable: house.usableArea,
                terrace: house.terraceArea,
                garden: house.gardenArea
            },
            rooms: {
                bedrooms: house.bedrooms,
                bathrooms: house.bathrooms,
                livingRoom: house.livingRoom,
                kitchen: house.kitchen,
                balcony: house.balcony
            },
            tag: {
                onestoryhouse: house.onestoryhouse,
                twostoryhouse: house.twostoryhouse,
                apartment: house.apartment,
                townhouse: house.townhouse
            },
            like: {
                likecount: house.likecount,
                dislikecount: house.dislikecount
            },
            imageUrls: house.imageUrls,
            createdAt: house.createdAt,
            updatedAt: house.updatedAt,
            creator: {
                id: house.user?.id,
                username: house.user?.username,
            }
        };
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

    async findByTitleContains(title: string): Promise<any[]> {
        const houses = await this.housesRepository.find({
            where: { 
                title: Like(`%${title}%`) 
            },
            relations: ['user']
        });

        // Transform data to match the desired structure
        return houses.map(house => ({
            id: house.id,
            title: house.title,
            content: house.content,
            area: {
                total: house.totalArea,
                usable: house.usableArea,
                terrace: house.terraceArea,
                garden: house.gardenArea
            },
            rooms: {
                bedrooms: house.bedrooms,
                bathrooms: house.bathrooms,
                livingRoom: house.livingRoom,
                kitchen: house.kitchen,
                balcony: house.balcony
            },
            tag: {
                onestoryhouse: house.onestoryhouse,
                twostoryhouse: house.twostoryhouse,
                apartment: house.apartment,
                townhouse: house.townhouse
            },
            like: {
                likecount: house.likecount,
                dislikecount: house.dislikecount
            },
            imageUrls: house.imageUrls,
            createdAt: house.createdAt,
            updatedAt: house.updatedAt,
            creator: {
                id: house.user?.id,
                username: house.user?.username,
            }
        }));
    }

    // ✨ ฟังก์ชันใหม่: ค้นหาเฉพาะ house ของ user ที่ login อยู่
    async findMyHousesByTitle(title: string, user: Users): Promise<any[]> {
        const houses = await this.housesRepository.find({
            where: { 
                title: Like(`%${title}%`),
                user: { id: user.id }
            },
            relations: ['user']
        });

        return houses.map(house => ({
            id: house.id,
            title: house.title,
            content: house.content,
            area: {
                total: house.totalArea,
                usable: house.usableArea,
                terrace: house.terraceArea,
                garden: house.gardenArea
            },
            rooms: {
                bedrooms: house.bedrooms,
                bathrooms: house.bathrooms,
                livingRoom: house.livingRoom,
                kitchen: house.kitchen,
                balcony: house.balcony
            },
            tag: {
                onestoryhouse: house.onestoryhouse,
                twostoryhouse: house.twostoryhouse,
                apartment: house.apartment,
                townhouse: house.townhouse
            },
            like: {
                likecount: house.likecount,
                dislikecount: house.dislikecount
            },
            imageUrls: house.imageUrls,
            createdAt: house.createdAt,
            updatedAt: house.updatedAt,
            creator: {
                id: house.user.id,
                username: house.user.username,
            }
        }));
    }

    // เพิ่ม like
    async likeHouse(id: string): Promise<any> {
        const house = await this.housesRepository.findOne({ where: { id } });
        
        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        house.likecount += 1;
        const updatedHouse = await this.housesRepository.save(house);
        
        return this.getHouseById(id);
    }

    // เพิ่ม dislike
    async dislikeHouse(id: string): Promise<any> {
        const house = await this.housesRepository.findOne({ where: { id } });
        
        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        house.dislikecount += 1;
        await this.housesRepository.save(house);
        
        return this.getHouseById(id);
    }

    // ลบ like
    async removeLike(id: string): Promise<any> {
        const house = await this.housesRepository.findOne({ where: { id } });
        
        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        if (house.likecount > 0) {
            house.likecount -= 1;
        }
        await this.housesRepository.save(house);
        
        return this.getHouseById(id);
    }

    // ลบ dislike
    async removeDislike(id: string): Promise<any> {
        const house = await this.housesRepository.findOne({ where: { id } });
        
        if (!house) {
            throw new NotFoundException(`House with ID ${id} not found`);
        }

        if (house.dislikecount > 0) {
            house.dislikecount -= 1;
        }
        await this.housesRepository.save(house);
        
        return this.getHouseById(id);
    }
}