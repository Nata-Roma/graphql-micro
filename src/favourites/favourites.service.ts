import { RemoveFromFavouriteInput } from './dto/remove-from-favourites.dto';
import { AddFavouriteInput } from './dto/add-favourite.input';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FavouritesService {
  private client = null;
  constructor(config: ConfigService) {
    this.client = axios.create({ baseURL: config.get('FAVORITE_URL') });
  }

  async add(
    addFavouriteInput: AddFavouriteInput,
    token: string,
  ) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...addFavouriteInput,
    };

    const resp = await this.client.put('/add', data, {
      headers,
    });
    
    return resp.data;
  }

  async removeFromFavourites(
    removeFromFavouriteInput: RemoveFromFavouriteInput,
    token: string,
  ) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...removeFromFavouriteInput,
    };

    const resp = await this.client.put('/remove', data, {
      headers,
    });
    
    return resp.data;
  }


  async findAll(token: string) {
    const headers = {
      Authorization: token,
    };

    const resp = await this.client.get('', {
      headers,
    });

    return resp.data;
  }

  async remove(id: string, token: string) {
    const headers = {
      Authorization: token,
    };
    const resp = await this.client.delete(`/${id}`, { headers });
    if (resp.data.acknowledged && resp.data.deletedCount === 1) {
      return { _id: id };
    }
    return resp;
  }
}
