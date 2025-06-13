import { Module } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Houses } from './houses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Houses])],
  controllers: [HousesController],
  providers: [HousesService]
})
export class HousesModule {}
