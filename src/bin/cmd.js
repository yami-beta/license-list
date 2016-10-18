#!/usr/bin/env node

import 'babel-polyfill';
import minimist from 'minimist';
import licenseList from '../lib/index';

const formatOutput = (pkgInfo) => {
  const licenseFile = (() => {
    if (typeof pkgInfo.licenseFile !== 'string') { return '  LICENSE file is not exist'; }
    // Append indent (two speces) to each line
    return pkgInfo.licenseFile.split(/\n/).map((line) => `  ${line}`).join("\n");
  })();
  const output = `${pkgInfo.name}@${pkgInfo.version} (${pkgInfo.license})

${licenseFile}

`;
  return output;
};

const argv = minimist(process.argv.slice(2), {
  boolean: ['dev'],
  alias: {
    d: 'dev',
  },
  default: {
    dev: false,
  },
});
const baseDir = argv['_'][0] || '.';
const option = { dev: argv['dev'] };
(async () => {
  const packages = await licenseList(baseDir, option);
  Object.keys(packages).forEach((pkgId) => {
    console.log(formatOutput(packages[pkgId]));
  });
})();
