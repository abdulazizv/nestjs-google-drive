import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from "modules/users/dto/signIn.user.dto";
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary:'Register user'})
  @ApiResponse({status:201})
  @Post('register')
  create(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary:'Signin user'})
  @ApiResponse({status:200})
  @Post('signin')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.usersService.signIn(signInUserDto);
  }

  @ApiOperation({summary:'Get all user'})
  @ApiResponse({status:200})
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary:'Get user by Id'})
  @ApiResponse({status:200})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({summary:'Logout user'})
  @ApiResponse({status:200})
  @Get('logout/:id')
  logOut(@Param('id') id: string) {
    return this.usersService.logOut(id);
  }

  @ApiOperation({summary:"update User"})
  @ApiOkResponse()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({summary:'delete User'})
  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
