import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { ClientAccount } from './entities/client-account.entity';
import { SitterAccount } from './entities/sitter-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SitterAccount, ClientAccount])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
