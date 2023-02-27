import { Injectable } from '@nestjs/common';
import { Payload } from '../interfaces/payload.interface';
import { UserService } from '../shared/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    const SECRET_KEY = 'guardiangel';
    return sign(payload, SECRET_KEY, { expiresIn: '1h' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
