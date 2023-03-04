import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInCredentialsDto } from './dtos/signin-credentials';
import { JwtService } from 'src/shared/jwt.service';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @HttpCode(200)
  @Post('/login')
  async login(@Body() signinCredential: SignInCredentialsDto): Promise<string> {
    const user = await this.userService.getUser({
      email: signinCredential.email,
    });

    // validation for password
    if (!user || user.password != signinCredential.password)
      throw new UnauthorizedException('Invalid Credentials');
    return this.jwtService.encode(user);
  }
}
