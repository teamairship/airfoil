const { system, filesystem } = require('gluegun');

const src = filesystem.path(__dirname, '..');

const cli = async cmd => system.run('node ' + filesystem.path(src, 'bin', 'airfoil') + ` ${cmd}`);

test('outputs help', async () => {
  const output = await cli('--help');
  expect(output).toContain('0.0.1');
});
