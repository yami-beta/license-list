import assert from 'assert';
import licenseList from '../src/index';

describe('license-list', function () {
  let pkgInfo;
  before(() => {
    pkgInfo = licenseList('.', { dev: false }).then((packages) => {
      return packages['license-list@0.0.1'];
    });
  });

  it('should return name ("license-list")', () => {
    return pkgInfo.then((info) => {
      assert.equal(info.name, 'license-list');
    });
  });

  it('should return version ("0.0.1")', () => {
    return pkgInfo.then((info) => {
      assert.equal(info.version, '0.0.1');
    });
  });

  it('should return license ("MIT")', () => {
    return pkgInfo.then((info) => {
      assert.equal(info.license, 'MIT');
    });
  });

  it('should return maintainers (undefined)', () => {
    return pkgInfo.then((info) => {
      assert.equal(info.maintainers, undefined);
    });
  });

  it('should return contributors (undefined)', () => {
    return pkgInfo.then((info) => {
      assert.equal(info.contributors, undefined);
    });
  });
});
