import { IsArray, IsNotEmpty, IsOptional, IsString, IsNumber, Min, IsBoolean, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

class AreaDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    total: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    usable: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    terrace: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    garden: number;
}

class RoomsDto {
    @IsBoolean()
    livingRoom: boolean;

    @IsBoolean()
    kitchen: boolean;

    @IsBoolean()
    balcony: boolean;
}

class TagDto {
    @IsBoolean()
    onestoryhouse: boolean;

    @IsBoolean()
    twostoryhouse: boolean;

    @IsBoolean()
    apartment: boolean;

    @IsBoolean()
    townhouse: boolean;
}

class LikeDto {
    @IsNumber()
    @Min(0)
    likecount: number;

    @IsNumber()
    @Min(0)
    dislikecount: number;
}

export class CreateHouseDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content?: string;

    @ValidateNested()
    @Type(() => AreaDto)
    area: AreaDto;

    @ValidateNested()
    @Type(() => RoomsDto)
    rooms: RoomsDto;

    @ValidateNested()
    @Type(() => TagDto)
    tag: TagDto;

    @ValidateNested()
    @Type(() => LikeDto)
    like: LikeDto;

    @IsNumber()
    @Min(0)
    bedrooms: number;

    @IsNumber()
    @Min(0)
    bathrooms: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    imageUrls?: string[];
}