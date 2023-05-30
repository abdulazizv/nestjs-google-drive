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
    return this.jwtService.sign(payload);
  }
}
