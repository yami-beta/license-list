import 'babel-polyfill';
import assert from 'assert';
import licenseList from '../src/index';
import packageJson from '../package.json';

describe('license-list', function () {
  let pkgInfo;
  before(async () => {
    const packages = await licenseList('.', { dev: false });
    pkgInfo = packages[`license-list@${packageJson.version}`];
  });

  it("should return package's name", () => {
    assert.equal(pkgInfo.name, packageJson.name);
  });

  it("should return package's version", () => {
    assert.equal(pkgInfo.version, packageJson.version);
  });

  it("should return package's license", () => {
    assert.equal(pkgInfo.license, packageJson.license);
  });

  it("should return package's maintainers", () => {
    assert.equal(pkgInfo.maintainers, undefined);
  });

  it("should return package's contributors", () => {
    assert.equal(pkgInfo.contributors, undefined);
  });

  it("should return package's license file", () => {
    const licenseFile = pkgInfo.licenseFile;
    assert.equal(typeof licenseFile, 'string');
    const firstLine = licenseFile.split(/\n/)[0];
    assert.equal(firstLine, 'MIT License');
  });
});
