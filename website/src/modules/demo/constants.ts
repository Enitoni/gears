import { CommandLineEntry } from "./components/CommandLine"

export const INITIAL_HISTORY: CommandLineEntry[] = [
  {
    content: "This is a demo that features a running version of a Gears bot.",
    type: "input",
  },
  {
    content:
      "Type some words and type !count to check how many times that word was said.",
    type: "input",
  },
  {
    content: "Like this:",
    type: "input",
  },
  {
    content: "!count Gears",
    type: "input",
  },
  {
    content: 'The word "Gears" was said 1 times',
    type: "response",
  },
  {
    content: "Gears is neat, huh?",
    type: "input",
  },
  {
    content: "!count Gears",
    type: "input",
  },
  {
    content: 'The word "Gears" was said 2 times',
    type: "response",
  },
]

export const DEMO_REGEX = () => /(?:[a-z]'[a-z]|[a-z0-9\-])+/gi

export const INITIAL_STATE = () => {
  const words =
    Object.values(INITIAL_HISTORY)
      .filter(item => item.type === "input")
      .map(item => item.content)
      .join(" ")
      .match(DEMO_REGEX()) || []

  const wordCountMap: Record<string, number> = {}

  for (const word of words) {
    wordCountMap[word.toLowerCase()] = (wordCountMap[word.toLowerCase()] || 0) + 1
  }

  return wordCountMap
}
