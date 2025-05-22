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
import {
  ApiCreateUser,
  ApiFindUser,
  ApiUpdatePassword,
  ApiUpdateUser,
} from '@user/docs';
import { ApiDeleteUser } from '@user/docs/decorators/delete-user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreateUser()
  async create(@Body() createUserDto: CreateUserInputDto) {
    return this.userService.create(createUserDto);
  }

  @ApiFindUser()
  @Get(':email')
  async find(@Param('email') email: string) {
    return this.userService.findByEmail({ email });
  }

  @ApiUpdateUser()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserInputDto) {
    return this.userService.updateUser(id, body);
  }

  @ApiUpdatePassword()
  @Patch('password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() body: UpdatePasswordInputDto,
  ) {
    return this.userService.updatePassword(id, body);
  }

  @ApiDeleteUser()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
