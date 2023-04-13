import type { ICreateTableRo, IJsonApiSuccessResponse, ITableVo } from '@teable-group/core';
import type { Connection } from '@teable/sharedb/lib/client';
import axios from 'axios';

export class Space {
  static async createTable(tableRo: ICreateTableRo) {
    const response = await axios.post<IJsonApiSuccessResponse<ITableVo>>('/api/table', tableRo);
    return response.data.data;
  }

  constructor(private connection: Connection) {}

  async createTable(tableRo: ICreateTableRo) {
    return Space.createTable(tableRo);
  }
}