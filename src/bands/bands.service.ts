import { PagingBandInput } from './dto/paging-band.input';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import axios from 'axios';

@Injectable()
export class BandsService {
  private client = null;
  constructor(config: ConfigService) {
    this.client = axios.create({ baseURL: config.get('BAND_URL') });
  }

  async create(createBandInput: CreateBandInput, token: string) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...createBandInput,
    };

    const resp = await this.client.post('', data, {
      headers,
    });
    return resp.data;
  }

  async findAll(pagingBandInput: PagingBandInput) {
    let query = '';
    if(pagingBandInput) {
      const { limit, offset } = pagingBandInput;
      query = `?limit=${limit}&offset=${offset}`
    }
    const resp = await this.client.get(query);
    return resp.data.items;
  }

  async findOne(id: string) {
    const resp = await this.client.get(`/${id}`);
    return resp.data;
  }

  async update(id: string, updateBandInput: UpdateBandInput, token: string) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...updateBandInput,
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
