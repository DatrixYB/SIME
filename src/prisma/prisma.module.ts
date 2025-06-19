import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // add this
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // add this
})
export class PrismaModule {}
