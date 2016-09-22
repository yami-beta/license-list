import 'babel-polyfill';
import assert from 'assert';
import licenseList from '../src/index';

describe('license-list', function () {
  let pkgInfo;
  before(async () => {
    const packages = await licenseList('.', { dev: false });
    pkgInfo = packages['license-list@0.0.1'];
  });

  it("should return package's name", () => {
    assert.equal(pkgInfo.name, 'license-list');
  });

  it("should return package's version", () => {
    assert.equal(pkgInfo.version, '0.0.1');
  });

  it("should return package's license", () => {
    assert.equal(pkgInfo.license, 'MIT');
  });

  it("should return package's maintainers", () => {
    assert.equal(pkgInfo.maintainers, undefined);
  });

  it("should return package's contributors", () => {
    assert.equal(pkgInfo.contributors, undefined);
  });
});
