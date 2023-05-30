import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { AuthService } from '../../shared/utils/auth/auth.service';

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
      this.authService.hashedPassword(password);
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
      data: tokens.access_token,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async changeRefreshToken(id: string, refresh_token: string) {
    await this.prismaService.users.update({
      where: { id: id },
      data: { token: refresh_token },
    });
    return true;
  }
}
