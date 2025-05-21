import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserInputDto,
  UpdatePasswordInputDto,
  UpdateUserInputDto,
} from '@user/dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreateUser } from '@user/docs/decorators/create-user.decorator';
import { FindUserInputDto } from '@user/dto/input/find-user.input.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreateUser()
  async create(@Body() createUserDto: CreateUserInputDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':email')
  async find(@Param('email') email: FindUserInputDto) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserInputDto) {
    return this.userService.updateUser(id, body);
  }

  @Patch('password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() body: UpdatePasswordInputDto,
  ) {
    return this.userService.updatePassword(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
