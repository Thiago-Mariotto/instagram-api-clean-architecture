import mysql, { Pool } from 'mysql2/promise';
import Connection from './Connection';

export default class MySQLPromiseAdapter implements Connection {
  private conn: Pool;

  constructor() {
    this.conn = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'instagram',
      port: Number(process.env.DB_PORT) || 3306
    });
  }

  async query(statement: string, params?: any): Promise<any> {
    return await this.conn.query(statement, params);
  }

  async close(): Promise<void> {
    await this.conn.end();
  }

}