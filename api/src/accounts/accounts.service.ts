import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientAccount } from './entities/client-account.entity';
import { SitterAccount } from './entities/sitter-account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(SitterAccount)
    private sitterAccountRepo: Repository<SitterAccount>,
    @InjectRepository(ClientAccount)
    private clientAccountRepo: Repository<ClientAccount>,
  ) {}

  async createSitterAccountInstance(
    accountData: Partial<SitterAccount>,
  ): Promise<SitterAccount> {
    try {
      const newAccount = this.sitterAccountRepo.create(accountData);
      return newAccount;
    } catch (err) {
      throw new BadRequestException('Failed to create a new sitter account');
    }
  }

  async createClientAccountInstance(
    accountData: Partial<ClientAccount>,
  ): Promise<ClientAccount> {
    try {
      const newAccount = this.clientAccountRepo.create(accountData);
      return newAccount;
    } catch (err) {
      throw new BadRequestException('Failed to create a new client account');
    }
  }
}
