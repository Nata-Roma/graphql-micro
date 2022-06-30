import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import axios from 'axios';

@Injectable()
export class AlbumsService {
  private client = null;
  constructor(config: ConfigService) {
    this.client = axios.create({ baseURL: config.get('ALBUM_URL') });
  }

  async create(createAlbumInput: CreateAlbumInput, token: string) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...createAlbumInput,
    };

    const resp = await this.client.post('', data, {
      headers,
    });
    return resp.data;
  }

  async findAll() {
    const resp = await this.client.get();
    return resp.data.items;
  }

  async findOne(id: string) {
    const resp = await this.client.get(`/${id}`);
    return resp.data;
  }

  async update(id: string, updateAlbumInput: UpdateAlbumInput, token: string) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...updateAlbumInput,
    };

    const resp = await this.client.put(`/${id}`, data, {
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
