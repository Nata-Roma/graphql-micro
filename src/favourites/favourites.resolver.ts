import { RemoveFromFavouriteInput } from './dto/remove-from-favourites.dto';
import { AddFavouriteInput } from './dto/add-favourite.input';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { FavouritesService } from './favourites.service';
import { Favourite } from './entities/favourite.entity';

@Resolver(() => Favourite)
export class FavouritesResolver {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Mutation(() => Favourite)
  addToFavourites(
    @Args('addFavouriteInput')
    addFavouriteInput: AddFavouriteInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.favouritesService.add(addFavouriteInput, token);
  }

  @Query(() => Favourite, { name: 'favourites', nullable: true })
  findAll(@Context('req') req: any) {
    const token = req.headers.authorization;
    return this.favouritesService.findAll(token);
  }

  @Mutation(() => Favourite)
  removeFromFavourites(
    @Args('removeFromFavouriteInput')
    removeFromFavouriteInput: RemoveFromFavouriteInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.favouritesService.removeFromFavourites(removeFromFavouriteInput, token);
  }

  @Mutation(() => Favourite)
  removeFavourite(
    @Args('id', { type: () => String }) id: string,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.favouritesService.remove(id, token);
  }
}
