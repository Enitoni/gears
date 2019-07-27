# Gears

![Version](https://img.shields.io/npm/v/@enitoni/gears)
![Build](https://gitlab.com/enitoni-gears/gears/badges/master/build.svg)
![Coverage](https://gitlab.com/enitoni-gears/gears/badges/master/coverage.svg)

## About
Gears is a library used to create command interfaces, such as chat bots and more. It is fully generic so you can make it work with anything that exposes a messaging interface.

## Installing

```
npm i @enitoni/gears
```

or

```
yarn add @enitoni/gears
```

## Usage
To use Gears you'll need an adapter and bindings (if you use TypeScript), you can make your own by extending the `ClientAdapter`, or you can use one of these built in bindings:
* [Discord.js bindings](https://www.npmjs.com/package/@enitoni/gears-discordjs)

Then, you can create your bot like this (this is psuedo code):
```ts
import { Bot } from "@enitoni/gears"
import { Adapter, Command, CommandGroup } from "bindings-library"

const adapter = new Adapter(...)

const command = new Command({
  matcher: matchPrefixes("test"),
  action: (context) => {
    console.log("Test received!")
  }
})

const group = new CommandGroup({
  matcher: matchPrefixes("!"),
  commands: [ command ]
})

const bot = new Bot({ adapter, group })
bot.start()
```

Result:
```ts
Input: "!test"
Output: "Test received!"
```

## Documentation

Coming soon...
