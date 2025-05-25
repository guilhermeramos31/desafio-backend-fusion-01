import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserInputDto,
  UpdatePasswordInputDto,
  UpdateUserInputDto,
} from '@user/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiCreateUser,
  ApiFindUser,
  ApiUpdatePassword,
  ApiUpdateUser,
} from '@shared/decorators';
import { ApiDeleteUser } from '@shared/decorators/docs/delete-user.decorator';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
@ApiBearerAuth('Authorization')
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
