const tsNode = require('ts-node');
require('./tsconfig.json');

tsNode.register({
  files: true,
  project: './tests/tsconfig.json',
  transpileOnly: true
});