import { Logger } from '@nestjs/common';
import { mongoose } from '@typegoose/typegoose';
import * as chalk from 'chalk';
import { MONGO_DB } from 'src/app.config';
import { DB_CONNECTION_TOKEN } from 'src/constants/system.contants';

export const DatabaseProvider = {
  provide: DB_CONNECTION_TOKEN,
  useFactory: async () => {
    let reconnectionTask: NodeJS.Timeout | null = null;
    const RECONNECT_INTERVAL = 6000;

    const connection = () => {
      return mongoose.connect(MONGO_DB.uri, {
        auth: {
          username: MONGO_DB.user,
          password: MONGO_DB.pass,
        },
        authSource: 'admin',
      });
    };
    // const Badge = '\x1b[33m[MongoDB]\x1b[0m';
    const Badge = chalk.yellow('[MongoDB]');

    const color = (str: TemplateStringsArray, ...args: any[]) => {
      return str.map((s) => chalk.green(s)).join('');
    };
    mongoose.connection.on('connecting', () => {
      console.info(Badge, 'Connecting to MongoDB...');
      Logger.log('Connecting to MongoDB...', 'DatabaseProvider');
    });

    mongoose.connection.on('open', () => {
      Logger.log('Database connected', 'DatabaseProvider');
      if (reconnectionTask) {
        clearTimeout(reconnectionTask);
        reconnectionTask = null;
      }
    });

    mongoose.connection.on('disconnected', () => {
      console.error(
        Badge,
        chalk.red(
          `disconnected! retry when after ${RECONNECT_INTERVAL / 1000}s`,
        ),
      );
      reconnectionTask = setTimeout(connection, RECONNECT_INTERVAL);
    });

    mongoose.connection.on('error', (error) => {
      console.error(Badge, 'error!', error);
      mongoose.disconnect();
    });

    return await connection().then((mongoose) => mongoose.connection);
  },
};
