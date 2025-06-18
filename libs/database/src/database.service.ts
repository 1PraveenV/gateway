// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class DatabaseService {}

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  getDbHandle(): DataSource {
    return this.dataSource;
  }

  async clearDatabase() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Clear database only allowed in test environment');
    }
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize();
  }
}