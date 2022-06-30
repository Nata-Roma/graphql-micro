import { BandsService } from './../bands/bands.service';
import { Band } from './../bands/entities/band.entity';
import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService, private readonly bandsService: BandsService) {}

  @Mutation(() => Artist)
  createArtist(@Args('createArtistInput') createArtistInput: CreateArtistInput, @Context('req') req: any) {
    const token = req.headers.authorization;
    return this.artistsService.create(createArtistInput, token);
  }

  @Query(() => [Artist], { name: 'artists', nullable: 'itemsAndList' })
  findAll() {
    return this.artistsService.findAll();
  }

  @Query(() => Artist, { name: 'artist' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.artistsService.findOne(id);
  }

  @Mutation(() => Artist)
  updateArtist(@Args('updateArtistInput') updateArtistInput: UpdateArtistInput, @Context('req') req: any) {
    const token = req.headers.authorization;
    return this.artistsService.update(updateArtistInput._id, updateArtistInput, token);
  }

  @Mutation(() => Artist)
  removeArtist(@Args('id', { type: () => String }) id: string, @Context('req') req: any) {
    const token = req.headers.authorization;
    return this.artistsService.remove(id, token);
  }

  @ResolveField('bands', () => [Band])
  getTracks(@Parent() artist: Artist) {
    const { bandsIds } = artist;

    const promises = Promise.all(
      bandsIds.map((id) => {
        return this.bandsService.findOne(id);
      }),
    );

    return promises;
  }
}
