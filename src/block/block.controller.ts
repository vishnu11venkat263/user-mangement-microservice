
import { Controller, Post, Delete, Body, Request } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockUserDto } from './dto/block-user.dto';
import { User } from '../common/decorators/user.decorator';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  blockUser(@User('id') userId: string, @Body() blockUserDto: BlockUserDto) {
    return this.blockService.blockUser(userId, blockUserDto);
  }

  @Delete()
  unblockUser(@User('id') userId: string, @Body() blockUserDto: BlockUserDto) {
    return this.blockService.unblockUser(userId, blockUserDto);
  }
}
