import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { Houses } from './houses.entity';

@Controller('houses')
export class HousesController {
    constructor(private housesService: HousesService) { }

    @Post()
    createHouseDetail(
        @Body() createHouseDto: CreateHouseDto
    ): Promise<Houses> {
        return this.housesService.createHouseDetail(createHouseDto)
    }

    @Get()
    getHouseDetail(): Promise<Houses[]> {
        return this.housesService.getHouseDetail()
    }

    @Get('search')
    findByTitle(@Query('title') title: string): Promise<Houses[]> {
        return this.housesService.findByTitleContains(title);
    }

    @Get(':id')
    getHouseById(@Param('id') id: string): Promise<Houses> {
        return this.housesService.getHouseById(id);
    }

    @Put(':id/like')
    likeHouse(@Param('id') id: string): Promise<Houses> {
        return this.housesService.likeHouse(id);
    }

    @Put(':id/dislike')
    dislikeHouse(@Param('id') id: string): Promise<Houses> {
        return this.housesService.dislikeHouse(id);
    }

    @Put(':id/remove-like')
    removeLike(@Param('id') id: string): Promise<Houses> {
        return this.housesService.removeLike(id);
    }

    @Put(':id/remove-dislike')
    removeDislike(@Param('id') id: string): Promise<Houses> {
        return this.housesService.removeDislike(id);
    }

    @Delete(':id')
    deleteHouseDetail(@Param('id') id: string): Promise<Houses> {
        return this.housesService.deleteHouseDetail(id);
    }

    @Delete()
    deleteAllHouses(): Promise<void> {
        return this.housesService.deleteAllHouses();
    }
}