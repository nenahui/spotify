import path from 'path';

const rootPath = __dirname;

export const config = {
  port: 8000,
  database: 'mongodb://localhost/spotify',
  rootPath,
  publicPath: path.join(rootPath, 'public'),
};
