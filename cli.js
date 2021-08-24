#!/usr/bin/env node
import meow from 'meow'
import nueveZeta from './module.js'

const cli = meow(
  `
	Usage
	  $ 9z [...]
	Options
	  --csgo        Show CS:GO
	  --fortnite    Show Fortnite
	  --valorant    Show Valorant
	Examples
	  $ 9z
	  # Prints everything
	  $ 9z --csgo
	  # Prints CS:GO only
	  $ 9z --fortnite
	  # Prints Fortnite only
`,
  {
    importMeta: import.meta,
    flags: {
      csgo: {
        type: 'boolean',
        default: false,
      },
      fortnite: {
        type: 'boolean',
        default: false,
      },
      valorant: {
        type: 'boolean',
        default: false,
      },
    },
  }
)

nueveZeta(cli.flags)