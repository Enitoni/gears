import React, { useState, useEffect, useCallback } from "react"
import { Code } from "../../../common/markdown/components/Code"
import { Paragraph } from "../../../common/markdown/components/Paragraph"

import { CommandLineEntry, CommandLine } from "./CommandLine"
import { buildBot } from "../bot"
import { INITIAL_HISTORY } from "../constants"

const CODE = `
const regex = /(?:[a-z]'[a-z]|[a-z0-9\\-])+/gi

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
    const { content, manager } = context

    const words = content.match(regex) || []

    if (!words) return "No word was specified"
    if (words.length > 1) return "More than one word was specified"

    const service = manager.getService(WordCountService)
    const count = service.getWordCount(words[0].toLowerCase())

    return \`The word "\${words[0]}" was said \${count} times\`
  })

const wordCounterCommand = new CommandBuilder()
  .match(matchAlways())
  .use(context => {
    const { content, manager } = context

    const words = content.match(regex) || []
    const service = manager.getService(WordCountService)

    for (const word of words) {
      service.incrementWordCount(word.toLowerCase())
    }
  })

const bot = new Bot({
  adapter: ...,
  commands: [countCommand, wordCounterCommand],
  services: [WordCountService]
})
`.trim()

export function Demonstration() {
  const [history, setHistory] = useState<CommandLineEntry[]>(INITIAL_HISTORY)

  const [bot] = useState(buildBot)

  const addEntry = useCallback(
    (entry: CommandLineEntry) => setHistory(history => [...history, entry]),
    [setHistory],
  )

  const emitMessage = useCallback(
    async (message: string) => {
      if (!message) return

      addEntry({
        content: message,
        type: "input",
      })

      await bot.processMessage(message)
    },
    [addEntry, bot],
  )

  useEffect(() => {
    bot.on("response", ({ response }) => {
      if (!response) return

      addEntry({
        content: response,
        type: "response",
      })
    })
  }, [addEntry, bot, emitMessage])

  return (
    <>
      <CommandLine entries={history} onLine={emitMessage} />
      <br />
      <Paragraph>The above example can be summed up in this code block:</Paragraph>
      <Code>{CODE}</Code>
    </>
  )
}
