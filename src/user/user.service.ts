
import { Injectable, NotFoundException, Inject, CACHE_MANAGER } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { User } from './entities/user.entity';
import { CreateUserDto, } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const cachedUser = await this.cacheManager.get<User>(`user-${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.cacheManager.set(`user-${id}`, user, 300); // Set TTL as a number (300 seconds)
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.cacheManager.set(`user-${id}`, user, 300); // Set TTL as a number (300 seconds)
    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.cacheManager.del(`user-${id}`);
    return user;
  }

  async search(searchUserDto: SearchUserDto): Promise<User[]> {
    const query: any = {};
    if (searchUserDto.username) {
      query.username = { $regex: searchUserDto.username, $options: 'i' };
    }
    if (searchUserDto.minAge || searchUserDto.maxAge) {
      const today = new Date();
      const minDate = searchUserDto.minAge ? new Date(today.setFullYear(today.getFullYear() - searchUserDto.minAge)) : null;
      const maxDate = searchUserDto.maxAge ? new Date(today.setFullYear(today.getFullYear() - searchUserDto.maxAge)) : null;

      query.birthdate = {};
      if (minDate) query.birthdate.$lte = minDate;
      if (maxDate) query.birthdate.$gte = maxDate;
    }

    return this.userModel.find(query).exec();
  }
}
