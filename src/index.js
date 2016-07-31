import readInstalled from 'read-installed';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

export function run (entry, option) {
  return new Promise((resolve, reject) => {
    readInstalled(entry, option, (err, data) => {
      if (err) {
        reject(new Error(err));
        return;
      }
      const packages = formatPackage(data, {});
      resolve(packages);
    });
  });
}

const formatPackage = (pkg, packages) => {
  if (!pkg.name) { return packages; }
  if (packages[`${pkg.name}@${pkg.version}`]) { return packages; }

  let pkgInfo = {
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    license: pkg.license || pkg.licenses,
    maintainers: pkg.maintainers,
    contributors: pkg.contributors,
    path: pkg.path
  };

  if (pkgInfo.path) {
    const licenseFiles = glob.sync(path.join(pkgInfo.path, 'LICENSE*'));
    if (licenseFiles.length > 0) {
      pkgInfo.licenseFile = fs.readFileSync(licenseFiles[0]);
    }
  }

  packages[`${pkg.name}@${pkg.version}`] = pkgInfo;

  if (!pkg.dependencies) { return packages; }

  Object.keys(pkg.dependencies).forEach((packageName) => {
    formatPackage(pkg.dependencies[packageName], packages);
  });

  return packages;
};
