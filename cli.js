#!/usr/bin/env node
import meow from 'meow';
import nueveZeta from './module.js';

const cli = meow(`
	Usage
	  $ 9z [...]
	Options
	  --csgo  Prints only CS:GO
	Examples
	  $ 9z
	  unicorns & rainbows
	  $ 9z --csgo
	  ponies & rainbows
`, {
	importMeta: import.meta,
	flags: {
		csgo: {
			type: 'boolean',
			default: false,
		},
	},
});

console.log(nueveZeta(cli.flags.csgo));
