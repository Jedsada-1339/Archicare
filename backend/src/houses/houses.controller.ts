import { Request,Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { Houses } from './houses.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('houses')
export class HousesController {
    constructor(private housesService: HousesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    createHouseDetail(
        @Body() createHouseDto: CreateHouseDto,
        @Request() {user}: any,
    ): Promise<Houses> {
        return this.housesService.createHouseDetail(createHouseDto,user)
    }

    @Get()
    getHouseDetail(
        @Request() {user}: any,
    ): Promise<Houses[]> {
        return this.housesService.getHouseDetail(user)
    }

    // ดึงข้อมูล house เฉพาะของ user ที่ login อยู่
    @UseGuards(JwtAuthGuard)
    @Get('my-houses')
    getMyHouses(@Request() {user}: any): Promise<any[]> {
        return this.housesService.getMyHouses(user);
    }

    @Get('search')
    findByTitle(@Query('title') title: string): Promise<Houses[]> {
        return this.housesService.findByTitleContains(title);
    }

    // ค้นหา house เฉพาะของ user ที่ login อยู่
    @UseGuards(JwtAuthGuard)
    @Get('my-houses/search')
    findMyHousesByTitle(
        @Query('title') title: string,
        @Request() {user}: any
    ): Promise<any[]> {
        return this.housesService.findMyHousesByTitle(title, user);
    }

    @Get(':id')
    getHouseById(@Param('id') id: string): Promise<Houses> {
        return this.housesService.getHouseById(id);
    }

    // ดึงข้อมูล house พร้อมข้อมูลผู้สร้าง
    @Get(':id/with-creator')
    getHouseByIdWithCreator(@Param('id') id: string): Promise<any> {
        return this.housesService.getHouseByIdWithCreator(id);
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