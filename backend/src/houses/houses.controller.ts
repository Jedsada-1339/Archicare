import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

    @Delete(':id')
    deleteHouseDetail(@Param('id') id: string): Promise<Houses> {
        return this.housesService.deleteHouseDetail(id);
    }

    @Delete()
    deleteAllHouses(): Promise<void> {
        return this.housesService.deleteAllHouses();
    }

}
