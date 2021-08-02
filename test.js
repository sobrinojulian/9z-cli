import test from 'ava';
import execa from 'execa';
import unicornFun from './module.js';

test('module', t => {
	t.throws(() => {
		unicornFun(123);
	}, {
		instanceOf: TypeError,
		message: 'Expected a string, got number',
	});

	t.is(unicornFun('unicorns'), 'unicorns & rainbows');
});

test('cli', async t => {
	const {stdout} = await execa('./cli.js', ['ponies']);
	t.is(stdout, 'ponies & rainbows');
});
