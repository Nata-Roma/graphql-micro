import { BandsService } from './../bands/bands.service';
import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsResolver } from './artists.resolver';

@Module({
  providers: [ArtistsResolver, ArtistsService, BandsService]
})
export class ArtistsModule {}
