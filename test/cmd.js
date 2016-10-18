import 'babel-polyfill';
import assert from 'assert';
import packageJson from '../package.json';
import childProcess from 'child_process';
const exec = childProcess.exec;

describe('license-list command', function () {
  it("should return 'name@version (license type)' with license file", () => {
    return new Promise((resolve, reject) => {
      exec("node bin/cmd.js .", (error, stdout, stderr) => {
        assert.equal(error, null);

        const packageIdWithLicenseType = stdout.split(/\n/)[0];
        const expectedPackageIdWithLicenseType = `${packageJson.name}@${packageJson.version} (MIT)`;
        assert.equal(packageIdWithLicenseType, expectedPackageIdWithLicenseType);

        const licenseType = stdout.split(/\n/)[2];
        assert.equal(licenseType, '  MIT License');
        resolve();
      });
    });
  });
});
