import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtGuard } from './jwt.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
  ]),

    JwtModule.register({
      secret: 'bubble-tea-secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
   controllers: [AuthController],
   providers: [AuthService, JwtGuard,], 
   exports: [AuthService, JwtModule, JwtGuard,],
})
export class AuthModule {}