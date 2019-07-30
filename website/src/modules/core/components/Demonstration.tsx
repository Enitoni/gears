import React, { useState, useEffect, useCallback } from "react"
import * as Gears from "../../../../../gears/src"
import { Code } from "../../../common/markdown/components/Code"
import { CommandLine, CommandLineEntry } from "../demo/components/CommandLine"
import { Paragraph } from "../../../common/markdown/components/Paragraph"

const Service: Gears.ServiceType<string, any> = Gears.Service
const Builder: Gears.CommandBuilderType<string, any> = Gears.CommandBuilder

class WordCountService extends Service {
  wordMap = new Map<string, number>()

  getWordCount = (word: string) => {
    return this.wordMap.get(word) || 0
  }

  incrementWordCount = (word: string) => {
    const currentCount = this.wordMap.get(word) || 0
    this.wordMap.set(word.toLowerCase(), currentCount + 1)
  }
}

const countCommand = new Builder()
  .match(Gears.matchPrefixes("!count "))
  .use(context => {
    const words = context.content.match(/(?:[a-z]'[a-z]|[a-z0-9\-])+/gi) || []

    if (!words) return "No word was specified"
    if (words.length > 1) return "More than one word was specified"

    const service = context.manager.getService(WordCountService)
    const count = service.getWordCount(words[0].toLowerCase())

    return `The word "${words[0]}" was said ${count} times`
  })
  .done()

const wordCounterCommand = new Builder()
  .match(Gears.matchAlways())
  .use(context => {
    const words = context.content.match(/(?:[a-z]'[a-z]|[a-z0-9\-])+/gi) || []
    const service = context.manager.getService(WordCountService)

    for (const word of words) {
      service.incrementWordCount(word.toLowerCase())
    }
  })
  .done()

class Adapter extends Gears.ClientAdapter<string, any, any> {
  protected register() {
    return {
      client: {},
      methods: {
        start: async () => {},
        getMessageContent: (message: string) => message
      }
    }
  }
}

const INITIAL_MESSAGES: string[] = [
  "This is a demo that features a running version of a Gears bot.",
  "Type some words and type !count to check how many times that word was said.",
  "Like this:",
  "!count Gears",
  "Gears is neat, huh?",
  "!count Gears"
]

const CODE = `
class WordCountService extends Service {
  serviceDidInitialize() {
    this.wordMap = new Map()

    this.getWordCount = word => this.wordMap.get(word) || 0

    this.incrementWordCount = word => {
      const currentCount = this.wordMap.get(word) || 0
      this.wordMap.set(word.toLowerCase(), currentCount + 1)
    }
  }
}

const countCommand = new CommandBuilder()
  .match(matchPrefixes("!count "))
  .use(context => {
    const words = context.content.match(/(?:[a-z]'[a-z]|[a-z0-9\-])+/gi) || []

    if (!words) return "No word was specified"
    if (words.length > 1) return "More than one word was specified"

    const service = context.manager.getService(WordCountService)
    const count = service.getWordCount(words[0].toLowerCase())

    return \`The word "\${words[0]}" was said \${count} times\`
  })
  .done()

const wordCounterCommand = new CommandBuilder()
  .match(matchAlways())
  .use(context => {
    const words = context.content.match(/(?:[a-z]'[a-z]|[a-z0-9\-])+/gi) || []
    const service = context.manager.getService(WordCountService)

    for (const word of words) {
      service.incrementWordCount(word.toLowerCase())
    }
  })
  .done()

const bot = new Gears.Bot({
  adapter: ...,
  commands: [countCommand, wordCounterCommand],
  services: [WordCountService]
})
`.trim()

export function Demonstration() {
  const [history, setHistory] = useState<CommandLineEntry[]>([])
  const [adapter] = useState(() => new Adapter({}))

  const [bot] = useState(() => {
    return new Gears.Bot({
      adapter,
      commands: [countCommand, wordCounterCommand],
      services: [WordCountService]
    })
  })

  const emitMessage = useCallback(
    async (message: string) => {
      if (!message) return

      setHistory(history => [
        ...history,
        {
          content: message,
          type: "input"
        }
      ])

      await bot.processMessage(message)
    },
    [bot]
  )

  useEffect(() => {
    bot.on("response", ({ response }) => {
      if (!response) return

      setHistory(history => [
        ...history,
        {
          content: response,
          type: "response"
        }
      ])
    })

    const init = async () => {
      for (const message of INITIAL_MESSAGES) {
        await emitMessage(message)
      }
    }

    init()
  }, [bot, emitMessage])

  return (
    <>
      <CommandLine entries={history} onLine={emitMessage} />
      <br />
      <Paragraph>The above example can be summed up in this codeblock</Paragraph>
      <Code>{CODE}</Code>
    </>
  )
}
