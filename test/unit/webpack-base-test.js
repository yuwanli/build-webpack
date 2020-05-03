const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.js');

  it('entry', () => {
    assert.equal(baseConfig.entry.index.indexOf('build-webpack/test/smoke/template/src/index/index.js') > -1, true);
    assert.equal(baseConfig.entry.demo.indexOf('build-webpack/test/smoke/template/src/demo/index.js') > -1, true);
    assert.equal(baseConfig.entry.demo2.indexOf('build-webpack/test/smoke/template/src/demo2/index.js') > -1, true);
  });
});
