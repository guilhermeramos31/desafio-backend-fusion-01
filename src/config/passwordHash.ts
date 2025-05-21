import * as process from 'node:process';

export default {
  salt: parseInt(process.env.SALT_PASSWORD ?? '10'),
};
