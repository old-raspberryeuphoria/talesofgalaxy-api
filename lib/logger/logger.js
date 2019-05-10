import config from 'config';
import winston, { format } from 'winston';

const logger = winston.createLogger({
  format: format.simple(),
  transports: [new winston.transports.Console()],
});

if (process.env.NODE_ENV === 'production') {
  const { printf } = format;

  const date = new Date();
  const logTime =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    'at ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds();

  const customFormat = printf(info => `[${logTime}] - ${info.message}`);

  logger.add(
    new winston.transports.File({
      format: customFormat,
      filename: `/var/log/mistertemp-${config.version}-${process.env.GIT_SHA}-error.log`,
      level: 'error',
    }),
  );

  logger.add(
    new winston.transports.File({
      format: customFormat,
      filename: `/var/log/mistertemp-${config.version}-${process.env.GIT_SHA}-info.log`,
      level: 'info',
    }),
  );
}

export default logger;
