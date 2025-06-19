import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from 'generated/prisma/client';
// import { PrismaClient } from '@prisma/client'; //
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient from the Prisma package
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Lifecycle hook: called once the module is initialized
  async onModuleInit() {
    // Establish a connection to the database
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
