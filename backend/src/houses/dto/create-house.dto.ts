import { IsArray, IsNotEmpty, IsOptional, IsString, IsNumber, Min, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

export class CreateHouseDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsString()
    categoryId: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    liked?: number = 0

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    disliked?: number = 0

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    bedrooms?: number = 0

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    bathroom?: number = 0

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    imageUrls?: string[];

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    livingRoom?: boolean = false

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    kitchen?: boolean = false

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    terrace?: boolean = false
}