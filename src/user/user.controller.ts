
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
    UseInterceptors,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto, } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
  import { CustomCacheInterceptor } from '../common/interceptors/cache.interceptor';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
  
    @Get('allUsers')
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    @UseInterceptors(CustomCacheInterceptor)
    findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.remove(id);
    }
  
    @Get('search')
    @UseInterceptors(CustomCacheInterceptor)
    search(@Query() searchUserDto: SearchUserDto) {
      return this.userService.search(searchUserDto);
    }
  }
  