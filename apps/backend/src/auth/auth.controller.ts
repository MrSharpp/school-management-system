import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from 'src/shared/jwt.service';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dtos/signin-credentials';

@Controller()
export class AuthController {
  constructor(
    private authServie: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @HttpCode(200)
  @Post('/login')
  async login(@Body() signinCredential: SignInCredentialsDto): Promise<string> {
    const user = await this.authServie.login({
      email: signinCredential.email,
    });

    // validation for password
    if (!user || user.password != signinCredential.password)
      throw new UnauthorizedException('Invalid Credentials');
    return this.jwtService.encode(user);
  }

  @HttpCode(200)
  @Get('/dummy')
  async dummy() {
    return 'hell';
  }
}
