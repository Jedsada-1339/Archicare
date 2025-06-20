import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HousesModule } from './houses/houses.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath :[`.env.stage.${process.env.STAGE}`]
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => {
        return{
          type:'postgres',
          autoLoadEntities : true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_POST'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE')
        }
      }
    }),

    HousesModule,

    ImagesModule,

    AuthModule,

    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
