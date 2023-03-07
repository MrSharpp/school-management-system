import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [UsersModule, AuthModule, TeachersModule, TeachersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
