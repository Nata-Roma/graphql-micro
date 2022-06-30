import { ArtistsService } from './../artists/artists.service';
import { BandsService } from './../bands/bands.service';
import { GenresService } from './../genres/genres.service';
import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksResolver } from './tracks.resolver';

@Module({
  providers: [TracksResolver, TracksService, GenresService, BandsService, ArtistsService]
})
export class TracksModule {}
