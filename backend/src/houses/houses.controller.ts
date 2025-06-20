import { Request, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { Houses } from './houses.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import * as path from 'path'; // 👈 สำคัญมาก เพื่อจัดการ path แบบ cross-platform


const uploadPath = path.resolve(
  'D:/งาน/ค่าย The zercle 2025/Archicare/frontend/public/img/house',
);
// Configuration for file upload
const storage = diskStorage({
    destination: uploadPath, // Directory to save files
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `house-${uniqueSuffix}${ext}`);
    },
});

// File filter for images only
const imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};

@Controller('houses')
export class HousesController {
    constructor(private housesService: HousesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('images', 6, { // Maximum 6 files
        storage,
        fileFilter: imageFileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB per file
        },
    }))
    async createHouseDetail(
        @Body('houseData') houseDataString: string, // รับ JSON string
        @UploadedFiles() files: Express.Multer.File[],
        @Request() {user}: any,
    ): Promise<Houses> {
        // Validate file count
        if (files && files.length > 6) {
            throw new BadRequestException('Maximum 6 images allowed');
        }

        // Parse JSON string to object
        let createHouseDto: CreateHouseDto;
        try {
            createHouseDto = JSON.parse(houseDataString);
        } catch (error) {
            throw new BadRequestException('Invalid JSON format for house data');
        }

        // Generate image URLs from uploaded files
        const imageUrls: string[] = [];
        if (files && files.length > 0) {
            files.forEach(file => {
                // Create URL path for the uploaded image
                // const imageUrl = `${file.filename}`;
                const imageUrl = `/img/house/${file.filename}`;
                imageUrls.push(imageUrl);
            });
        }

        // Add imageUrls to createHouseDto (replace existing imageUrls with actual uploaded files)
        const houseData = {
            ...createHouseDto,
            imageUrls: imageUrls.length > 0 ? imageUrls : createHouseDto.imageUrls || []
        };

        return this.housesService.createHouseDetail(houseData, user);
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