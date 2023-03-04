import { Injectable } from '@nestjs/common';
import * as jwt from 'jwt-simple';

const SECRET = 'DUMMY_SECRET_FOR_NOW';

@Injectable()
export class JwtService {
  encode<T>(payload: T): string {
    return jwt.encode(payload, SECRET);
  }

  decode<T>(token: string): T | null {
    try {
      return jwt.decode(token, SECRET);
    } catch (error) {
      return null;
    }
  }
}
