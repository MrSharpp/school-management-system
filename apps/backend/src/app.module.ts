import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [UsersModule, AuthModule, TeachersModule, TeachersModule, StudentsModule, ClassesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
