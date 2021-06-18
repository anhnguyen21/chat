import { Connection, createConnection, ConnectionManager, getConnectionManager, ConnectionOptions } from 'typeorm'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as migration from '../db/migrations'
import * as typeOrmConfig from '../../ormconfig'

const opt = {
  ...typeOrmConfig
}

export class Database {
  private connectionManager: ConnectionManager

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection(connectionName = 'default'): Promise<Connection> {
    let connection: Connection
    if (this.connectionManager.has(connectionName)) {
      connection = this.connectionManager.get(connectionName)
      if (!connection.isConnected) {
        connection = await connection.connect()
      }
    } else {
      connection = await createConnection(opt as ConnectionOptions)
    }

    return connection
  }
}
