import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtService } from 'src/shared/jwt.service';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dtos/signin-credentials.DTO';
import * as bcrypt from 'bcrypt';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private authServie: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @HttpCode(200)
  @Post('/login')
  async login(
    @Body() signinCredential: SignInCredentialsDto
  ): Promise<{ token: string }> {
    const user = await this.authServie.login({
      email: signinCredential.email,
    });

    // validation for password
    const answe = await bcrypt.compare(
      signinCredential.password,
      user?.password || ''
    );

    if (!answe || !user) throw new UnauthorizedException('Invalid Credentials');
    return { token: this.jwtService.encode(user) };
  }
}
