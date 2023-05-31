import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { AuthService } from '../../shared/utils/auth/auth.service';
import { SignInUserDto } from 'modules/users/dto/signIn.user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    readonly authService: AuthService,
  ) {}
  async create(createUserDto: RegisterUserDto) {
    const { email, password } = createUserDto;
    const existingUser = await this.prismaService.users.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('Email already exist', HttpStatus.CONFLICT);
    }
    const hashedPassword: Promise<string> =
      await this.authService.hashedPassword(password);
    const newUser = await this.prismaService.users.create({
      data: {
        email: email,
        password: '' + hashedPassword,
        token: ' ',
      },
    });
    const payload = {
      id: newUser.id,
      email: newUser.email,
    };
    const tokens = await this.authService.generateToken(payload);
    await this.changeRefreshToken(newUser.id, tokens.refresh_token);
    return {
      status: 'OK',
      data: tokens,
    };
  }

  async findAll() {
    const allUsers = await this.prismaService.users.findMany();
    if (allUsers.length < 1) {
      throw new HttpException(
        'Users not found ! Database is empty',
        HttpStatus.NO_CONTENT,
      );
    }
    return allUsers;
  }

  async findOne(id: string) {
    const oneUser = await this.prismaService.users.findUnique({
      where: {
        id: id,
      },
    });
    if (!oneUser) {
      throw new HttpException('ID is incorrect! ', HttpStatus.NOT_FOUND);
    }
    return oneUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prismaService.users.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
      },
    });
    return updatedUser;
  }

  async remove(id: string) {
    const check = await this.findOne(id);
    if (!check.id) {
      throw new HttpException(
        'ID is incorrect! User not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.prismaService.users.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 'OK',
      data: check.email,
      message: 'Succesfully deleted',
    };
  }

  async changeRefreshToken(id: string, refresh_token: string) {
    await this.prismaService.users.update({
      where: { id: id },
      data: { token: refresh_token },
    });
    return true;
  }
  async logOut(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.prismaService.users.update({
      where: {
        id,
      },
      data: {
        token: '',
      },
    });
    return {
      status: 'OK',
      message: 'User logged out successfully',
    };
  }

  async signIn(signInDto: SignInUserDto) {
    const { email, password } = signInDto;
    const user = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isMatch = await this.authService.comparePassword(
      password,
      user.password,
    );
    if (!isMatch) {
      throw new HttpException('Password not matched', HttpStatus.FORBIDDEN);
    }
    const tokens = await this.authService.generateToken({ id: user.id, email });
    await this.changeRefreshToken(user.id, tokens.refresh_token);
    return {
      status: 'OK',
      message: 'Successfully signin',
      data: tokens,
    };
  }
}
