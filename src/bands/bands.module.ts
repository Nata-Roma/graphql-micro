import { GenresService } from './../genres/genres.service';
import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';

@Module({
  providers: [BandsResolver, BandsService, GenresService]
})
export class BandsModule {}
