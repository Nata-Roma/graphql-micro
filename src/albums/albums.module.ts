import { TracksService } from './../tracks/tracks.service';
import { GenresService } from './../genres/genres.service';
import { BandsService } from './../bands/bands.service';
import { ArtistsService } from './../artists/artists.service';
import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';

@Module({
  providers: [AlbumsResolver, AlbumsService, ArtistsService, BandsService, GenresService, TracksService]
})
export class AlbumsModule {}
