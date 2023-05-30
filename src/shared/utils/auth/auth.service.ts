import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { JwtPayload } from '../../../types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /* hashing password */
  async hashedPassword(password: string) {
    return bcryptjs.hashSync(password, 7);
  }

  /* compare two password */
  async comparePassword(newPassword: string, oldPassword: string) {
    return bcryptjs.compareSync(newPassword, oldPassword);
  }

  /* generate token */

  async generateToken(jwtPayload: JwtPayload) {
    const payload: JwtPayload = {
      id: jwtPayload.id,
      email: jwtPayload.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
