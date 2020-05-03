const glob = require('glob-all');

describe('Checking generated css js files', () => {
  it('should generate css js files', (done) => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/index_*.css',
      './dist/demo_*.js',
      './dist/demo_*.css',
      './dist/demo2_*.js',
      './dist/demo2_*.css',
    ]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no css js files generated');
    }
  });
});
