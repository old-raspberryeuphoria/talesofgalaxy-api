import chalk from 'chalk';
import cluster from 'cluster';
import config from 'config';
import os from 'os';

import app from './server';
import logger from '../lib/logger/logger';

const main = async () => {
  if (cluster.isMaster && process.env.NODE_ENV === 'production') {
    os.cpus().forEach(() => cluster.fork());

    cluster.on('online', worker => logger.info(`Worker ${worker.process.pid} online.`));
    cluster.on('message', message => logger.info(message));
    cluster.on('exit', (worker, signal) => {
      logger.info(`Worker ${worker.process.pid} died (signal: ${signal}). Restarting...`);
      cluster.fork();
    });
  } else {
    await app.listen(config.port, () =>
      logger.info(chalk.black.bgGreen.bold(`${config.appName} - ${config.version}`)),
    );
  }
};

main().catch(error => logger.error(error));
