// import { Module } from '@nestjs/common';
// import { DatabaseService } from './database.service';

// @Module({
//   providers: [DatabaseService],
//   exports: [DatabaseService],
// })
// export class DatabaseModule {}

import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Project } from '../../../apps/project/src/entities/project.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URI'),
        database: configService.get<string>('MONGODB_DATABASE'),
        // entities: [__dirname + '/../**/*.entity{.ts,js}'],
        entities: [Project], 
        synchronize: true, // disable in production
        useUnifiedTopology: true,
        useNewUrlParser: true,
        logging: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}