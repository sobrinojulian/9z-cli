#!/usr/bin/env node
import meow from "meow";
import nueveZeta from "./module.js";

const cli = meow(
  `
	Usage
	  $ 9z [...]
	Options
	  --csgo        Show CS:GO
	  --fortnite    Show Fortnite
	Examples
	  $ 9z
	  # Prints everything
	  $ 9z --csgo
	  # Prints CS:GO only
	  $ 9z --csgo --fortnite
	  # Prints CS:GO and Fortnite only
`,
  {
    importMeta: import.meta,
    flags: {
      csgo: {
        type: "boolean",
        default: true,
      },
      fortnite: {
        type: "boolean",
        default: true,
      },
    },
  }
);

console.log(nueveZeta(cli.flags.csgo));
