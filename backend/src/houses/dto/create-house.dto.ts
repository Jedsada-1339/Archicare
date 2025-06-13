import { IsNotEmpty } from "class-validator";

export class CreateHouseDto{

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string
}