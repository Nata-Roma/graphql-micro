import { LoginUserInput } from './dto/login-user.input';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import axios from 'axios';

@Injectable()
export class UsersService {
  private client = null;
  constructor(config: ConfigService) {
    this.client = axios.create({ baseURL: config.get('USER_URL') });
  }

  async create(createUserInput: CreateUserInput) {
    const data = {
      ...createUserInput,
    };

    const resp = await this.client.post('/register', data);

    return resp.data;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const resp = await this.client.get(`/${id}`);
    return resp.data;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUserInput: LoginUserInput) {
    const resp = await this.client.post(`/login`, loginUserInput);
    
    return resp.data;
  }
}
