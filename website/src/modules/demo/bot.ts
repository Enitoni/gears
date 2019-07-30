import { DEMO_REGEX, INITIAL_STATE } from "./constants"
import * as Gears from "../../../../gears/src"

const Service: Gears.ServiceType<string, any> = Gears.Service
const Builder: Gears.CommandBuilderType<string, any> = Gears.CommandBuilder

class WordCountService extends Service {
  wordMap = new Map<string, number>(Object.entries(INITIAL_STATE()))

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
    const words = context.content.match(DEMO_REGEX()) || []

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
    const { content, manager } = context

    const words = content.match(DEMO_REGEX()) || []
    const service = manager.getService(WordCountService)

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
        getMessageContent: (message: string) => message,
      },
    }
  }
}

export const buildBot = () => {
  return new Gears.Bot({
    adapter: new Adapter({}),
    commands: [countCommand, wordCounterCommand],
    services: [WordCountService],
  })
}
