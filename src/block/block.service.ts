
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { BlockUserDto } from './dto/block-user.dto';

@Injectable()
export class BlockService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async blockUser(userId: string, blockUserDto: BlockUserDto): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    if (!user.blockedUsers.includes(blockUserDto.targetUserId)) {
      user.blockedUsers.push(blockUserDto.targetUserId);
      await user.save();
    }
  }

  async unblockUser(userId: string, blockUserDto: BlockUserDto): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    user.blockedUsers = user.blockedUsers.filter(id => id !== blockUserDto.targetUserId);
    await user.save();
  }
}
