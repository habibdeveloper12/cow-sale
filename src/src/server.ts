import mongoose from 'mongoose';
import app from './app';
import { errorlogger, logger } from './shared/logger';
import config from './config';
import { Server } from 'http';
process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});
async function main() {
  let server: Server;
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`);
    });
    logger.info('Database Succefullly Connected');
  } catch (e) {
    errorlogger.error('there something wrong');
  }
  process.on('unhandledRejection', err => {
    console.log('unhandle rejection detected server close ...');
    if (server) {
      server.close(() => {
        errorlogger.error(err);
      });
      process.exit(1);
    }

    process.exit(1);
  });
  process.on('SIGTERM', () => {
    logger.info('SIGTERM is received');
    if (server) {
      server.close();
    }
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();
