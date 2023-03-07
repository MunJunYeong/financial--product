import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/controller.dto';
import { UpdateProfileDto } from './dto/service.dto';
// import { DatabaseService } from '@app/lib'
import { ConfigService } from '@nestjs/config'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, 
    // private readonly databaseSerivce: DatabaseService,
    private readonly configService: ConfigService
    ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    console.log(this.configService.get('DATABASE_HOST'));
    return 'ggggg';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    const updateUser: UpdateProfileDto = {
        ...updateUserDto,
      name: 'ssss',
      age: 1,
    };
    return this.userService.update(+id, updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
