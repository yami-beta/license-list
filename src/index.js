import readInstalled from 'read-installed';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

const formatPackage = (pkg, packages, option) => {
  if (!pkg.name) { return packages; }
  if (packages[`${pkg.name}@${pkg.version}`]) { return packages; }

  // Exclude devDependencies
  // read-installed `options.dev` is not working correctly but extraneous is set on devDependencies
  // https://github.com/npm/read-installed/blob/master/test/dev.js#L20
  if (!option.dev && pkg.extraneous) { return packages; }

  const packageList = packages;

  const pkgInfo = {
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    license: pkg.license || pkg.licenses,
    maintainers: pkg.maintainers,
    contributors: pkg.contributors,
    path: pkg.path,
  };

  if (pkgInfo.path) {
    const licenseFiles = glob.sync(path.join(pkgInfo.path, 'LICENSE*'));
    if (licenseFiles.length > 0) {
      pkgInfo.licenseFile = fs.readFileSync(licenseFiles[0]);
    }
  }

  packageList[`${pkg.name}@${pkg.version}`] = pkgInfo;

  if (!pkg.dependencies) { return packages; }

  Object.keys(pkg.dependencies).forEach((packageName) => {
    formatPackage(pkg.dependencies[packageName], packages, option);
  });

  return packages;
};

export default function run(entry, option) {
  const defaultOption = { dev: false };
  const mergedOption = Object.assign({}, defaultOption, option);
  return new Promise((resolve, reject) => {
    readInstalled(entry, option, (err, data) => {
      if (err) {
        reject(new Error(err));
        return;
      }
      const packages = formatPackage(data, {}, mergedOption);
      resolve(packages);
    });
  });
}

